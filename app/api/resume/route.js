import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
    const body = await req.json();
    const { name, experience, skills } = body;
    
    const prompt = `
    You are a professional HR resume expert.

    Generate a concise, powerful resume summary.
    Rules:
    - 3 to 4 lines only
    - Professional tone
    - No emojis
    - No headings
    - No bullet points

    Candidate details:
    Name: ${name}
    Experience: ${experience}
    Skills: ${skills}
    `;

    if (!name || !experience || !skills) {
        return Response.json(
            { error: "All fields are required" },
            { status: 400 }
        );
    }


    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
            { role: "user", content: prompt }
        ],
    });
    return Response.json({
        summary: response.choices[0].message.content,
    });
}