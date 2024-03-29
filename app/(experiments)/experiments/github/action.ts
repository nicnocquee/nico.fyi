'use server'

import 'server-only'

import { z } from 'zod'

const FormSchema = z.object({
  content: z.string().min(0, {
    message: 'Markdown is required',
  }),
})

export const formSubmit = async (data: z.infer<typeof FormSchema>) => {}
