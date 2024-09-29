import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { genPageMetadata } from 'app/seo'
import { generateStaticParams } from '@/app/(blog)/year/[year]/month/[month]/page'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export const revalidate = 60

export default async function Page() {
  const datesPaths = await generateStaticParams()
  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Published At
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {datesPaths.map(({ params: { year, month, count } }) => {
            return (
              <div key={`${year}-${month}`} className="mb-2 mr-5 mt-2">
                <Tag
                  text={`${year}/${month}`}
                  href={`/year/${year}/month/${parseInt(month) - 1}`}
                />
                <Link
                  href={`/year/${year}/month/${parseInt(month) - 1}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                  aria-label={`View posts published in ${year}/${month}`}
                >
                  {` (${count})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
