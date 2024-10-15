'use server'

import { revalidateTag } from 'next/cache'

export const revalidateSheets = async () => {
  revalidateTag('sheets_data')
  return { result: 'success' }
}
