import { NextRequest, NextResponse } from 'next/server';
import { generateAgentResponse, createInitialGreeting, ConversationState } from '@/lib/agent';

// In-memory session storage (replace with Redis/DB in production)
const sessions = new Map<string, ConversationState>();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { sessionId, message, action } = body;

        // Validate
        if (!sessionId) {
            return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
        }

        // Handle different actions
        if (action === 'start') {
            // Start new conversation
            const initialState = await createInitialGreeting();
            sessions.set(sessionId, initialState);

            return NextResponse.json({
                message: initialState.messages[0].content,
                phase: initialState.phase,
                sessionId,
            });
        }

        if (action === 'message') {
            if (!message) {
                return NextResponse.json({ error: 'Message required' }, { status: 400 });
            }

            // Get existing session or create new one
            let state = sessions.get(sessionId);
            if (!state) {
                state = await createInitialGreeting();
            }

            // Generate response
            const { response, updatedState } = await generateAgentResponse(state, message);
            sessions.set(sessionId, updatedState);

            return NextResponse.json({
                message: response,
                phase: updatedState.phase,
                userType: updatedState.userType,
                candidateData: updatedState.candidateData,
                sessionId,
            });
        }

        if (action === 'getState') {
            const state = sessions.get(sessionId);
            if (!state) {
                return NextResponse.json({ error: 'Session not found' }, { status: 404 });
            }

            return NextResponse.json({
                phase: state.phase,
                candidateData: state.candidateData,
                messages: state.messages,
            });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const sessionId = request.nextUrl.searchParams.get('sessionId');

    if (!sessionId) {
        return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    const state = sessions.get(sessionId);
    if (!state) {
        return NextResponse.json({ exists: false });
    }

    return NextResponse.json({
        exists: true,
        phase: state.phase,
        messageCount: state.messages.length,
    });
}
