'use client'
import { ReCaptchaProvider, useReCaptcha } from 'next-recaptcha-v3'
import { useAtom } from 'jotai'
import { atomWithReset, useResetAtom } from 'jotai/utils'
import Image from 'next/image'
import React, { ComponentProps } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { Badge } from '@/components/ui/badge'
import AnimateIn from './animate-in'

const title = 'Should you use Vercel?'
const description = `Vercel recently updated their pricing model which caused some uproar among developers. Answer the following questions to find out if you should use Vercel or not.<br/>Read the <a href="https://www.nico.fyi/blog/should-you-use-vercel">blog post here.</a>`

const queryClient = new QueryClient()

export interface NodeBase {
  text?: string | React.ReactNode
  image?: string
  info?: string | React.ReactNode
}

interface NodeText extends NodeBase {
  type: 'text'
  text: string | React.ReactNode
}

interface NodeImage extends NodeBase {
  type: 'image'
  image: string
}

interface NodeTextImage extends NodeBase {
  type: 'text-image'
  text: string | React.ReactNode
  image: string
}

// Then, use a type alias for the union of these interfaces
export type NodeType = NodeText | NodeImage | NodeTextImage

export interface DecisionNode {
  id: string
  content: NodeType
  options: {
    id: string
    content: NodeType
    next?: DecisionNode | DecisionNode['options'][number]['id']
  }[]
}

export type UserAnswers = DecisionNode['options'][number]['id'][]

function findNodeById(
  node: DecisionNode,
  id: string,
  rootNode: DecisionNode
): DecisionNode | undefined {
  // Check if the current node is the one we're looking for
  if (node.id === id) {
    return node
  }

  // If the node has options, iterate over them and search recursively
  if ('options' in node && node.options.length > 0) {
    for (const option of node.options) {
      if (option.next) {
        if (typeof option.next === 'string') {
          continue
        } else {
          const found = findNodeById(option.next, id, rootNode)
          if (found) return found
        }
      }
    }
  }

  // If nothing is found
  return undefined
}

type OnSelect = (
  optionNode: DecisionNode['options'][number],
  toNode: DecisionNode,
  fromNode: DecisionNode
) => Promise<void>

const OptionNodeComponent = ({
  node,
  onSelect,
  variant,
}: {
  node: DecisionNode['options'][number]
  variant?: ComponentProps<typeof Button>['variant']
  onSelect: (optionNode: DecisionNode['options'][number], next: DecisionNode) => void
}) => {
  return (
    <Button
      variant={variant}
      onClick={() => {
        if (node.next) {
          if (typeof node.next === 'string') {
            const nextNode = findNodeById(rootNode, node.next, rootNode)
            if (nextNode) {
              onSelect(node, nextNode)
            }
          } else {
            onSelect(node, node.next)
          }
        }
      }}
    >
      {node.content.image ? (
        <Image alt="" src={node.content.image} width={100} height={100} />
      ) : null}
      {node.content.text ? <div>{node.content.text}</div> : null}
    </Button>
  )
}

const DecisionNodeComponent = ({ node, onSelect }: { node: DecisionNode; onSelect: OnSelect }) => {
  return (
    <Card className="mx-auto w-full max-w-md [&_a]:underline [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-black">
      <CardHeader>
        {node.content.image ? (
          <Image alt="" src={node.content.image} width={100} height={100} />
        ) : null}
      </CardHeader>
      <CardContent className="w-full space-y-4">
        {node.content.text ? (
          typeof node.content.text === 'string' ? (
            <div className="w-full" dangerouslySetInnerHTML={{ __html: node.content.text }} />
          ) : (
            node.content.text
          )
        ) : null}
        <div className="flex flex-row-reverse justify-between">
          {node.options.map((option, i) => (
            <OptionNodeComponent
              key={option.id}
              node={option}
              onSelect={(optionNode, next) => onSelect(optionNode, next, node)}
              variant={i === 0 ? 'default' : 'outline'}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="w-full">
        {node.content.info ? (
          typeof node.content.info === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: node.content.info }} />
          ) : (
            node.content.info
          )
        ) : null}
      </CardFooter>
    </Card>
  )
}

const md = `
graph TD
    using-framework{"Are you using a framework?"} -->|Yes| brand-new-project{"Is it a brand new web project?"}
    using-framework -->|No| dont-use-vercel-no-framework["Don't use Vercel<br/>Why are you even thinking about using Vercel?"]

    brand-new-project -->|Yes| traffic-scale{"From the scale 0-10, how sure are you with your project getting lots of traffic?"}
    brand-new-project -->|No| project-traffic{"Does your project have lots of traffic?"}

    traffic-scale -->|6-10| server-experience{"Have you or anyone in your team set up a server before?"}
    traffic-scale -->|1-5| use-vercel-traffic-confidence-low["Just use Vercel<br/>Vercel has an attractive free plan so you can try it out to see if there's a product market fit."]

    server-experience -->|Yes| mentioned-by-guillermo{"Do you want to have the chance to have your project mentioned by Guillermo Rauch?"}
    server-experience -->|No| use-vercel-no-server-experience["Just use Vercel<br/>Maintaining a server is not an easy task. You have to take care of software upgrade, security, traffic management, etc 😵‍💫. Better to focus on your project by deploying it on Vercel."]

    mentioned-by-guillermo -->|Yes| use-vercel-yes-mentioned-by-guillermo["Just use Vercel<br/>It's <strong>actually</strong> better to host your project on your own server. But by hosting it on Vercel, you have the chance to get exposure by having your project mentioned by Guillermo Rauch. 🙈"]
    mentioned-by-guillermo -->|No| dont-use-vercel-no-mentioned-by-guillermo["Don't use Vercel<br/>If you host it on Vercel, you might be charged a lot because of the high traffic 🤑. So host it on your own since you have the resources to do so."]

    project-traffic -->|Yes| server-experience
    project-traffic -->|No| use-vercel-no-project-traffic["Just use Vercel<br/>It's better to deploy to Vercel so that you can focus on your project instead of maintaining a server."]
`

const rootNode = parseMermaidToDecisionNode(md)!
const userAnswers = atomWithReset<UserAnswers>([rootNode.id])
const currentNode = atomWithReset<DecisionNode | null>(rootNode)

const postCount = async ({
  answers,
  recaptchaToken,
}: {
  answers: string
  recaptchaToken: string
}) => {
  return await fetch(`/should-you-use-vercel/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      answers,
      recaptchaToken,
    }),
  }).then((res) => res.json())
}

const FlowchartContainer = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <QueryClientProvider client={queryClient}>
        <Flowchart />
      </QueryClientProvider>
    </ReCaptchaProvider>
  )
}
const Flowchart = () => {
  const { executeRecaptcha } = useReCaptcha()
  const [answers, setAnswers] = useAtom(userAnswers)
  const [currentDecisionNode, setCurrentDecisionNode] = useAtom(currentNode)
  const resetAnswers = useResetAtom(userAnswers)
  const resetCurrentNode = useResetAtom(currentNode)

  const queryClient = useQueryClient()

  // Mutations
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: postCount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['count'] })
    },
    mutationKey: ['count'],
  })

  const isLast = currentDecisionNode?.options.length === 0
  const enabled = isLast && answers.length > 0 && isSuccess && !isPending

  const { data, isFetching: isGettingCountPending } = useQuery({
    queryKey: ['answers', answers.join('>>>')],
    queryFn: async () => {
      const data = await fetch(`/should-you-use-vercel/api?answers=${answers.join('>>>')}`).then(
        (res) => res.json()
      )
      return data
    },
    enabled,
  })

  const animation = isLast
    ? {
        from: 'opacity-0 scale-[4]',
        to: 'opacity-100 scale-100',
        style: { transitionTimingFunction: 'cubic-bezier(0.25, 0.4, 0.55, 1.4)' },
      }
    : {
        from: 'opacity-0 translate-x-4',
        to: 'opacity-100 translate-y-0 translate-x-0',
        style: { transitionTimingFunction: 'cubic-bezier(0.25, 0.4, 0.55, 1.4)' },
      }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 [&_a]:text-primary-500 [&_a]:underline">
      <div className="mx-auto max-w-3xl space-y-4 p-4 text-center">
        <h1 className="text-6xl font-bold">{title}</h1>
        <div className="text-gray-500" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className="flex w-full flex-col items-center justify-center space-y-4">
        {currentDecisionNode ? (
          <>
            <AnimateIn className="w-full" key={currentDecisionNode.id} {...animation}>
              <DecisionNodeComponent
                node={currentDecisionNode}
                onSelect={async (_optionNode, toNode) => {
                  const newAnswers = [...answers, toNode.id]
                  if (toNode.options.length === 0) {
                    const token = await executeRecaptcha('form_submit')
                    mutate({
                      answers: newAnswers.join('>>>'),
                      recaptchaToken: token,
                    })
                  }
                  setAnswers(newAnswers)
                  setCurrentDecisionNode(toNode)
                }}
              />
            </AnimateIn>

            {isLast && !isPending && !isGettingCountPending && data ? (
              <>
                <Badge className="px-4 py-2">{`🎉 You're one of ${data.count} people who arrived at this recommendation!`}</Badge>
                <a
                  className="underline"
                  target="_blank"
                  href={`https://twitter.com/intent/tweet?url=${`https://www.nico.fyi/should-you-use-vercel?use=${currentDecisionNode.id.startsWith(`dont-use-vercel`) ? '0' : '1'}`}&text=${`I'm one of ${data.count} who should ${currentDecisionNode.id.startsWith(`dont-use-vercel`) ? 'not ' : ''}use Vercel!`}`}
                >
                  Share on Twitter/X
                </a>
              </>
            ) : //
            null}
          </>
        ) : null}
      </div>
      <div>
        <Button
          variant="outline"
          size="sm"
          className="mr-auto"
          onClick={() => {
            resetCurrentNode()
            resetAnswers()
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

export default FlowchartContainer

// from here on, the code is generated by ChatGPT. I just did some minor tweaks to make it work.

// Utility function to parse node info considering complex enclosures
function extractNodeInfo(part: string): DecisionNode | null {
  // Normalize the input by removing any connection labels
  part = part.replace(/\|[^|]+\|/, '').trim()

  // Determine the position of the first potential opening character
  const openingChars = '([{<'
  const closingChars = ')]}>'

  const stack = []
  let startIdx = -1
  let id = ''
  let text = ''

  for (let i = 0; i < part.length; i++) {
    const char = part[i]

    if (openingChars.includes(char)) {
      stack.push({ char, idx: i })
      if (stack.length === 1) {
        // Assume the text before the first opening character is the ID
        id = part.substring(0, i).trim()
        startIdx = i + 1
      }
    } else if (closingChars.includes(char)) {
      if (stack.length === 0) continue // Ignore unmatched closing characters

      const last = stack.pop()
      if (openingChars.indexOf(last?.char || '') !== closingChars.indexOf(char)) {
        console.error('Mismatched braces in Mermaid.js syntax')
        return null // Mismatched braces
      }
      if (stack.length === 0) {
        // Closing the outermost brace, extract the text
        text = part.substring(startIdx, i).replace(/["']/g, '').trim()
        break // Exit after finding the first complete enclosure
      }
    }
  }

  if (id && text) {
    const [title, ...rest] = text.split('<br/>')
    const titleComponent = rest.length > 0 ? <p className="text-5xl font-bold">{title}</p> : title
    return {
      id,
      content: { type: 'text', text: titleComponent, info: rest.join('<br/>') },
      options: [],
    }
  } else {
    // If no braces were found, assume it's just an ID without a description
    return { id: part.trim(), content: { type: 'text', text: part.trim() }, options: [] }
  }
}

// Main function to construct the DecisionNode from Mermaid markdown
export function parseMermaidToDecisionNode(markdown: string): DecisionNode | null {
  const lines = markdown.split('\n')
  const nodes: Map<string, DecisionNode> = new Map()
  const rootCandidates = new Set<string>()

  lines.forEach((line) => {
    // Extract nodes and create/update them
    const parts = line.split('-->')
    if (parts.length === 2) {
      const fromPart = parts[0].trim()
      const toPart = parts[1].trim()

      const fromNodeInfo = extractNodeInfo(fromPart)
      const toNodeInfo = extractNodeInfo(toPart)

      if (fromNodeInfo && toNodeInfo) {
        const labelStart = parts[1].indexOf('|') + 1
        const labelEnd = parts[1].indexOf('|', labelStart)
        const label = parts[1].substring(labelStart, labelEnd).trim()

        const fromNode = nodes.get(fromNodeInfo.id) || fromNodeInfo
        const toNode = nodes.get(toNodeInfo.id) || toNodeInfo

        fromNode.options.push({
          id: `${label.toLowerCase()}-${toNode.id}`,
          content: { type: 'text', text: label },
          next: toNode,
        })

        nodes.set(fromNodeInfo.id, fromNode)
        nodes.set(toNodeInfo.id, toNode)

        rootCandidates.add(fromNodeInfo.id)
        rootCandidates.delete(toNodeInfo.id)
      }
    }
  })

  // Determine the root node (a node that's not a child of any node)
  const rootNodeId = rootCandidates.values().next().value
  const rootNode = nodes.get(rootNodeId) || null
  return rootNode
}
