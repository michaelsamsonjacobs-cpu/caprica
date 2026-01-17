import { NextRequest, NextResponse } from 'next/server';
import { parseResumeWithAI } from '@/lib/resume-parser';

// Note: In production, use a proper file storage solution
// For now, we'll parse the text content directly

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('resume') as File | null;
        const textContent = formData.get('textContent') as string | null;

        let resumeText = '';

        if (textContent) {
            // Direct text content provided
            resumeText = textContent;
        } else if (file) {
            // Handle file upload
            const fileType = file.type;
            const buffer = Buffer.from(await file.arrayBuffer());

            if (fileType === 'application/pdf') {
                // Dynamic import for pdf-parse (only on server)
                const pdfParse = (await import('pdf-parse')).default;
                const pdfData = await pdfParse(buffer);
                resumeText = pdfData.text;
            } else if (
                fileType === 'application/msword' ||
                fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ) {
                // For DOCX, use mammoth
                const mammoth = (await import('mammoth')).default;
                const result = await mammoth.extractRawText({ buffer });
                resumeText = result.value;
            } else if (fileType === 'text/plain') {
                resumeText = buffer.toString('utf-8');
            } else {
                return NextResponse.json(
                    { error: 'Unsupported file type. Please upload PDF, DOCX, or TXT.' },
                    { status: 400 }
                );
            }
        } else {
            return NextResponse.json(
                { error: 'No resume file or text content provided' },
                { status: 400 }
            );
        }

        if (!resumeText || resumeText.trim().length < 50) {
            return NextResponse.json(
                { error: 'Could not extract text from resume. Please try a different file.' },
                { status: 400 }
            );
        }

        // Parse with AI
        const parsed = await parseResumeWithAI(resumeText);

        return NextResponse.json({
            success: true,
            data: parsed,
            textLength: resumeText.length,
        });

    } catch (error) {
        console.error('Resume parse error:', error);
        return NextResponse.json(
            { error: 'Failed to parse resume' },
            { status: 500 }
        );
    }
}
