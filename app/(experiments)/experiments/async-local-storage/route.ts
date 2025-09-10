import { auth } from './auth'
import { getProfile } from './get-profile'
import { userContext } from './user-context'

export const GET = async () => {
  const loggedInUser = await auth()

  const data = await userContext.run({ user: loggedInUser }, () => {
    return getProfile()
  })

  return Response.json(data)
}
