import ClientOnly from './client-only'
import TimeComponent from './time'
import TimeComponentWithExternalStore from './time-external-store'

const ExperimentPage = async () => {
  return (
    <div className="flex flex-col space-y-2">
      <TimeComponent />

      <TimeComponentWithExternalStore />

      <ClientOnly>
        <p>{new Date().toISOString()}</p>
      </ClientOnly>
    </div>
  )
}

export default ExperimentPage
