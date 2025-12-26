/**
 * CSS Background Extractor
 * 
 * Parses inline CSS from scraped WordPress pages to extract
 * background colors/images for section elements.
 */

export interface ExtractedStyles {
    [selector: string]: {
        background?: string;
        backgroundColor?: string;
        backgroundImage?: string;
    };
}

/**
 * Parse inline CSS and extract background properties for each selector
 */
export function extractBackgroundsFromCSS(cssText: string): ExtractedStyles {
    const styles: ExtractedStyles = {};
    
    if (!cssText) return styles;
    
    // Simple CSS parser - match selector { properties }
    const ruleRegex = /([^{}]+)\{([^{}]+)\}/g;
    let match;
    
    while ((match = ruleRegex.exec(cssText)) !== null) {
        const selector = match[1].trim();
        const properties = match[2];
        
        // Only care about selectors that might be sections
        if (!selector.includes('section') && 
            !selector.includes('.row') && 
            !selector.includes('#section-') &&
            !selector.includes('.has-bg') &&
            !selector.includes('section-bg')) {
            continue;
        }
        
        const bgProps: any = {};
        
        // Extract background properties
        const bgMatch = properties.match(/background\s*:\s*([^;]+)/i);
        if (bgMatch) {
            bgProps.background = bgMatch[1].trim();
        }
        
        const bgColorMatch = properties.match(/background-color\s*:\s*([^;]+)/i);
        if (bgColorMatch) {
            bgProps.backgroundColor = bgColorMatch[1].trim();
        }
        
        const bgImageMatch = properties.match(/background-image\s*:\s*([^;]+)/i);
        if (bgImageMatch) {
            bgProps.backgroundImage = bgImageMatch[1].trim();
        }
        
        if (Object.keys(bgProps).length > 0) {
            styles[selector] = bgProps;
        }
    }
    
    return styles;
}

/**
 * Find background for an element by matching its ID and classes against extracted CSS
 */
export function findBackgroundForElement(
    elementId: string | undefined,
    elementClasses: string | undefined,
    extractedStyles: ExtractedStyles
): string | undefined {
    // Try ID match first
    if (elementId) {
        const idSelector = `#${elementId}`;
        for (const [selector, props] of Object.entries(extractedStyles)) {
            if (selector.includes(idSelector)) {
                return props.background || props.backgroundColor || props.backgroundImage;
            }
        }
    }
    
    // Try class matches
    if (elementClasses) {
        const classes = elementClasses.split(/\s+/);
        for (const cls of classes) {
            if (!cls) continue;
            const classSelector = `.${cls}`;
            for (const [selector, props] of Object.entries(extractedStyles)) {
                if (selector.includes(classSelector)) {
                    const bg = props.background || props.backgroundColor || props.backgroundImage;
                    if (bg) return bg;
                }
            }
        }
    }
    
    return undefined;
}

/**
 * Extract backgrounds from Flatsome's section-bg divs
 * Flatsome often renders backgrounds as a separate child div
 */
export function extractFlatsomeSectionBackgrounds(html: string): Map<string, string> {
    const backgrounds = new Map<string, string>();
    
    // Pattern: <div class="section-bg" style="background-color: #xyz">
    const sectionBgRegex = /<div[^>]*class="[^"]*section-bg[^"]*"[^>]*style="([^"]*)"/gi;
    let match;
    
    while ((match = sectionBgRegex.exec(html)) !== null) {
        const styleStr = match[1];
        
        // Extract the background color
        const bgMatch = styleStr.match(/background(?:-color)?\s*:\s*([^;]+)/i);
        if (bgMatch) {
            // Find parent section ID
            const beforeSection = html.substring(0, match.index);
            const sectionIdMatch = beforeSection.match(/<[^>]*(?:class|id)="[^"]*section[^"]*"[^>]*>/gi);
            
            if (sectionIdMatch && sectionIdMatch.length > 0) {
                const lastSection = sectionIdMatch[sectionIdMatch.length - 1];
                const idMatch = lastSection.match(/id="([^"]*)"/);
                if (idMatch) {
                    backgrounds.set(idMatch[1], bgMatch[1].trim());
                }
            } else {
                // Use index as key
                backgrounds.set(`section-${match.index}`, bgMatch[1].trim());
            }
        }
    }
    
    // Also check for inline styles on section divs directly
    const sectionStyleRegex = /<div[^>]*class="[^"]*section[^"]*"[^>]*style="([^"]*)"/gi;
    while ((match = sectionStyleRegex.exec(html)) !== null) {
        const styleStr = match[1];
        const bgMatch = styleStr.match(/background(?:-color)?\s*:\s*([^;]+)/i);
        if (bgMatch) {
            const idMatch = match[0].match(/id="([^"]*)"/);
            const key = idMatch ? idMatch[1] : `section-inline-${match.index}`;
            backgrounds.set(key, bgMatch[1].trim());
        }
    }
    
    console.log(`[CSS_EXTRACT] Found ${backgrounds.size} section backgrounds`);
    return backgrounds;
}
