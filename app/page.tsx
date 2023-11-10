import { allCoreContent } from 'pliny/utils/contentlayer'
import Main from './Main'
import { getPublishedBlogs } from './blog/blogs'

export default async function Page() {
  const sortedPosts = getPublishedBlogs()
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}