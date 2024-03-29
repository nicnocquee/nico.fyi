import { z } from 'zod'
import { Octokit } from 'octokit'
import matter from 'gray-matter'
import repoConfig from './config'

const octokit = new Octokit({
  auth: repoConfig.auth,
})

const linkSchema = z.object({
  git: z.string().url().nullable(),
  html: z.string().url().nullable(),
  self: z.string().url(),
})

const fileSchema = z.object({
  type: z.string(),
  size: z.number().int(),
  name: z.string(),
  path: z.string(),
  sha: z.string(),
  url: z.string().url(),
  git_url: z.string().url().nullable(),
  html_url: z.string().url().nullable(),
  download_url: z.string().url().nullable(),
  _links: linkSchema,
})

const filesSchema = z.array(fileSchema)

const stringOrArraySchema = z
  .union([z.array(z.string()), z.string().optional()])
  .optional()
  .transform((v) => {
    if (typeof v === 'string') {
      return [v]
    }
    return v
  })

const markdownSchema = z.object({
  content: z.string(),
  data: z.object({
    title: z.string(),
    date: z.string(),
    tags: stringOrArraySchema,
    draft: z.boolean().optional(),
    summary: z.string().nullable().optional(),
    images: stringOrArraySchema,
    authors: stringOrArraySchema,
    layout: z.string().optional(),
    bibliography: z.string().optional(),
    canonicalUrl: z.string().optional(),
    isBlog: z.boolean().optional(),
  }),
})

export const getMarkdownFiles = async () => {
  const { auth, apiVersion, ...rest } = repoConfig
  const response = await octokit.request(`GET /repos/{owner}/{repo}/contents/{path}?ref={ref}`, {
    ...rest,
    headers: {
      accept: 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': apiVersion,
    },
  })

  const files = filesSchema.parse(response.data)

  return files
}

export const getMarkdownFile = async (file: string) => {
  const { auth, apiVersion, ...rest } = repoConfig
  const response = await octokit.request(`GET /repos/{owner}/{repo}/contents/{path}?ref={ref}`, {
    ...rest,
    headers: {
      accept: 'application/vnd.github.raw+json',
      'X-GitHub-Api-Version': apiVersion,
    },
    path: file,
  })

  const raw = z.string().parse(response.data)
  const markdown = markdownSchema.parse(matter(raw))

  return { markdown, raw }
}

export const editMarkdownFile = async (file: z.infer<typeof fileSchema>, content: string) => {
  const { auth, apiVersion, ...rest } = repoConfig
  const response = await octokit.request(`PUT /repos/{owner}/{repo}/contents/{path}?ref={ref}`, {
    ...rest,
    headers: {
      accept: 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': apiVersion,
    },
    path: file.path,
    message: `Update ${file.name}`,
    content: Buffer.from(content).toString('base64'),
    sha: file.sha,
  })

  return response
}
