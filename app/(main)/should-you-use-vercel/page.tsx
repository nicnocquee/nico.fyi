import { Metadata } from 'next'
import Flowchart from './content'
import OGImage from './ogimage.jpg'

export const metadata: Metadata = {
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
    images: [OGImage.src],
  },
  twitter: {
    title: 'Should you use Vercel?',
    card: 'summary_large_image',
    images: [OGImage.src],
  },
}

const FlowchartPage = () => {
  return <Flowchart />
}

export default FlowchartPage
