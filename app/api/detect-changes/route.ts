import { NextResponse } from "next/server"
import { detectPricingChanges } from "@/lib/pricing-monitor"

export async function GET(){
    try{
        const affectedAudits = await detectPricingChanges()
        const audits = affectedAudits ?? []
        return NextResponse.json(
            {
                success:true,
                count:audits.length,
                data:audits
            },
            {
                status:200
            }
        )

    }catch(error){
        console.error(
            "Detect Changes API Error:",
            error
        )
        return NextResponse.json(
            {
                success:false,
                message:"Failed to detect pricing changes"
            },
            {
                status:500
            }
        )
    }
}