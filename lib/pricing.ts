//For Direct APIs : Unit = $/MTok
//For Tools : Unit = $/user/month

export const pricingData = {
  Cursor: {
    Hobby: 0,
    Pro: 20,
    Business: 40,
    Enterprise: null,
  },

  GitHubCopilot: {
    Individual: 10,
    Business: 19,
    Enterprise: 39,
  },

  Claude: {
    Free: 0,
    Pro: 20,
    Max_5x: 100,
    Max_20x: 200,
    Team: 25,
    Enterprise: null,
  },

  ChatGPT: {
    Plus: 20,
    Team: 25,
    Enterprise: null,
  },

  AnthropicAPI: {
    Haiku4_5: {
      input: 1.0,
      output: 5.0,
    },

    Sonnet4_6: {
      input: 3.0,
      output: 15.0,
    },

    Opus4_7: {
      input: 5.0,
      output: 25.0,
    },
  },

  OpenAIAPI: {
    GPT5_4Mini: {
      input: 0.75,
      output: 4.5,
    },

    GPT5_4: {
      input: 2.5,
      output: 15.0,
    },

    GPT5_5: {
      input: 5.0,
      output: 30.0,
    },
  },

  Gemini: {
    Pro: 19.99,
    Ultra: 83.33,
  },

  GeminiAPI: {
    FlashLite25: {
      input: 0.1,
      output: 0.4,
    },

    Flash25: {
      input: 0.3,
      output: 2.5,
    },

    Pro25: {
      input: 1.25,
      output: 10.0,
    },
  },

  Windsurf: {
    Free: 0,
    Pro: 20,
    Teams: 40,
    Enterprise: null,
  },
}