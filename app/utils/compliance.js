import data from '../../data/compliance.json';

// Calculate score automatically from controls
export function calculateScore(controls) {
  const totalWeight = controls.reduce((sum, c) => sum + c.weight, 0);
  const conformeWeight = controls
    .filter(c => c.status === 'conforme')
    .reduce((sum, c) => sum + c.weight, 0);
  return Math.round((conformeWeight / totalWeight) * 100);
}

// Get number of non-conforming controls
export function getNonConformeCount(controls) {
  return controls.filter(c => c.status === 'non_conforme').length;
}

// Prediction algorithm (local, before Ollama)
export function localPrediction(score, controls) {
  const nonConformeCount = getNonConformeCount(controls);
  const criticalNonConforme = controls.filter(
    c => c.status === 'non_conforme' && c.weight === 3
  );

  if (score < 50 && nonConformeCount > 5) {
    return {
      triggered: true,
      message: 'Score va chuter de 15 points dans 30 jours',
      predicted_score: score - 15,
      risk: 'HIGH',
      non_conforme_count: nonConformeCount,
      critical_count: criticalNonConforme.length
    };
  }

  if (criticalNonConforme.length >= 2) {
    return {
      triggered: true,
      message: 'Contrôles critiques non conformes détectés — risque élevé',
      predicted_score: score - 10,
      risk: 'MEDIUM',
      non_conforme_count: nonConformeCount,
      critical_count: criticalNonConforme.length
    };
  }

  return {
    triggered: false,
    message: 'Score stable — continuez les efforts',
    predicted_score: score,
    risk: 'LOW',
    non_conforme_count: nonConformeCount,
    critical_count: criticalNonConforme.length
  };
}

// Get full compliance report
export function getComplianceReport() {
  const controls = data.controls;
  const score = calculateScore(controls);
  const prediction = localPrediction(score, controls);

  return {
    score,
    status: score >= 70 ? 'BON' : score >= 50 ? 'MOYEN' : 'CRITIQUE',
    controls,
    prediction,
    benchmark: data.benchmark,
    history: data.history
  };
}
