export async function POST(request: Request) {
  try {
    const { vulnerabilities } = await request.json();

    const prompt = `Analyse ces vulnérabilités et propose un plan de correction priorisé.
Réponds UNIQUEMENT en JSON avec ce format exact :

{
  "analyse": "Résumé général...",
  "priorites": [
    { "niveau": "Critique", "actions": ["Action 1", "Action 2"] }
  ],
  "recommandations_globales": ["Recommandation 1"]
}

Vulnérabilités :
${JSON.stringify(vulnerabilities, null, 2)}`;

    const ollamaRes = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: "qwen3:1.7b ",   // Change si tu utilises un autre model
        prompt: prompt,
        stream: false,
        temperature: 0.7
      })
    });

    const data = await ollamaRes.json();

    let analyseIA;
    try {
      const jsonMatch = data.response.match(/\{[\s\S]*\}/);
      analyseIA = jsonMatch ? JSON.parse(jsonMatch[0]) : { analyse: data.response };
    } catch {
      analyseIA = { analyse: data.response, priorites: [], recommandations_globales: [] };
    }

    return Response.json({ success: true, analyseIA });

  } catch (error) {
    console.error(error);
    return Response.json({ 
      success: false, 
      error: "Erreur lors de l'analyse avec Ollama" 
    }, { status: 500 });
  }
}
