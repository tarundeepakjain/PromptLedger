import { NextRequest, NextResponse } from "next/server"
import { reRunEstimate } from "@/lib/re-run"

export async function GET(req:NextRequest,{ params }:{ params:Promise<{ id:string }>}){
  try{
    const { id } = await params
    if(!id){
      return NextResponse.json(
        {
          success:false,
          message:"Audit id is required"
        },
        {
          status:400
        }
      )
    }
    const result = await reRunEstimate(id)
    if(!result){
      return NextResponse.json(
        {
          success:false,
          message:"Failed to rerun audit"
        },
        {
          status:500
        }
      )
    }

    return NextResponse.json(
      {
        success:true,
        oldAudit:result.oldAudit,
        newAudit:result.newAudit
      },
      {
        status:200
      }
    )

  }catch(error){
    console.log(error)
    return NextResponse.json(
      {
        success:false,
        message:"Internal server error"
      },
      {
        status:500
      }
    )
  }
}