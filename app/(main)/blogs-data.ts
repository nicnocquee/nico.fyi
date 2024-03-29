import { allBlogs } from 'contentlayer/generated'
import { sortPosts } from 'pliny/utils/contentlayer'

/**
 * return blog posts that are not draft and not in the future
 * @returns blog array
 */
export const displayablePosts = () => {
  return sortPosts(allBlogs).filter((b) => {
    return process.env.NEXT_PUBLIC_SHOW_ALL_POSTS
      ? true
      : new Date(b.date) < new Date() && !b.draft && b.isBlog
  })
}
