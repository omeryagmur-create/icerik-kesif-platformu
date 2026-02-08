import { getRequestConfig } from 'next-intl/server';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

// Request configuration for next-intl
export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    const locales = ['tr', 'en', 'ru', 'de'];
    if (!locale || !locales.includes(locale)) {
        locale = 'tr';
    }

    // Attempt to read from disk to avoid webpack HMR issues with new files
    try {
        const filePath = join(process.cwd(), 'messages', `${locale}.json`);
        if (existsSync(filePath)) {
            const fileContent = readFileSync(filePath, 'utf8');
            return {
                locale,
                messages: JSON.parse(fileContent)
            };
        }
    } catch (error) {
        console.error(`Error reading message file for ${locale}:`, error);
    }

    // Fallback to import (should work for en/tr)
    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
    };
});
