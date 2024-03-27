import { makeRoute } from '@nicnocquee/next-type-safe-routing'

import { z } from 'zod'

const slugParam = z.object({ slug: z.array(z.string()) })

export const routes = {
  blogPage: makeRoute(({ slug }) => `/blog/${slug.join('/')}`, slugParam),
}
