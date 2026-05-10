import { NextResponse } from 'next/server';
import data from '../../../../data/compliance.json';

function calculateScore(controls) {
  const totalWeight = controls.reduce((sum, c) => sum + c.weight, 0);
  const conformeWeight = controls
    .filter(c => c.status === 'conforme')
    .reduce((sum, c) => sum + c.weight, 0);
  return Math.round((conformeWeight / totalWeight) * 100);
}

export async function GET() {
  const controls = data.controls;
  const score = calculateScore(controls);
  const nonConformeCount = controls.filter(c => c.status === 'non_conforme').length;

  return NextResponse.json({
    score,
    status: score >= 70 ? 'BON' : score >= 50 ? 'MOYEN' : 'CRITIQUE',
    non_conforme_count: nonConformeCount,
    total_controls: controls.length
  });
}
