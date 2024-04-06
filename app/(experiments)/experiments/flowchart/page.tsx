'use client'

import { useAtom } from 'jotai'
import { atomWithStorage, useResetAtom } from 'jotai/utils'
import Image from 'next/image'
import React, { ComponentProps } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

const title = 'Should you use Vercel?'
const description = `Vercel recently updated their pricing model which caused some uproar among developers. Answer the following questions to find out if you should use Vercel or not.`

interface NodeBase {
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
type NodeType = NodeText | NodeImage | NodeTextImage

interface DecisionNode {
  id: string
  content: NodeType
  options: {
    id: string
    content: NodeType
    next?: DecisionNode | DecisionNode['options'][number]['id']
  }[]
}

type UserAnswers = DecisionNode['options'][number]['id'][]

// Define content nodes
const usingFrameworkNode: NodeText = {
  type: 'text',
  text: 'Are you using a framework like <a target="_blank" href="https://nextjs.org/">Next.js</a> or <a target="_blank" href="https://remix.run/">Remix</a>?',
}
const yesNode: NodeText = { type: 'text', text: 'Yes' }
const noNode: NodeText = { type: 'text', text: 'No' }
const brandNewProjectNode: NodeText = { type: 'text', text: 'Is it a brand new web project?' }
const trafficScaleNode: NodeText = {
  type: 'text',
  text: 'From the scale 0-10, 10 being the most confident, how sure are you with your project getting lots of traffic?',
}
const trafficConfidenceHighNode: NodeText = { type: 'text', text: '6-10' }
const serverExperienceNode: NodeText = {
  type: 'text',
  text: 'Have you or anyone in your team set up a server before?',
}
const dontUseVercelNode: NodeText = {
  type: 'text',
  text: <p className="text-5xl font-bold">Don't use Vercel</p>,
}
const useVercelNode: NodeText = {
  type: 'text',
  text: <p className="text-5xl font-bold">Just use Vercel</p>,
}
const trafficConfidenceLowNode: NodeText = { type: 'text', text: '1-5' }
const projectTrafficNode: NodeText = {
  type: 'text',
  text: 'Does your project have lots of traffic?',
}
const mentionedByGuillermoNode: NodeText = {
  type: 'text',
  text: 'Do you want to have the chance to have your project mentioned by <a target="_blank" href="https://twitter.com/rauchg">Guillermo Rauch</a>, the CEO of Vercel?',
}

const vercelEnd = (idSuffix: string, info?: string) => ({
  content: {
    ...useVercelNode,
    info,
  },
  id: `use-vercel-${idSuffix}`,
  options: [],
})
const dontUseVercelEnd = (idSuffix: string, info?: string) => ({
  content: {
    ...dontUseVercelNode,
    info,
  },
  id: `dont-use-vercel-${idSuffix}`,
  options: [],
})

const serverExperienceNodeId = 'server-experience'

// Build the decision tree using the defined nodes
const decisionTree: DecisionNode = {
  content: usingFrameworkNode,
  id: 'using-framework',
  options: [
    {
      content: yesNode,
      id: 'yes-use-framework',
      next: {
        content: brandNewProjectNode,
        id: 'brand-new-project',
        options: [
          {
            content: yesNode,
            id: 'yes-brand-new-project',
            next: {
              content: trafficScaleNode,
              id: 'traffic-scale',
              options: [
                {
                  content: trafficConfidenceHighNode,
                  id: 'traffic-confidence-high',
                  next: {
                    content: serverExperienceNode,
                    id: serverExperienceNodeId,
                    options: [
                      {
                        content: yesNode,
                        id: 'yes-server-experience',
                        next: {
                          content: mentionedByGuillermoNode,
                          id: 'mentioned-by-guillermo',
                          options: [
                            {
                              content: yesNode,
                              id: 'yes-mentioned-by-guillermo',
                              next: vercelEnd(
                                'yes-mentioned-by-guillermo',
                                `It's <strong>actually</strong> better to host your project on your own server but by hosting it on Vercel, you have the chance to get exposure by having your project mentioned by Guillermo Rauch.`
                              ),
                            },
                            {
                              content: noNode,
                              id: 'no-mentioned-by-guillermo',
                              next: dontUseVercelEnd(
                                'no-mentioned-by-guillermo',
                                `If you host it on Vercel, you might be charged a lot because of the high traffic. So host it on your own since you have the resources to do so.`
                              ),
                            },
                          ],
                        },
                      },
                      {
                        content: noNode,
                        id: 'no-server-experience',
                        next: vercelEnd(
                          'no-server-experience',
                          `Maintaining a server is not an easy task. You have to take care of software upgrade, security, traffic management, etc. Better to focus on your project by deploying it on Vercel.`
                        ),
                      },
                    ],
                  },
                },
                {
                  content: trafficConfidenceLowNode,
                  id: 'traffic-confidence-low',
                  next: vercelEnd(
                    'traffic-confidence-low',
                    `Vercel has an attractive free plan so you can try it out to see if there's a product market fit.`
                  ),
                },
              ],
            },
          },
          {
            content: noNode,
            id: 'no-use-framework',
            next: {
              content: projectTrafficNode,
              id: 'project-traffic',
              options: [
                {
                  content: yesNode,
                  id: 'yes-project-traffic',
                  next: serverExperienceNodeId,
                },
                {
                  content: noNode,
                  id: 'no-project-traffic',
                  next: vercelEnd(
                    'no-project-traffic',
                    `It's better to deploy to Vercel so that you can focus on your project instead of maintaining a server.`
                  ),
                },
              ],
            },
          },
        ],
      },
    },
    {
      content: noNode,
      id: 'no-framework',
      next: dontUseVercelEnd('no-framework', `Why are you even thinking about using Vercel?`),
    },
  ],
}

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
  id: DecisionNode['options'][number]['id']
) => void

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
          onSelect(node.id, typeof node.next === 'string' ? node.next : node.next.id)
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
    <Card className="max-w-md [&_a]:underline">
      <CardHeader>
        {node.content.image ? (
          <Image alt="" src={node.content.image} width={100} height={100} />
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4">
        {node.content.text ? (
          typeof node.content.text === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: node.content.text }} />
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
      <CardFooter>
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

const userAnswers = atomWithStorage<UserAnswers>('answers', [])
const answeredNodes = atomWithStorage<DecisionNode['id'][]>('answeredNodes', [decisionTree.id])

const FlowchartPage = () => {
  const [, setAnswers] = useAtom(userAnswers)
  const [answeredNodeIds, setAnsweredNodeIds] = useAtom(answeredNodes)
  const resetAnswers = useResetAtom(userAnswers)
  const resetAnswered = useResetAtom(answeredNodes)

  const lastNode = answeredNodeIds.at(-1)
  if (!lastNode) {
    return <div>No node found</div>
  }

  const currentDecisionNode = findNodeById(decisionTree, lastNode, decisionTree)

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 w-full">
        <div className="mx-auto max-w-3xl space-y-4 p-4 text-center">
          <h1 className="text-6xl font-bold">{title}</h1>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center">
        {currentDecisionNode ? (
          <DecisionNodeComponent
            node={currentDecisionNode}
            onSelect={(id, nextId) => {
              setAnsweredNodeIds((prev) => [...prev, nextId])
              setAnswers((prev) => [...prev, id])
            }}
          />
        ) : null}
      </div>
      <div className="absolute bottom-0 right-0 p-4">
        <Button
          variant="outline"
          size="sm"
          className="mr-auto"
          onClick={() => {
            resetAnswered()
            resetAnswers()
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

export default FlowchartPage
