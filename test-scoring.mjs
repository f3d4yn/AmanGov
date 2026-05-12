import { readFileSync } from 'fs';

const data = JSON.parse(readFileSync('./data/compliance.json', 'utf8'));
const controls = data.controls;

// Calculate score
const totalWeight = controls.reduce((sum, c) => sum + c.weight, 0);
const conformeWeight = controls
  .filter(c => c.status === 'conforme')
  .reduce((sum, c) => sum + c.weight, 0);
const score = Math.round((conformeWeight / totalWeight) * 100);

// Count non-conformes
const nonConformeCount = controls.filter(c => c.status === 'non_conforme').length;

console.log('=== COMPLIANCE SCORING TEST ===');
console.log(`Total weight: ${totalWeight}`);
console.log(`Conforme weight: ${conformeWeight}`);
console.log(`Score: ${score}/100`);
console.log(`Non-conformes: ${nonConformeCount}/12`);
console.log('');

// Prediction
if (score < 50 && nonConformeCount > 5) {
  console.log('⚠️  PREDICTION: Score va chuter de 15 points dans 30 jours');
} else {
  console.log('✅ Score stable');
}
