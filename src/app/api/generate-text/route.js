import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(req) {
  const { description } = await req.json();

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate a funny meme caption for an image: ${description}`,
      max_tokens: 50,
    });

    const text = response.data.choices[0].text.trim();
    return new Response(JSON.stringify({ text }), { status: 200 });
  } catch (error) {
    console.error("Error generating text:", error);
    return new Response("Error generating text", { status: 500 });
  }
}
