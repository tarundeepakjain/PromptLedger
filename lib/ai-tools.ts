import {
  aiPlan,
  apiPlan
} from "./types"

export const aiPlans:aiPlan[] = [
    //Cursor
  {
    tool: "Cursor",
    plan: "Hobby",
    useCases: ["coding"],
    capabilityLevel: 1,
    minTeamSize: 1,
    maxTeamSize: 1,
    monthlyPrice: 0,
    
  },

  {
    tool: "Cursor",
    plan: "Pro",
    useCases: ["coding"],
    capabilityLevel: 3,
    minTeamSize: 1,
    maxTeamSize: 5,
    monthlyPrice: 20,
    
  },

  {
    tool: "Cursor",
    plan: "Business",
    useCases: ["coding"],
    capabilityLevel: 4,
    minTeamSize: 3,
    maxTeamSize: 25,
    monthlyPrice: 5,
    
  },

  {
    tool: "Cursor",
    plan: "Enterprise",
    useCases: ["coding"],
    capabilityLevel: 4,
    minTeamSize: 25,
    maxTeamSize: Infinity,
    monthlyPrice: null,
    
  },

    //GitHub Copilot
  {
    tool: "GitHubCopilot",
    plan: "Individual",
    useCases: ["coding"],
    capabilityLevel: 2,
    minTeamSize: 1,
    maxTeamSize: 3,
    monthlyPrice: 10,
    
  },

  {
    tool: "GitHubCopilot",
    plan: "Business",
    useCases: ["coding"],
    capabilityLevel: 3,
    minTeamSize: 3,
    maxTeamSize: 25,
    monthlyPrice: 19,
    
  },

  {
    tool: "GitHubCopilot",
    plan: "Enterprise",
    useCases: ["coding"],
    capabilityLevel: 4,
    minTeamSize: 25,
    maxTeamSize: Infinity,
    monthlyPrice: 39,
    
  },

    //Claude
  {
    tool: "Claude",
    plan: "Free", //
    useCases: ["writing", "research"],
    capabilityLevel: 1,
    minTeamSize: 1,
    maxTeamSize: 1,
    monthlyPrice: 0,
    
  },

  {
    tool: "Claude",
    plan: "Pro",
    useCases: ["writing", "research", "mixed"],
    capabilityLevel: 2,
    minTeamSize: 1,
    maxTeamSize: 3,
    monthlyPrice: 20,
    
  },

  {
    tool: "Claude",
    plan: "Max_5x",
    useCases: ["writing", "research", "mixed"],
    capabilityLevel: 3,
    minTeamSize: 1,
    maxTeamSize: 5,
    monthlyPrice: 100,
    
  },

  {
    tool: "Claude",
    plan: "Max_20x",
    useCases: ["writing", "research", "mixed"],
    capabilityLevel: 3,
    minTeamSize: 1,
    maxTeamSize: 10,
    monthlyPrice: 200,
    
  },

  {
    tool: "Claude",
    plan: "Team",
    useCases: ["writing", "research", "mixed"],
    capabilityLevel: 3,
    minTeamSize: 3,
    maxTeamSize: 25,
    monthlyPrice: 25,
    
  },

  {
    tool: "Claude",
    plan: "Enterprise",
    useCases: ["writing", "research", "mixed"],
    capabilityLevel: 4,
    minTeamSize: 25,
    maxTeamSize: Infinity,
    monthlyPrice: null,
    
  },

    //ChatGPT
  {
    tool: "ChatGPT",
    plan: "Plus",
    useCases: ["writing", "research", "mixed"],
    capabilityLevel: 2,
    minTeamSize: 1,
    maxTeamSize: 3,
    monthlyPrice: 20,
    
  },

  {
    tool: "ChatGPT",
    plan: "Team",
    useCases: ["writing", "research", "mixed"],
    capabilityLevel: 3,
    minTeamSize: 3,
    maxTeamSize: 25,
    monthlyPrice: 25,
    
  },

  {
    tool: "ChatGPT",
    plan: "Enterprise",
    useCases: ["writing", "research", "mixed"],
    capabilityLevel: 4,
    minTeamSize: 25,
    maxTeamSize: Infinity,
    monthlyPrice: null,
    
  },

    //Gemini
  {
    tool: "Gemini",
    plan: "Pro",
    useCases: ["research", "data", "mixed"],
    capabilityLevel: 2,
    minTeamSize: 1,
    maxTeamSize: 5,
    monthlyPrice: 19.99,
    
  },

  {
    tool: "Gemini",
    plan: "Ultra",
    useCases: ["research", "data", "mixed"],
    capabilityLevel: 3,
    minTeamSize: 1,
    maxTeamSize: 10,
    monthlyPrice: 83.33,
    
  },

  
    //Windsurf
  {
    tool: "Windsurf",
    plan: "Free",
    useCases: ["coding"],
    capabilityLevel: 1,
    minTeamSize: 1,
    maxTeamSize: 1,
    monthlyPrice: 0,
    
  },

  {
    tool: "Windsurf",
    plan: "Pro",
    useCases: ["coding"],
    capabilityLevel: 2,
    minTeamSize: 1,
    maxTeamSize: 5,
    monthlyPrice: 20,
    
  },

  {
    tool: "Windsurf",
    plan: "Teams",
    useCases: ["coding"],
    capabilityLevel: 4,
    minTeamSize: 3,
    maxTeamSize: 25,
    monthlyPrice: 40,
    
  },

]

export const api_direct:apiPlan[] = [
  //Anthropic API
  {
    tool: "AnthropicAPI",
    plan: "Haiku4_5",
    useCases: ["coding"],
    capabilityLevel: 2,
    inputPricePerMTok: 1.0,
    outputPricePerMTok: 5.0,
    enterpriseReady: false
  },
  {
    tool: "AnthropicAPI",
    plan: "Sonnet4_6",
    useCases: ["coding","research","mixed"],
    capabilityLevel: 3,
    inputPricePerMTok: 3.0,
    outputPricePerMTok: 15.0,
    enterpriseReady: true
  },
  {
    tool: "AnthropicAPI",
    plan: "Opus4_7",
    useCases: ["coding","research","data","mixed"],
    capabilityLevel: 4,
    inputPricePerMTok: 5.0,
    outputPricePerMTok: 25.0,
    enterpriseReady: true
  },

  //OpenAI API
  {
    tool: "OpenAIAPI",
    plan: "GPT5_4Mini",
    useCases: ["coding","data","mixed"],
    capabilityLevel: 2,
    inputPricePerMTok: 0.75,
    outputPricePerMTok: 4.5,
    enterpriseReady: false
  },
  {
    tool: "OpenAIAPI",
    plan: "GPT5_4",
    useCases: ["coding","research","data","mixed"],
    capabilityLevel: 3,
    inputPricePerMTok: 2.5,
    outputPricePerMTok: 15.0,
    enterpriseReady: true
  },
  {
    tool: "OpenAIAPI",
    plan: "GPT5_5",
    useCases: ["coding","research","data","mixed"],
    capabilityLevel: 4,
    inputPricePerMTok: 5.0,
    outputPricePerMTok: 30.0,
    enterpriseReady: true
  },

  //Gemini API
  {
    tool: "GeminiAPI",
    plan: "FlashLite25",
    useCases: ["data"],
    capabilityLevel: 1,
    inputPricePerMTok: 0.1,
    outputPricePerMTok: 0.4,
    enterpriseReady: false
  },
  {
    tool: "GeminiAPI",
    plan: "Flash25",
    useCases: ["data","mixed"],
    capabilityLevel: 2,
    inputPricePerMTok: 0.3,
    outputPricePerMTok: 2.5,
    enterpriseReady: true
  },
  {
    tool: "GeminiAPI",
    plan: "Pro25",
    useCases: ["research","data","mixed"],
    capabilityLevel: 3,
    inputPricePerMTok: 1.25,
    outputPricePerMTok: 10.0,
    enterpriseReady: true
  }
]