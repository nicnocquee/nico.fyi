'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

const FormSchema = z.object({
  content: z.string().min(0, {
    message: 'Markdown is required',
  }),
})

function defaultOnSubmit(data: z.infer<typeof FormSchema>) {
  toast({
    title: 'You submitted the following values:',
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  })
}

export function TextareaForm({
  content,
  onSubmit,
}: {
  content: string
  onSubmit?: (data: z.infer<typeof FormSchema>) => void
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit || defaultOnSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post</FormLabel>
              <FormControl>
                <Textarea placeholder="Write markdown here" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>You can write markdown here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
