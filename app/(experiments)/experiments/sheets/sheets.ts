import 'server-only'
import { google } from 'googleapis'
import { unstable_cache } from 'next/cache'

const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!
const SHEET_ID = process.env.GOOGLE_SHEET_ID!
const RANGE = 'A1:B' // Assumes keys are in column A and values in column B
const SHEET_NAME = 'Sheet1'
const API_KEY = process.env.GOOGLE_API_KEY!

export interface SheetData {
  [key: string]: string
}

export const getSheetDataWithServiceAccount = unstable_cache(
  async () => {
    try {
      console.log(`Fetching Google Sheet data from ${SHEET_ID}`)
      const auth = new google.auth.JWT({
        email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      })

      const sheets = google.sheets({ version: 'v4', auth })

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: RANGE,
      })

      const sheetData: SheetData = {}
      response.data.values?.forEach((row: string[]) => {
        if (row[0] && row[1]) {
          sheetData[row[0]] = row[1]
        }
      })

      return sheetData
    } catch (error) {
      console.error('Error fetching Google Sheet data:', error)
      throw new Error('Failed to fetch Google Sheet data')
    }
  },
  ['sheets_data'],
  {
    tags: ['sheets_data'],
  }
)

export async function getSheetDataWithAPIKey(): Promise<SheetData> {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A1:B?key=${API_KEY}`,
      {
        next: {
          tags: ['sheets_data'],
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = await response.json()
    const sheetData: SheetData = {}

    data.values?.forEach((row: string[]) => {
      if (row[0] && row[1]) {
        sheetData[row[0]] = row[1]
      }
    })

    // const cellCount = data.values.reduce(
    //   (acc: unknown, row: string | unknown[]) => acc + row.length,
    //   0
    // )

    // // Calculate the total size in bytes
    // const dataSize = JSON.stringify(data.values).length

    // console.log('Data fetched successfully:')
    // console.log(`Number of rows: ${data.values.length}`)
    // console.log(`Number of cells: ${cellCount}`)
    // console.log(`Total data size: ${dataSize} bytes`)
    // console.log(`Total data size: ${(dataSize / 1024).toFixed(2)} KB`)

    return sheetData
  } catch (error) {
    console.error('Error fetching Google Sheet data:', error)
    throw new Error('Failed to fetch Google Sheet data')
  }
}
