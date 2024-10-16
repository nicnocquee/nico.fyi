import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
export async function GET() {
  revalidateTag('sheets_data')
  return NextResponse.json({ result: 'success' })
}
