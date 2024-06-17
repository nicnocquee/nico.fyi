import { allBlogs } from 'contentlayer/generated'
import { sortPosts } from 'pliny/utils/contentlayer'
import { env } from '@/app/env'

/**
 * return blog posts that are not draft and not in the future
 * @returns blog array
 */
export const displayablePosts = (
  showAll: boolean = !!env.NEXT_PUBLIC_SHOW_ALL_POSTS && env.NEXT_PUBLIC_SHOW_ALL_POSTS === 'true'
) => {
  return sortPosts(allBlogs).filter((b) => {
    return showAll ? true : new Date(b.date) < new Date() && !b.draft && b.isBlog
  })
}
