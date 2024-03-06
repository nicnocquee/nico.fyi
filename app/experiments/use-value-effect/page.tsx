import ClientOnly from '../client-only'
import TheComponent, { TheComponent2 } from './component'

const ExperimentPage = async () => {
  return (
    <div className="flex flex-col space-y-2">
      <ClientOnly>
        <TheComponent />
        <TheComponent2 />
      </ClientOnly>
    </div>
  )
}

export default ExperimentPage
