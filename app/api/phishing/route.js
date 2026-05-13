import { NextResponse } from 'next/server';
import templates from './templates.json';

export async function GET() {
  return NextResponse.json({ templates });
}
