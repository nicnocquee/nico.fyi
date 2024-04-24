import { Metadata } from 'next'
import Flowchart from './content'
import OGImage from './ogimage.jpg'
import OGImageYes from './ogimage-yes.jpg'
import OGImageNo from './ogimage-no.jpg'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const image = searchParams
    ? searchParams.use
      ? searchParams.use === '1'
        ? OGImageYes
        : OGImageNo
      : OGImage
    : OGImage
  return {
    title: 'Should you use Vercel?',
    description: `Vercel recently updated their pricing model which caused some uproar among developers. Answer the following questions to find out if you should use Vercel or not.`,
    keywords: ['vercel', 'pricing', 'model', 'uproar', 'developers'],
    creator: 'Nico Prananta',
    openGraph: {
      title: 'Should you use Vercel?',
      description: `Vercel recently updated their pricing model which caused some uproar among developers. Answer the following questions to find out if you should use Vercel or not.`,
      url: 'https://www.nico.fyi/articles/should-you-use-vercel',
      siteName: 'nico.fyi',
      locale: 'en_US',
      type: 'website',
      images: [image.src],
    },
    twitter: {
      title: 'Should you use Vercel?',
      card: 'summary_large_image',
      images: [image.src],
    },
  }
}

const FlowchartPage = () => {
  return <Flowchart />
}

export default FlowchartPage
