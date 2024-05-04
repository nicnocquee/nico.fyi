import { AnimatedNavTabs } from '../../../../../components/animated-nav-tabs/animated-nav-tabs'

export const StateTabs = ({
  tabs,
  onActiveTabChange,
}: {
  tabs: Array<[string, string, boolean]>
  onActiveTabChange: (path: string) => void
}) => {
  const renderedTabs = tabs.map((tab) => {
    return {
      path: tab[0],
      label: (
        <button
          onClick={() => {
            onActiveTabChange(tab[0])
          }}
        >
          {tab[1]}
        </button>
      ),
      active: tab[2],
    }
  })

  return <AnimatedNavTabs tabs={renderedTabs} springy />
}
