import vulnerabilitiesData from '@/data/vulnerabilities.json';

export async function GET() {
  return Response.json({
    success: true,
    vulnerabilities: vulnerabilitiesData.vulnerabilities,
    total: vulnerabilitiesData.vulnerabilities.length,
    timestamp: new Date().toISOString()
  });
}
