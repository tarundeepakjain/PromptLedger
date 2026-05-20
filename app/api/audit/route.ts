import { NextRequest, NextResponse } from "next/server"
import { generateAudit } from "@/lib/audit-engine"
import { AuditRequestBody } from "@/lib/types"

export async function POST(req: NextRequest){
    try{
        const body : AuditRequestBody = await req.json()

        const auditResult = await generateAudit(body.auditInput,body.email)
        return NextResponse.json(
            {
                success: true,
                data: auditResult
            },
            {
                status: 200
            }
        )
    }catch(error){
        console.error("Audit API Error:", error)
        return NextResponse.json(
            {
                success: false,
                message: "Failed to generate audit"
            },
            {
                status: 500
            }
        )
    }
}