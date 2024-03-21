import { sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

export const getPublishedBlogs = () => {
  return sortPosts(allBlogs.filter((b) => !b.draft && b.isBlog))
}
