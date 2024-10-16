import 'server-only'
import { unstable_cache } from 'next/cache'
import {
  getPrivateGoogleSheetsData as getPrivateData,
  getPublicGoogleSheetsData,
} from './google-sheets'

export interface SheetData {
  [key: string]: string
}

export const getPrivateGoogleSheetsData = unstable_cache(getPrivateData, ['sheets_data'], {
  tags: ['sheets_data'],
})

export { getPublicGoogleSheetsData }
