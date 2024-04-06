'use client'

import { useAtom } from 'jotai'
import { atomWithStorage, useResetAtom } from 'jotai/utils'
import { nanoid } from 'nanoid'
import Image from 'next/image'
import React from 'react'

interface NodeBase {
  text?: string
  image?: string
}

interface NodeText extends NodeBase {
  type: 'text'
  text: string
}

interface NodeImage extends NodeBase {
  type: 'image'
  image: string
}

interface NodeTextImage extends NodeBase {
  type: 'text-image'
  text: string
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
  text: 'Are you using a framework like Next.js or Remix?',
}
const yesNode: NodeText = { type: 'text', text: 'Yes' }
const noNode: NodeText = { type: 'text', text: 'No' }
const brandNewProjectNode: NodeText = { type: 'text', text: 'Is it a brand new web project?' }
const trafficScaleNode: NodeText = {
  type: 'text',
  text: 'From the scale 0-10, using comfort, how sure are you with your project getting lots of traffic?',
}
const trafficConfidenceHighNode: NodeText = { type: 'text', text: '6-10' }
const serverExperienceNode: NodeText = {
  type: 'text',
  text: 'Have you or anyone in your team set up a server before?',
}
const dontUseVercelNode: NodeText = { type: 'text', text: "Don't use Vercel" }
const useVercelNode: NodeText = { type: 'text', text: 'Just use Vercel' }
const trafficConfidenceLowNode: NodeText = { type: 'text', text: '1-5' }
const projectTrafficNode: NodeText = {
  type: 'text',
  text: 'Does your project have lots of traffic?',
}

const useVercelEnd = {
  content: useVercelNode,
  id: nanoid(),
  options: [],
}
const dontUseVercelEnd = {
  content: dontUseVercelNode,
  id: nanoid(),
  options: [],
}

const serverExperienceNodeId = nanoid()

// Build the decision tree using the defined nodes
const decisionTree: DecisionNode = {
  content: usingFrameworkNode,
  id: nanoid(),
  options: [
    {
      content: yesNode,
      id: nanoid(),
      next: {
        content: brandNewProjectNode,
        id: nanoid(),
        options: [
          {
            content: yesNode,
            id: nanoid(),
            next: {
              content: trafficScaleNode,
              id: nanoid(),
              options: [
                {
                  content: trafficConfidenceHighNode,
                  id: nanoid(),
                  next: {
                    content: serverExperienceNode,
                    id: serverExperienceNodeId,
                    options: [
                      {
                        content: yesNode,
                        id: nanoid(),
                        next: dontUseVercelEnd,
                      },
                      {
                        content: noNode,
                        id: nanoid(),
                        next: useVercelEnd,
                      },
                    ],
                  },
                },
                {
                  content: trafficConfidenceLowNode,
                  id: nanoid(),
                  next: useVercelEnd,
                },
              ],
            },
          },
          {
            content: noNode,
            id: nanoid(),
            next: {
              content: projectTrafficNode,
              id: nanoid(),
              options: [
                {
                  content: yesNode,
                  id: nanoid(),
                  next: serverExperienceNodeId,
                },
                {
                  content: noNode,
                  id: nanoid(),
                  next: useVercelEnd,
                },
              ],
            },
          },
        ],
      },
    },
    {
      content: noNode,
      id: nanoid(),
      next: dontUseVercelEnd,
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
          const found = findNodeById(rootNode, option.next, rootNode)
          if (found) return found
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
}: {
  node: DecisionNode['options'][number]
  onSelect: OnSelect
}) => {
  return (
    <button
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
    </button>
  )
}

const DecisionNodeComponent = ({ node, onSelect }: { node: DecisionNode; onSelect: OnSelect }) => {
  return (
    <div>
      {node.content.image ? (
        <Image alt="" src={node.content.image} width={100} height={100} />
      ) : null}
      {node.content.text ? <div>{node.content.text}</div> : null}
      {node.options.map((option) => (
        <OptionNodeComponent key={option.id} node={option} onSelect={onSelect} />
      ))}
    </div>
  )
}

const userAnswers = atomWithStorage<UserAnswers>('answers', [])
const answeredNodes = atomWithStorage<DecisionNode['id'][]>('answeredNodes', [decisionTree.id])

const FlowchartPage = () => {
  const [answers, setAnswers] = useAtom(userAnswers)
  const [answeredNodeIds, setAnsweredNodeIds] = useAtom(answeredNodes)
  const resetAnswers = useResetAtom(userAnswers)
  const resetAnswered = useResetAtom(answeredNodes)

  const lastNode = answeredNodeIds.at(-1)
  if (!lastNode) {
    return <div>No node found</div>
  }

  const currentDecisionNode = findNodeById(decisionTree, lastNode, decisionTree)

  if (!currentDecisionNode) {
    return <div>No node found</div>
  }

  return (
    <div>
      <DecisionNodeComponent
        node={currentDecisionNode}
        onSelect={(id, nextId) => {
          setAnsweredNodeIds((prev) => [...prev, nextId])
          setAnswers((prev) => [...prev, id])
        }}
      />
      <button
        onClick={() => {
          resetAnswered()
          resetAnswers()
        }}
      >
        Reset
      </button>
      <div>{answers.join(' > ')}</div>
    </div>
  )
}

export default FlowchartPage
