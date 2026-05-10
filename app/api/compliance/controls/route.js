import { NextResponse } from 'next/server';
import data from '../../../../data/compliance.json';

export async function GET() {
  return NextResponse.json({
    controls: data.controls,
    total: data.controls.length
  });
}
