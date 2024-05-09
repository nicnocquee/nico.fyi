import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function GET(_request: NextRequest) {
  revalidatePath('/', 'layout')
  revalidatePath('/blog', 'page')
  revalidatePath('/insights', 'page')
  revalidatePath('/tags', 'page')
  revalidatePath('/blog/[...slug]', 'page')
  revalidatePath('/blog/page/[page]', 'page')
  return Response.json({ revalidated: true, now: Date.now() })
}
