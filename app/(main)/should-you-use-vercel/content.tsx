'use client'
import { ReCaptchaProvider, useReCaptcha } from 'next-recaptcha-v3'
import { useAtom } from 'jotai'
import { atomWithReset, atomWithStorage, useResetAtom } from 'jotai/utils'
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
import { DecisionNode, NodeType, UserAnswers, decisionTree } from './data'

const title = 'Should you use Vercel?'
const description = `Vercel recently updated their pricing model which caused some uproar among developers. Answer the following questions to find out if you should use Vercel or not.<br/>Read the <a href="https://www.nico.fyi/blog/should-you-use-vercel">blog post here.</a>`

const queryClient = new QueryClient()

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
  currentId: DecisionNode['options'][number]['id'],
  next: DecisionNode
) => Promise<void>

const OptionNodeComponent = ({
  node,
  onSelect,
  variant,
}: {
  node: DecisionNode['options'][number]
  variant?: ComponentProps<typeof Button>['variant']
  onSelect: OnSelect
}) => {
  return (
    <Button
      variant={variant}
      onClick={() => {
        if (node.next) {
          if (typeof node.next === 'string') {
            const nextNode = findNodeById(decisionTree, node.next, decisionTree)
            if (nextNode) {
              onSelect(node.id, nextNode)
            }
          } else {
            onSelect(node.id, node.next)
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
    <Card className="w-full max-w-md [&_a]:underline">
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
              onSelect={onSelect}
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

function transformTextToReactElement(node: DecisionNode): DecisionNode {
  // Helper function to transform the text if it's not a string
  const transformText = (text: string | React.ReactNode): React.ReactNode => {
    if (typeof text === 'string') {
      return text
    } else {
      // Assuming the object has a 'props' property to create a React element
      // Adjust based on the actual structure of your non-string text objects
      // @ts-expect-error
      return React.createElement(text.type, { ...text.props })
    }
  }

  const transformNodeContent = (content: NodeType): NodeType => {
    // Check and transform the text property
    if ('text' in content && content.text) {
      content.text = transformText(content.text)
    }
    return content
  }

  // Transform the root content
  const transformedContent = transformNodeContent(node.content)

  // Recursively transform options
  const transformedOptions = node.options.map((option) => {
    return {
      ...option,
      content: transformNodeContent(option.content),
      next: option.next ? transformTextToReactElement(option.next as DecisionNode) : undefined,
    }
  })

  return {
    ...node,
    content: transformedContent,
    options: transformedOptions,
  }
}

const userAnswers = atomWithReset<UserAnswers>([])
const currentNode = atomWithReset<DecisionNode | null>(decisionTree)

const postCount = async ({ answers, recaptchaToken }) => {
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
            <AnimateIn key={currentDecisionNode.id} {...animation}>
              <DecisionNodeComponent
                node={currentDecisionNode}
                onSelect={async (id, next) => {
                  const newAnswers = [...answers, id]
                  if (next.options.length === 0) {
                    const token = await executeRecaptcha('form_submit')
                    mutate({ answers: newAnswers.join('>>>'), recaptchaToken: token })
                  }
                  setAnswers(newAnswers)
                  setCurrentDecisionNode(next)
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
