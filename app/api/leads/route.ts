import { NextRequest, NextResponse } from "next/server"
import { saveLead } from "@/lib/leads"
import { sendAuditEmail } from "@/lib/email"

export async function POST(req: NextRequest) {

  try {
    const body = await req.json()
    const savedLead = await saveLead(body)
    await sendAuditEmail(body)

    return NextResponse.json(
      {
        success: true,
        data: savedLead
      },
      {
        status: 200
      }
    )

  } catch (error) {
    console.error("Lead Capture Error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save lead"
      },
      {
        status: 500
      }
    )
  }
}