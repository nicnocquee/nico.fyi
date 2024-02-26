import TimeComponent from './time'
import TimeComponentWithExternalStore from './time-external-store'

const ExperimentPage = async () => {
  return (
    <div className="flex flex-col space-y-2">
      <TimeComponent />

      <TimeComponentWithExternalStore />
    </div>
  )
}

export default ExperimentPage
