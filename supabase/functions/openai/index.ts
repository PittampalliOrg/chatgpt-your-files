import OpenAI from "openai";

const client = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

const chatCompletion = await client.chat.completions.create({
  messages: [{ role: "user", content: "tell me a joke about dinosaurs" }],
  model: "gpt-4-1106-preview",
});

console.log(chatCompletion);