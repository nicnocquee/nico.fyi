import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent } from 'pliny/utils/contentlayer'
import { displayablePosts } from '@/app/(blog)/blogs-data'

export const revalidate = 60
export const dynamicParams = true

export const generateStaticParams = async () => {
  const posts = allCoreContent(displayablePosts())
  const paths = [] as { params: { month: string; year: string; count: number } }[]

  posts.forEach((post) => {
    const postDate = new Date(post.date)
    const year = postDate.getFullYear()
    const month = postDate.getMonth() + 1
    const existingPath = paths.find(
      (p) => p.params.month === month.toString() && p.params.year === year.toString()
    )

    if (existingPath) {
      existingPath.params.count = existingPath.params.count + 1
    } else {
      paths.push({
        params: { month: month.toString(), year: year.toString(), count: 1 },
      })
    }
  })

  return paths
}

export default function Page({ params }: { params: { month: string; year: string } }) {
  let posts = allCoreContent(displayablePosts())
  const month = parseInt(params.month as string)
  const year = parseInt(params.year as string)

  posts = posts.filter((post) => {
    const postDate = new Date(post.date)
    return postDate.getFullYear() === year && postDate.getMonth() === month
  })

  const pagination = {
    currentPage: 0,
    totalPages: 1,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={posts}
      pagination={pagination}
      title={`${year}/${month}`}
    />
  )
}
