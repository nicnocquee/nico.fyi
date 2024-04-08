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
export const decisionTree: DecisionNode = {
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
                                `It's <strong>actually</strong> better to host your project on your own server. But by hosting it on Vercel, you have the chance to get exposure by having your project mentioned by Guillermo Rauch. 🙈`
                              ),
                            },
                            {
                              content: noNode,
                              id: 'no-mentioned-by-guillermo',
                              next: dontUseVercelEnd(
                                'no-mentioned-by-guillermo',
                                `If you host it on Vercel, you might be charged a lot because of the high traffic 🤑. So host it on your own since you have the resources to do so.`
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
                          `Maintaining a server is not an easy task. You have to take care of software upgrade, security, traffic management, etc 😵‍💫. Better to focus on your project by deploying it on Vercel.`
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

export function findNodeById(
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

type ValidationResult = {
  isValid: boolean
  message: string
}

function validateDecisionTree(
  root: DecisionNode,
  visitedIds = new Set<string>()
): ValidationResult {
  // Check for unique ID
  if (visitedIds.has(root.id)) {
    return { isValid: false, message: `Duplicate ID detected: ${root.id}` }
  }
  visitedIds.add(root.id)

  // Validate root node content
  if (!validateNodeContent(root.content)) {
    return { isValid: false, message: `Invalid content in node with ID: ${root.id}` }
  }

  // Validate options
  for (const option of root.options) {
    if (typeof option.next === 'object') {
      // Recursively validate nested DecisionNode
      const validation = validateDecisionTree(option.next, new Set(visitedIds))
      if (!validation.isValid) {
        return validation
      }
    } else if (typeof option.next === 'string') {
      // Validate reference to ID
      if (!visitedIds.has(option.next)) {
        return {
          isValid: false,
          message: `Invalid reference to non-existent ID: ${option.next} in node with ID: ${root.id}`,
        }
      }
    }

    // Ensure content is valid
    if (!validateNodeContent(option.content)) {
      return { isValid: false, message: `Invalid option content in node with ID: ${root.id}` }
    }
  }

  return { isValid: true, message: 'Validation successful' }
}

function validateNodeContent(content: NodeType): boolean {
  // Implement the logic to validate if the node content adheres to its type constraints
  switch (content.type) {
    case 'text':
      return !!content.text // Ensure text exists
    case 'image':
      return !!content.image // Ensure image exists
    case 'text-image':
      return !!content.text && !!content.image // Ensure both text and image exist
    default:
      return false // Unknown type
  }
}
