import { describe, it, expect } from 'vitest';
import { cn, generateRandomPassword } from './utils';

describe('lib/utils', () => {
    describe('cn()', () => {
        it('merges tailwind classes correctly', () => {
            const result = cn('text-red-500', 'text-blue-500');
            expect(result).toBe('text-blue-500');
        });

        it('handles conditional classes', () => {
            const condition = undefined as boolean | undefined;
            const result = cn('text-red-500', condition && 'text-blue-500', 'bg-white');
            expect(result).toBe('text-red-500 bg-white');
        });
    });

    describe('generateRandomPassword()', () => {
        it('generates a password of correct length', () => {
            const pwd = generateRandomPassword();
            expect(pwd).toHaveLength(10);
        });

        it('contains mixed characters', () => {
            const pwd = generateRandomPassword();
            expect(pwd).toMatch(/[A-Z]/); // Uppercase
            expect(pwd).toMatch(/[0-9]/); // Number
            expect(pwd).toMatch(/[!@#$%^&*()_+\-={}[\];',./<>?~`|:"\\]/); // Special char
        });
    });
});
