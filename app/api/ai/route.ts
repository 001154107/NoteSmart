import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image, selection } = body;

    // Mock response for now
    // In a real implementation, this would call Vertex AI
    console.log("Received AI request", { selection });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({
      classification: "math",
      latex_content: "E = mc^2",
      feedback: "The derivation looks correct.",
      confidence_score: 0.98
    });
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
