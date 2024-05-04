import { Tab } from './basic-tabs'

const tabs = [
  {
    label: 'Home',
    content: `
  Hello world! This is the home page of the Animated Tabs experiment. It's a simple tabbed interface that allows users to switch between different sections of content. The tabs are animated using CSS transitions and the content is displayed based on the selected tab. This experiment is a great way to showcase the power of CSS transitions and how they can be used to create engaging and interactive user interfaces.
  `,
  },
  { label: 'Integrations', content: 'Content 2 Integrations Integrations' },
  { label: 'Usage', content: 'Content 3 Usage Usage' },
]

export default function AnimatedTabs() {
  return (
    <div className="justify-top mx-auto flex h-screen w-full max-w-md flex-col items-center">
      <Tab tabs={tabs} />
    </div>
  )
}
