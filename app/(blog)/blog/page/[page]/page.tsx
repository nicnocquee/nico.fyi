import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent } from 'pliny/utils/contentlayer'
import { displayablePosts } from '@/app/(blog)/blogs-data'

const POSTS_PER_PAGE = 5
export const revalidate = 60
export const dynamicParams = true

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(displayablePosts().length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const posts = allCoreContent(displayablePosts())
  const pageNumber = parseInt(params.page as string)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
