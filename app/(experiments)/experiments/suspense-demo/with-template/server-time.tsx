import 'server-only'

export default function ServerTime() {
  return <p>Server time: {new Date().toLocaleTimeString()}</p>
}
