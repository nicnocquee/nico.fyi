import { Metadata } from 'next'
import Flowchart from './content'

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
  },
}

const FlowchartPage = () => {
  return <Flowchart />
}

export default FlowchartPage
