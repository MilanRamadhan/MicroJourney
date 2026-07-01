import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import LkpdSubmission from '@/lib/models/LkpdSubmission';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const submission = await LkpdSubmission.create({
      studentName:        body.studentName || 'Anonim',
      studentClass:       body.studentClass || '-',
      sessionId:          body.sessionId || `manual-${Date.now()}`,
      lkpd1:              body.lkpd1 || '',
      lkpd2:              body.lkpd2 || '',
      lkpd3q1:            body.lkpd3q1 || '',
      lkpd3q2:            body.lkpd3q2 || '',
      lkpd4:              body.lkpd4 || '',
      commitment:         body.commitment || '',
      totalParticles:     body.totalParticles || 0,
      mostDangerousOrgan: body.mostDangerousOrgan || '',
      selectedFoods:      body.selectedFoods || [],
      studentAccountEmail:body.studentAccountEmail || '',
      assessmentEligible: Boolean(body.assessmentEligible),
    });

    return NextResponse.json({ ok: true, id: submission._id }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/lkpd]', err);
    return NextResponse.json({ ok: false, error: 'Gagal menyimpan data' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const data = await LkpdSubmission.find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error('[GET /api/lkpd]', err);
    return NextResponse.json({ ok: false, error: 'Gagal mengambil data' }, { status: 500 });
  }
}
