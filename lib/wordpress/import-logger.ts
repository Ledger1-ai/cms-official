/**
 * WordPress Import Logger
 * 
 * Tracks the entire import flow from WordPress to Puck editor.
 * Logs are structured and can be viewed in browser console or server logs.
 */

export interface ImportLogEntry {
    timestamp: string;
    phase: string;
    message: string;
    data?: any;
}

class ImportLogger {
    private logs: ImportLogEntry[] = [];
    private importId: string;
    private enabled: boolean = true;

    constructor() {
        this.importId = `import-${Date.now()}`;
    }

    reset(pageTitle?: string) {
        this.logs = [];
        this.importId = `import-${Date.now()}`;
        this.log('INIT', `Starting import${pageTitle ? `: "${pageTitle}"` : ''}`);
    }

    log(phase: string, message: string, data?: any) {
        if (!this.enabled) return;

        const entry: ImportLogEntry = {
            timestamp: new Date().toISOString(),
            phase,
            message,
            data: data ? this.sanitizeData(data) : undefined
        };

        this.logs.push(entry);

        // Console output with color coding
        const colors: Record<string, string> = {
            'INIT': '\x1b[36m',      // Cyan
            'SOURCE': '\x1b[33m',    // Yellow
            'PARSE': '\x1b[35m',     // Magenta
            'BLOCK': '\x1b[32m',     // Green
            'STYLE': '\x1b[34m',     // Blue
            'FILTER': '\x1b[31m',    // Red
            'WARN': '\x1b[31m',      // Red
            'ERROR': '\x1b[41m',     // Red background
            'SUCCESS': '\x1b[42m',   // Green background
        };

        const color = colors[phase] || '\x1b[0m';
        const reset = '\x1b[0m';

        console.log(`${color}[WP_IMPORT:${phase}]${reset} ${message}`);
        if (data && typeof data === 'object') {
            console.log(`  └─ Data:`, JSON.stringify(data, null, 2).substring(0, 500));
        }
    }

    // Prevent huge data from clogging logs
    private sanitizeData(data: any): any {
        if (typeof data === 'string' && data.length > 500) {
            return `${data.substring(0, 500)}... (${data.length} chars total)`;
        }
        if (Array.isArray(data)) {
            return { type: 'array', length: data.length, sample: data.slice(0, 3) };
        }
        return data;
    }

    // Source tracking
    sourceXmlRpc(success: boolean, chars?: number) {
        if (success) {
            this.log('SOURCE', `✓ XML-RPC: Acquired ${chars} chars of raw content`);
        } else {
            this.log('SOURCE', '✗ XML-RPC: Failed or unavailable');
        }
    }

    sourceRestApi(success: boolean, chars?: number) {
        if (success) {
            this.log('SOURCE', `✓ REST API (context=edit): Acquired ${chars} chars`);
        } else {
            this.log('SOURCE', '✗ REST API: Raw content not available');
        }
    }

    sourceScrape(success: boolean, chars?: number) {
        if (success) {
            this.log('SOURCE', `✓ Scraped HTML: ${chars} chars from live page`);
        } else {
            this.log('SOURCE', '✗ Scrape: Failed');
        }
    }

    sourceDecision(source: 'xml-rpc' | 'rest-api' | 'scrape' | 'api-rendered', hasShortcodes: boolean) {
        this.log('SOURCE', `Decision: Using ${source}. Has Shortcodes: ${hasShortcodes}`);
    }

    // Block creation tracking
    blockCreated(type: string, props: any) {
        this.log('BLOCK', `Created: ${type}`, { id: props.id, backgroundColor: props.backgroundColor });
    }

    // Style filtering
    styleFiltered(property: string, originalValue: string, filteredValue: string | undefined) {
        if (originalValue !== filteredValue) {
            this.log('FILTER', `${property}: "${originalValue}" → ${filteredValue === undefined ? 'BLOCKED' : `"${filteredValue}"`}`);
        }
    }

    // Get summary
    getSummary(): string {
        const blockLogs = this.logs.filter(l => l.phase === 'BLOCK');
        const filterLogs = this.logs.filter(l => l.phase === 'FILTER');
        
        return [
            `\n========== IMPORT SUMMARY ==========`,
            `Import ID: ${this.importId}`,
            `Total Logs: ${this.logs.length}`,
            `Blocks Created: ${blockLogs.length}`,
            `Styles Filtered: ${filterLogs.length}`,
            `=====================================\n`
        ].join('\n');
    }

    // Export all logs
    export(): ImportLogEntry[] {
        return [...this.logs];
    }
}

// Singleton instance
export const importLogger = new ImportLogger();
