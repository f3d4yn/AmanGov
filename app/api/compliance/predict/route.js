import { NextResponse } from 'next/server';
import data from '../../../../data/compliance.json';

function calculateScore(controls) {
  const totalWeight = controls.reduce((sum, c) => sum + c.weight, 0);
  const conformeWeight = controls
    .filter(c => c.status === 'conforme')
    .reduce((sum, c) => sum + c.weight, 0);
  return Math.round((conformeWeight / totalWeight) * 100);
}

export async function POST() {
  const controls = data.controls;
  const score = calculateScore(controls);
  const nonConformeCount = controls.filter(c => c.status === 'non_conforme').length;
  const nonConformeNames = controls
    .filter(c => c.status === 'non_conforme')
    .map(c => c.name).join(', ');

  const localMessage = score < 50 && nonConformeCount > 5
    ? `Score actuel ${score}/100 avec ${nonConformeCount} contrôles non conformes. Score va chuter de 15 points dans 30 jours.`
    : `Score actuel ${score}/100 avec ${nonConformeCount} contrôles non conformes. Score stable.`;

  try {
    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'qwen3:1.7b',
        think: false,
        prompt: `Score cybersécurité: ${score}/100. Non conformes: ${nonConformeNames}.
Réponds UNIQUEMENT avec ce JSON sur UNE SEULE LIGNE, sans retour à la ligne:
{"prediction":"ta prediction","risque":"HIGH","recommandations":["action 1","action 2","action 3"]}`,
        stream: false,
        options: { temperature: 0.1, num_predict: 1000 },
      }),
    });

    const raw = await response.json();
    const flat = raw.response.replace(/\n/g, ' ');
    const jsonMatch = flat.match(/\{.*\}/);
    if (!jsonMatch) throw new Error('No JSON found');
    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ score, source: 'ollama', ...parsed });

  } catch (err) {
    console.error('>>> OLLAMA FAILED:', err.message);
    return NextResponse.json({
      score,
      source: 'local',
      prediction: localMessage,
      risque: 'HIGH',
      recommandations: [
        'Mettre à jour immédiatement les systèmes non patchés',
        'Activer les sauvegardes automatiques',
        "Renforcer la politique de contrôle d'accès"
      ]
    });
  }
}
