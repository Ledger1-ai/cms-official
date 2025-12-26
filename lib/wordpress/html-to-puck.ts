/**
 * HTML to Puck Converter
 * Parsing logic updated to support full background extraction (gradients/images)
 * and correct mapping to Puck components.
 * 
 * FIX: Now supports multiline style attributes via [\s\S]*? regex.
 */

import { flatsomeToPuck } from "./flatsome-to-puck";
import { Data } from "@measured/puck";

interface PuckBlock {
    type: string;
    props: Record<string, any>;
}

/**
 * Generate unique ID for blocks
 */
function generateId(): string {
    return `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Extract style value from style string
 */
function getStyleValue(styleString: string, property: string): string | undefined {
    if (!styleString) return undefined;
    const regex = new RegExp(`${property}\\s*:\\s*([^;]+)`, 'i');
    const match = styleString.match(regex);
    return match ? match[1].trim() : undefined;
}

/**
 * Helper to extract full BACKGROUND (shorthand or components)
 */
function getBackground(styleString: string): string | undefined {
    if (!styleString) return undefined;

    // 1. Try 'background' shorthand
    let bg = getStyleValue(styleString, 'background');
    if (bg) {
        bg = stripUnwantedColors(bg);
        return bg || undefined;
    }

    // 2. Try 'background-image' (for gradients/images)
    const bgImage = getStyleValue(styleString, 'background-image');
    if (bgImage) return bgImage;

    // 3. Try 'background-color'
    let bgColor = getStyleValue(styleString, 'background-color');
    if (bgColor) {
        bgColor = stripUnwantedColors(bgColor);
        return bgColor || undefined;
    }

    return undefined;
}

/**
 * Filter out unwanted colors (teal, cyan, certain greens) that clash with the CMS theme.
 * Returns undefined if the color is unwanted, otherwise returns the original.
 */
function stripUnwantedColors(color: string): string | undefined {
    if (!color) return undefined;

    const c = color.toLowerCase().trim();

    // Skip if it's a gradient or image - we want to keep those
    if (c.includes('gradient') || c.includes('url(')) return color;

    // Block named teal/cyan colors
    const blockedNames = ['teal', 'cyan', 'turquoise', 'aqua', 'darkturquoise', 'mediumturquoise', 'lightseagreen', 'darkcyan'];
    if (blockedNames.some(name => c === name)) {
        console.log(`[HTML_TO_PUCK] Stripped blocked color: ${color}`);
        return undefined;
    }

    // Parse and check hex colors for teal range
    const hexMatch = c.match(/^#([0-9a-f]{3,6})$/);
    if (hexMatch) {
        const hex = hexMatch[1];
        let r, g, b;
        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16);
            g = parseInt(hex[1] + hex[1], 16);
            b = parseInt(hex[2] + hex[2], 16);
        } else {
            r = parseInt(hex.slice(0, 2), 16);
            g = parseInt(hex.slice(2, 4), 16);
            b = parseInt(hex.slice(4, 6), 16);
        }
        if (isTealish(r, g, b)) {
            console.log(`[HTML_TO_PUCK] Stripped teal-ish hex color: ${color} (rgb: ${r},${g},${b})`);
            return undefined;
        }
    }

    // Parse and check rgb/rgba colors
    const rgbMatch = c.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (rgbMatch) {
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        if (isTealish(r, g, b)) {
            console.log(`[HTML_TO_PUCK] Stripped teal-ish rgb color: ${color}`);
            return undefined;
        }
    }

    return color;
}

/**
 * Check if RGB values fall in the teal/cyan/turquoise range.
 * Teal typically has: low R, high G, high B (or G ≈ B)
 */
function isTealish(r: number, g: number, b: number): boolean {
    // Teal range: R < 100, G > 120, B > 120, and G close to B
    if (r < 100 && g > 120 && b > 120) {
        const gbDiff = Math.abs(g - b);
        if (gbDiff < 80) return true; // G and B are similar = teal/cyan
    }
    // Also catch darker teals
    if (r < 50 && g > 80 && b > 80 && g > r * 2 && b > r * 2) {
        return true;
    }
    return false;
}

/**
 * Helper to map CSS color to Puck textColor preset
 */
function mapColor(styleString: string, attributes?: string): string | undefined {
    const color = getStyleValue(styleString, 'color');
    if (!color) {
        // Fallback: check classes
        if (attributes) {
            if (attributes.includes('text-white') || attributes.includes('color-white')) return 'white';
            if (attributes.includes('text-black')) return 'black';
        }
        return undefined;
    }

    const c = color.toLowerCase();
    if (c === 'white' || c === '#fff' || c === '#ffffff') return 'white';
    if (c === 'black' || c === '#000' || c === '#000000') return 'black';
    if (c.includes('blue') || c === 'primary') return 'primary';

    return undefined;
}

/**
 * Helper to map Border styles
 */
function mapBorder(styleString: string): { borderWidth?: string, borderColor?: string } {
    const border = getStyleValue(styleString, 'border');
    const borderLeft = getStyleValue(styleString, 'border-left');

    // Strict border check: ignore 'none', '0', '0px'
    const hasBorder = (border && border !== 'none' && !border.includes('0px') && border !== '0') ||
        (borderLeft && borderLeft !== 'none' && !borderLeft.includes('0px') && borderLeft !== '0');

    if (!hasBorder) return {};

    // Check for border width
    let mappedWidth = '1';
    const borderCheck = (border || borderLeft || '').toLowerCase();

    if (borderCheck.includes('2px') || borderCheck.includes('medium')) mappedWidth = '2';
    else if (borderCheck.includes('thick') || borderCheck.includes('3px') || borderCheck.includes('4px')) mappedWidth = '4';

    // Check for border color
    let encodedColor = undefined;
    if (borderCheck.includes('#fff') || borderCheck.includes('white')) encodedColor = 'white';
    else if (borderCheck.includes('#000') || borderCheck.includes('black')) encodedColor = 'black';
    else if (borderCheck.includes('#ddd') || borderCheck.includes('gray')) encodedColor = 'slate-200';

    if (!encodedColor) {
        const explicitColor = getStyleValue(styleString, 'border-color');
        if (explicitColor) {
            if (explicitColor.includes('#fff') || explicitColor.includes('white')) encodedColor = 'white';
            else if (explicitColor.includes('#000') || explicitColor.includes('black')) encodedColor = 'black';
        }
    }

    return {
        borderWidth: mappedWidth,
        borderColor: encodedColor
    };
}

/**
 * Fix relative URLs
 */
function fixUrls(html: string, baseUrl: string): string {
    if (!baseUrl) return html;

    return html
        .replace(/src=["']\/([^"']+)["']/gi, `src="${baseUrl}/$1"`)
        .replace(/src=["'](?!https?:\/\/)(?!data:)([^"']+)["']/gi, `src="${baseUrl}/$1"`)
        .replace(/url\(['"]?\/([^'")\s]+)['"]?\)/gi, `url('${baseUrl}/$1')`)
        .replace(/href=["']\/([^"']+)["']/gi, `href="${baseUrl}/$1"`);
}

/**
 * Unwrap outer containers
 */
function unwrapContainers(html: string): string {
    let current = html.trim();
    let changed = true;

    const containerPatterns = [
        /^<main[^>]*>([\s\S]*)<\/main>$/i,
        /^<div[^>]*(?:id|class)=["'][^"']*(?:wrapper|main-content|page-content|site-content|content-area|post-content)[^"']*["'][^>]*>([\s\S]*)<\/div>$/i,
        /^<article[^>]*>([\s\S]*)<\/article>$/i,
        /^<div[^>]*class=["']container[^"']*["'][^>]*>([\s\S]*)<\/div>$/i
    ];

    while (changed) {
        changed = false;
        for (const pattern of containerPatterns) {
            const match = current.match(pattern);
            if (match) {
                const tag = match[0].split('>')[0];
                if (tag.includes('style=') && (tag.includes('border') || tag.includes('background'))) {
                    break;
                }
                current = match[1].trim();
                changed = true;
                break;
            }
        }
    }

    return current;
}

/**
 * Strip teal/cyan background colors from inline styles in HTML
 */
function sanitizeTealFromHtml(html: string): string {
    // Remove teal-ish background colors from style attributes
    // Pattern: background(-color)?: followed by teal hex codes or named colors

    // Named colors
    let result = html.replace(/background(-color)?\s*:\s*(teal|cyan|aqua|turquoise|darkturquoise|mediumturquoise|lightseagreen|darkcyan)\s*;?/gi, '');

    // Teal hex codes (common ones)
    result = result.replace(/background(-color)?\s*:\s*#(?:0d9488|14b8a6|2dd4bf|5eead4|99f6e4|ccfbf1|115e59|134e4a|042f2e)\s*;?/gi, '');

    // RGB teal-ish colors - this regex matches rgb(0-100, 120-255, 120-255) range roughly
    result = result.replace(/background(-color)?\s*:\s*rgba?\s*\(\s*[0-9]{1,2}\s*,\s*1[2-9][0-9]\s*,\s*1[2-9][0-9][^)]*\)\s*;?/gi, '');

    // Also strip from shorthand 'background:' that contains these
    result = result.replace(/background\s*:\s*#(?:0d9488|14b8a6|2dd4bf|5eead4|99f6e4|ccfbf1|115e59|134e4a|042f2e)[^;]*;?/gi, '');

    return result;
}

/**
 * Clean content
 */
function cleanContent(html: string): string {
    let cleaned = html
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '')
        .replace(/(?:<p[^>]*>\s*<\/p>|<div[^>]*>\s*<\/div>|<br\s*\/?>)+$/gi, '')
        .trim();

    // Strip teal colors from inline styles
    cleaned = sanitizeTealFromHtml(cleaned);

    return cleaned;
}

/**
 * Split top level elements
 */
function splitTopLevelElements(html: string): string[] {
    const elements: string[] = [];
    let currentPos = 0;

    while (currentPos < html.length) {
        const remaining = html.slice(currentPos);
        const startTagMatch = remaining.match(/<([a-z1-6]+)[^>]*>/i);

        if (!startTagMatch) {
            const textContent = remaining.trim();
            if (textContent) elements.push(textContent);
            break;
        }

        const tagStartIndexInSlice = startTagMatch.index!;
        const tagStartIndex = currentPos + tagStartIndexInSlice;

        if (tagStartIndexInSlice > 0) {
            const textBefore = html.slice(currentPos, tagStartIndex).trim();
            if (textBefore) elements.push(textBefore);
        }

        const tagName = startTagMatch[1].toLowerCase();
        const tagOpenString = startTagMatch[0];

        const selfClosingTags = ["img", "br", "hr", "input", "meta", "link"];
        if (selfClosingTags.includes(tagName) || tagOpenString.endsWith("/>")) {
            elements.push(html.slice(tagStartIndex, tagStartIndex + tagOpenString.length));
            currentPos = tagStartIndex + tagOpenString.length;
            continue;
        }

        let depth = 1;
        const tagPatterns = new RegExp(`<(/?${tagName})(?:\\s|/|>)`, "gi");
        let searchPos = tagStartIndex + tagOpenString.length;
        tagPatterns.lastIndex = searchPos;

        let foundMatch = false;
        let match;

        while ((match = tagPatterns.exec(html)) !== null) {
            if (match[1].toLowerCase() === tagName) {
                depth++;
            } else if (match[1].toLowerCase() === `/${tagName}`) {
                depth--;
            }

            if (depth === 0) {
                const tagEndIndex = match.index + match[0].length;
                elements.push(html.slice(tagStartIndex, tagEndIndex).trim());
                currentPos = tagEndIndex;
                foundMatch = true;
                break;
            }
        }

        if (!foundMatch) {
            elements.push(html.slice(tagStartIndex).trim());
            break;
        }
    }

    return elements.filter(el => el && el.trim().length > 0);
}

function cleanHeadingTitle(html: string): string {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function hasFlatsomeShortcodes(html: string): boolean {
    return html.includes('[section') || html.includes('[row') || html.includes('[col') || html.includes('[ux_text]');
}

/**
 * Main Converter
 */
export function htmlToPuckBlocks(html: string, baseUrl: string = '', parentAlign?: string): Data {
    const blocks: PuckBlock[] = [];
    const zones: Record<string, PuckBlock[]> = {};

    if (!html || html.trim().length === 0) {
        return { content: [], root: { props: { title: "Empty Import" } } };
    }

    if (hasFlatsomeShortcodes(html)) {
        console.log('[HTML_TO_PUCK] Detected Flatsome Shortcodes, delegating...');
        return flatsomeToPuck(html);
    }

    console.log(`[HTML_TO_PUCK] Starting conversion of ${html.length} chars. ParentAlign: ${parentAlign}`);

    let cleanedHtml = cleanContent(html);
    const fixedHtml = fixUrls(cleanedHtml, baseUrl);
    const unwrappedHtml = unwrapContainers(fixedHtml);
    const elements = splitTopLevelElements(unwrappedHtml);

    console.log(`[HTML_TO_PUCK] Found ${elements.length} top-level elements after unwrapping`);

    for (const element of elements) {
        const trimmed = element.trim();
        if (trimmed.length < 5 && !trimmed.includes('<img')) continue;

        // SECTION
        const sectionMatch = trimmed.match(/^<section([^>]*)>([\s\S]*?)<\/section>$/i);
        if (sectionMatch) {
            const attributes = sectionMatch[1];
            const innerHtml = sectionMatch[2];

            // MULTILINE SAFE REGEX
            const styleMatch = attributes.match(/style=(["'])([\s\S]*?)\1/i);
            const styleString = styleMatch ? styleMatch[2] : "";

            // Extract full background
            const bg = getBackground(styleString);
            const padding = getStyleValue(styleString, 'padding');

            const sectionAlign =
                (styleString.includes('text-align: center') || styleString.includes('text-align:center') || attributes.includes('text-center')) ? 'center' :
                    (styleString.includes('text-align: right') || styleString.includes('text-align:right') || attributes.includes('text-right')) ? 'right' : undefined;

            const sectionId = generateId();

            blocks.push({
                type: 'Section',
                props: {
                    id: sectionId,
                    // bg is already filtered by stripUnwantedColors() - teal blocked, navy/peach allowed
                    backgroundColor: bg,
                    padding: padding || "40px 0px"
                }
            });

            const childData = htmlToPuckBlocks(innerHtml, baseUrl, sectionAlign);
            zones[`${sectionId}:content`] = childData.content;
            if (childData.zones) Object.assign(zones, childData.zones);
            continue;
        }

        // HEADINGS
        const headingMatch = trimmed.match(/^<(h[1-6])([^>]*)>([\s\S]*?)<\/\1>$/i);
        if (headingMatch) {
            const tag = headingMatch[1].toLowerCase();
            const attributes = headingMatch[2];
            const innerContent = headingMatch[3];

            const sizeMap: Record<string, string> = {
                'h1': '6xl', 'h2': '4xl', 'h3': '3xl', 'h4': '2xl', 'h5': 'xl', 'h6': 'lg'
            };

            // MULTILINE SAFE REGEX
            const styleMatch = attributes.match(/style=(["'])([\s\S]*?)\1/i);
            const styleString = styleMatch ? styleMatch[2] : "";

            let align = parentAlign || 'left';
            if (attributes.includes('text-center') || attributes.includes('text-align: center')) align = 'center';
            else if (attributes.includes('text-right') || attributes.includes('text-align: right')) align = 'right';

            blocks.push({
                type: 'HeadingBlock',
                props: {
                    id: generateId(),
                    title: cleanHeadingTitle(innerContent),
                    size: sizeMap[tag] || 'xl',
                    align: align,
                    textColor: mapColor(styleString, attributes)
                }
            });
            continue;
        }

        // IMAGE
        const imageMatch = trimmed.match(/^<img[^>]*src=["']([^"']+)["'][^>]*>$/i);
        if (imageMatch) {
            const altMatch = trimmed.match(/alt=["']([^"']*)["']/i);
            blocks.push({
                type: 'ImageBlock',
                props: {
                    id: generateId(),
                    src: imageMatch[1],
                    alt: altMatch ? altMatch[1] : 'Imported image',
                    aspectRatio: 'auto',
                    rounded: 'md'
                }
            });
            continue;
        }

        // BUTTON
        const buttonMatch = trimmed.match(/^<a\s+([^>]*)>([\s\S]*?)<\/a>$/i);
        if (buttonMatch) {
            const attributes = buttonMatch[1];
            const innerText = buttonMatch[2].replace(/<[^>]*>/g, '').trim();
            const hrefMatch = attributes.match(/href=["']([^"']+)["']/i);
            const href = hrefMatch ? hrefMatch[1] : '#';

            let variant = 'default';
            if (attributes.includes('is-outline') || attributes.includes('class="outline"') || attributes.includes('variant-outline')) variant = 'outline';
            else if (attributes.includes('secondary')) variant = 'secondary';
            else if (attributes.includes('ghost')) variant = 'ghost';

            if (attributes.includes('class="btn') || attributes.includes('class="button') || attributes.includes('class="wp-block-button__link') || attributes.includes('style=')) {
                blocks.push({
                    type: 'Button',
                    props: {
                        id: generateId(),
                        label: innerText,
                        href: href,
                        variant: variant
                    }
                });
                continue;
            }
        }

        // BLOCKQUOTE
        const quoteMatch = trimmed.match(/^<blockquote([^>]*)>([\s\S]*?)<\/blockquote>$/i);
        if (quoteMatch) {
            const attributes = quoteMatch[1];
            const content = quoteMatch[2].trim();
            const cleanContent = content.replace(/<\/?p[^>]*>/g, '').trim();

            // MULTILINE SAFE REGEX
            const styleMatch = attributes.match(/style=(["'])([\s\S]*?)\1/i);
            const styleString = styleMatch ? styleMatch[2] : "";
            const borderProps = mapBorder(styleString);

            // Extract BG if present
            const bg = getBackground(styleString);

            if (borderProps.borderWidth) {
                const containerId = generateId();
                blocks.push({
                    type: 'ContainerBlock',
                    props: {
                        id: containerId,
                        layout: 'stack',
                        gap: 'sm',
                        paddingX: '4',
                        maxWidth: 'full',
                        ...borderProps
                        // NOTE: DO NOT import backgrounds - they contain site theme colors
                    }
                });

                zones[`${containerId}:content`] = [{
                    type: 'TextBlock',
                    props: {
                        id: generateId(),
                        content: cleanContent,
                        align: 'center',
                        fontStyle: 'italic',
                        textColor: mapColor(styleString, attributes)
                    }
                }];
            } else {
                blocks.push({
                    type: 'TextBlock',
                    props: {
                        id: generateId(),
                        content: cleanContent,
                        align: 'center',
                        fontStyle: 'italic',
                        textColor: mapColor(styleString, attributes)
                    }
                });
            }
            continue;
        }

        // PARAGRAPH
        const pMatch = trimmed.match(/^<p\s*([^>]*)>([\s\S]*?)<\/p>$/i);
        if (pMatch) {
            const attributes = pMatch[1];
            const content = pMatch[2].trim();
            // MULTILINE SAFE REGEX
            const styleMatch = attributes.match(/style=(["'])([\s\S]*?)\1/i);
            const styleString = styleMatch ? styleMatch[2] : "";

            let align = parentAlign || 'left';
            if (attributes.includes('text-center') || attributes.includes('text-align: center')) align = 'center';
            else if (attributes.includes('text-right') || attributes.includes('text-align: right')) align = 'right';

            if (!content.includes('<div') && !content.includes('<section')) {
                blocks.push({
                    type: 'TextBlock',
                    props: {
                        id: generateId(),
                        content: content,
                        align: align,
                        textColor: mapColor(styleString, attributes)
                    }
                });
                continue;
            }
        }

        // DIV
        const divMatch = trimmed.match(/^<div\s*([^>]*)>([\s\S]*)<\/div>$/i);
        if (divMatch) {
            const attributes = divMatch[1];
            const content = divMatch[2].trim();

            // MULTILINE SAFE REGEX
            const styleMatch = attributes.match(/style=(["'])([\s\S]*?)\1/i);
            const styleString = styleMatch ? styleMatch[2] : "";

            const borderProps = mapBorder(styleString);
            const bg = getBackground(styleString);

            // FLATSOME SECTION DETECTION: div.section or div with section-related classes
            const isFlatsomeSection = attributes.includes('class=') &&
                (attributes.includes('section') || attributes.includes('banner') || attributes.includes('full-width'));

            if (isFlatsomeSection || content.length > 200) {
                const sectionId = generateId();
                // Extract bg for this section (already filtered by stripUnwantedColors)
                const sectionBg = getBackground(styleString);
                
                blocks.push({
                    type: 'Section',
                    props: {
                        id: sectionId,
                        // bg is filtered - teal blocked, navy/peach allowed
                        backgroundColor: sectionBg,
                        padding: getStyleValue(styleString, 'padding') || "40px 0px"
                    }
                });

                const childData = htmlToPuckBlocks(content, baseUrl, parentAlign);
                zones[`${sectionId}:content`] = childData.content;
                if (childData.zones) Object.assign(zones, childData.zones);
                continue;
            }

            // FORCE ContainerBlock if it has a border OR looks complex
            if (borderProps.borderWidth || content.includes('<h') || content.includes('<div') || content.includes('<btn') || content.includes('location-card')) {
                const containerId = generateId();

                blocks.push({
                    type: 'ContainerBlock',
                    props: {
                        id: containerId,
                        layout: 'stack',
                        gap: 'md',
                        maxWidth: 'full',
                        className: attributes.includes('location-card') ? 'location-card' : '',
                        ...borderProps
                        // NOTE: DO NOT import backgrounds - they contain site theme colors
                    }
                });

                const childData = htmlToPuckBlocks(content, baseUrl, parentAlign);
                zones[`${containerId}:content`] = childData.content;
                if (childData.zones) Object.assign(zones, childData.zones);
                continue;
            } else {
                let align = parentAlign || 'left';
                if (attributes.includes('text-center') || attributes.includes('text-align: center')) align = 'center';
                else if (attributes.includes('text-right') || attributes.includes('text-align: right')) align = 'right';

                blocks.push({
                    type: 'TextBlock',
                    props: {
                        id: generateId(),
                        content: content,
                        align: align,
                        textColor: mapColor(styleString, attributes)
                    }
                });
                continue;
            }
        }

        // FALLBACK: Strip HTML tags and use TextBlock (no raw HTML in Puck)
        const plainText = trimmed.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        if (plainText && plainText.length > 2) {
            blocks.push({
                type: 'TextBlock',
                props: {
                    id: generateId(),
                    content: plainText,
                    align: parentAlign || 'left'
                }
            });
        }
    }

    return {
        content: blocks,
        root: { props: { title: "Imported Page" } },
        zones: zones
    };
}
