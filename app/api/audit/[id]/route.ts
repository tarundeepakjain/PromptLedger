import { NextRequest, NextResponse } from "next/server"
import { getAuditResult } from "@/lib/audits"

export async function GET(req: NextRequest,{ params }: { params: Promise<{ id: string }> }){

  try {
    const { id } = await params
    const result = await getAuditResult(id)
    return NextResponse.json(
      {
        success: true,
        data: result
      },
      {
        status: 200
      }
    )
  } catch (error) {
    console.error("Fetch Audit Error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch audit"
      },
      {
        status: 500
      }
    )
  }
}