import { allCoreContent } from 'pliny/utils/contentlayer'
import Main from './Main'
import { displayablePosts } from '@/data/blogsData'

export const revalidate = 60

export default async function Page() {
  const sortedPosts = displayablePosts()
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
