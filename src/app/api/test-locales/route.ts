
import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function GET() {
    const cwd = process.cwd();
    const ruPath = join(cwd, 'messages', 'ru.json');
    const exists = existsSync(ruPath);

    let content = null;
    let error = null;

    if (exists) {
        try {
            content = JSON.parse(readFileSync(ruPath, 'utf8'));
        } catch (e) {
            error = e.message;
        }
    }

    return NextResponse.json({
        cwd,
        ruPath,
        exists,
        content,
        error
    });
}
