import {
    aiPlans,
    api_direct
} from "./ai-tools"
import{
    aiPlan,
    apiPlan
} from "./types"

export function canHandleUseCase(currentUseCase:string, candidateUseCases:string[]){
    return candidateUseCases.includes(currentUseCase)
}

export function hasEnoughCapability(requiredLevel:number, currentLevel:number){
    return currentLevel>=requiredLevel
}

export function isTeamCompatible(teamSize:number, minTeamSize:number, maxTeamSize:number){
    return minTeamSize<=teamSize && maxTeamSize>=teamSize
}

export function findCurrentPlan(tool:string, plan:string){
    if(tool.includes("API")){
        return api_direct.find((item)=>{
            return (item.tool===tool && item.plan===plan)
        })
    }else{
        return aiPlans.find((item)=>{
            return (item.tool===tool && item.plan===plan)
        })
    }
}

export function findCheapestSameVendorPlan(currentPlan: aiPlan, teamSize:number, useCase:string){
  
    const matchingPlans = aiPlans.filter((candidate)=>{
      if(candidate.tool!==currentPlan.tool){return false}
      if(candidate.plan===currentPlan.plan){return false}
      if(!canHandleUseCase(useCase,candidate.useCases)){return false}
      if(!isTeamCompatible(teamSize,candidate.minTeamSize,candidate.maxTeamSize)){return false}

      if(candidate.monthlyPrice===null){return false}
      if(candidate.monthlyPrice===0){return false}
      if(candidate.monthlyPrice>=(currentPlan.monthlyPrice ?? Infinity)){return false}
      return true
    })

    matchingPlans.sort((a,b)=>{
        return ((a.monthlyPrice ?? Infinity)-(b.monthlyPrice ?? Infinity))
    })

    return matchingPlans[0] || null
}

export function findCheapestAlternativeTool(currentPlan: aiPlan, teamSize:number, useCase:string){

    const matchingPlans = aiPlans.filter((candidate)=>{
      if(candidate.tool===currentPlan.tool){return false}
      if(!canHandleUseCase(useCase,candidate.useCases)){return false}
      if(!isTeamCompatible(teamSize,candidate.minTeamSize,candidate.maxTeamSize)){return false}

      if(candidate.monthlyPrice===null){return false}
      if(candidate.monthlyPrice===0){return false}
      if(candidate.monthlyPrice>=(currentPlan.monthlyPrice ?? Infinity)){return false}
      return true
    })

    matchingPlans.sort((a,b)=>{
        return ((a.monthlyPrice ?? Infinity)-(b.monthlyPrice ?? Infinity))
    })

    return matchingPlans[0] || null
}

export function getTotalAPIPrice(plan: apiPlan){
    return (plan.inputPricePerMTok+plan.outputPricePerMTok)
}

export function findCheapestSameVendorAPI(currentPlan: apiPlan, useCase:string){

    const matchingPlans = api_direct.filter((candidate)=>{
      if(candidate.tool!==currentPlan.tool){return false}
      if(candidate.plan===currentPlan.plan){return false}
      if(!canHandleUseCase(useCase,candidate.useCases)){return false}
      if(!hasEnoughCapability(currentPlan.capabilityLevel,candidate.capabilityLevel)){return false}
      if(getTotalAPIPrice(candidate)>=getTotalAPIPrice(currentPlan)){return false}
      return true
    })

    matchingPlans.sort((a,b)=>{
        return (getTotalAPIPrice(a)-getTotalAPIPrice(b))
    })

    return matchingPlans[0] || null
}

export function findCheapestAlternativeAPI(currentPlan: apiPlan, useCase:string){

    const matchingPlans = api_direct.filter((candidate)=>{
      if(candidate.tool===currentPlan.tool){return false}
      if(!canHandleUseCase(useCase,candidate.useCases)){return false}
      if(!hasEnoughCapability(currentPlan.capabilityLevel,candidate.capabilityLevel)){return false}
      if(getTotalAPIPrice(candidate)>=getTotalAPIPrice(currentPlan)){return false}
      return true
    })

    matchingPlans.sort((a,b)=>{
        return (getTotalAPIPrice(a)-getTotalAPIPrice(b))
    })

    return matchingPlans[0] || null
}