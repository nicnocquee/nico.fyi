'use client'

import React, { useState } from 'react'

// Define types for the decision tree nodes
interface DecisionNode {
  question: string
  options: DecisionNode[]
  finalDecision?: string // A final decision doesn't have options
}

// Type assertion for the parsed decision tree
type ParsedDecisionTree = DecisionNode[]

const decisionTreeText = `
- Are you using a framework like Next.js or Remix?
  - Yes:
    - Is it a brand new web project?
      - Yes:
        - From the scale 0-10, using comfort, how sure are you with your project getting lots of traffic?
          - 6-10:
            - Have you or anyone in your team set up a server before?
              - Yes: Don't use Vercel.
              - No: Just use Vercel.
          - 1-5: Just use Vercel.
      - No:
        - Does your project have lots of traffic?
          - Yes: Don't use Vercel.
          - No: Just use Vercel.
  - No: Just use Vercel.
`

const parseDecisionTree = (text: string): DecisionNode[] => {
  const lines = text.split('\n').filter((line) => line.trim() !== '')
  const tree: DecisionNode[] = []
  const stack: Array<{ node: DecisionNode; depth: number }> = []

  lines.forEach((line) => {
    const depthMatch = line.match(/^(\s*-)+/) // Match the leading hyphens and spaces only
    const depth = depthMatch ? depthMatch[0].length / 2 : 0 // Two characters ('- ') per depth level
    const content = line
      .substring(depth * 2)
      .trim()
      .replace(/:$/, '')

    if (content) {
      const newNode: DecisionNode = { question: content, options: [] }

      while (stack.length && stack[stack.length - 1].depth >= depth) {
        stack.pop()
      }

      if (stack.length > 0) {
        const parent = stack[stack.length - 1].node
        parent.options.push(newNode)
      } else {
        tree.push(newNode)
      }

      stack.push({ node: newNode, depth })
    }
  })

  return tree
}

const DecisionTree: React.FC<{ tree: DecisionNode[] }> = ({ tree }) => {
  const [path, setPath] = useState<string[]>([])
  const [currentNode, setCurrentNode] = useState<DecisionNode | null>(tree[0])

  const handleOptionClick = (node: DecisionNode) => {
    if (!node.options.length) {
      alert(node.question)
    } else {
      setPath([...path, node.question])
      setCurrentNode(node.options[0])
    }
  }

  const renderOptions = (node: DecisionNode) => {
    return (
      <ul>
        {node.options.map((option, index) => (
          <li key={index}>
            <button onClick={() => handleOptionClick(option)}>{option.question}</button>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      <div>Path: {path.join(' > ')}</div>
      {currentNode && (
        <div>
          {currentNode.question}
          {renderOptions(currentNode)}
        </div>
      )}
    </div>
  )
}

const FlowchartPage = () => {
  const tree = parseDecisionTree(decisionTreeText)
  console.log(tree)

  return (
    <div>
      <DecisionTree tree={tree} />
    </div>
  )
}

export default FlowchartPage
