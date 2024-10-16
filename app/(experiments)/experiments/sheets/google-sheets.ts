import { google } from 'googleapis'

export interface SheetData {
  [key: string]: string
}

export const getPrivateGoogleSheetsData = async ({
  serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
  privateKey = process.env.GOOGLE_PRIVATE_KEY || '',
  sheetId = process.env.GOOGLE_SHEETS_ID || '',
  range = process.env.GOOGLE_SHEETS_RANGE || 'A1:B',
} = {}) => {
  try {
    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
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
}

export const getPublicGoogleSheetsData = async ({
  sheetId = process.env.GOOGLE_SHEET_ID || '',
  sheetName = process.env.GOOGLE_SHEET_NAME || '',
  apiKey = process.env.GOOGLE_API_KEY || '',
  version = process.env.GOOGLE_API_VERSION || 'v4',
  nextFetchOptions = {
    next: {
      tags: ['sheets_data'],
    },
  },
} = {}): Promise<SheetData> => {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/${version}/spreadsheets/${sheetId}/values/${sheetName}!A1:B?key=${apiKey}`,
      nextFetchOptions
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

    return sheetData
  } catch (error) {
    console.error('Error fetching Google Sheet data:', error)
    throw new Error('Failed to fetch Google Sheet data')
  }
}
