import ClientOnly from '../client-only'
import { MovieResult } from './component'

const ExperimentPage = async () => {
  return (
    <div className="flex flex-col space-y-2">
      <ClientOnly>
        {/* <TheComponent />
        <TheComponent2 /> */}
        <div className="flex flex-col space-y-4">
          <MovieResult />
        </div>
      </ClientOnly>
    </div>
  )
}

export default ExperimentPage
