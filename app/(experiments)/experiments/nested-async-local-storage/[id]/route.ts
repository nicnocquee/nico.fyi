import { NextRequest, NextResponse } from 'next/server'
import { auth } from '../auth'
import { userContext } from '../user-context'
import { requestContext } from '../request-context'
import { getData } from './data'
import { runWithMultipleContexts } from '../multiple-async-contexts'

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries())
  const paramsObj = await params
  const user = await auth()
  const requestContextData = {
    searchParams,
    params: paramsObj,
  }
  const userContextData = {
    user,
  }

  const result = await runWithMultipleContexts(
    [
      [userContext, userContextData],
      [requestContext, requestContextData],
    ],
    () => getData()
  )

  return NextResponse.json(result)
}
