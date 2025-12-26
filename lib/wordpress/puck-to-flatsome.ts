import { Data } from "@measured/puck";

/**
 * Converts Puck Data into Flatsome UX Builder Shortcodes
 * Supports recursive Zones and strict [section][row][col] hierarchy.
 */

export function puckToFlatsome(data: Data): string {
    if (!data.content || data.content.length === 0) return "";

    // We start processing the top-level content
    // We pass the whole 'data' object so we can lookup zones by ID
    return processBlocks(data.content, data);
}

// Alias for compatibility if imported elsewhere
export const puckToFlatsomeShortcode = puckToFlatsome;

function processBlocks(blocks: any[], data: Data): string {
    return blocks.map(block => convertBlock(block, data)).join("\n");
}

function convertBlock(block: any, data: Data): string {
    const type = block.type;
    const props = block.props || {};
    const id = props.id || block.id;

    switch (type) {
        case "Section":
            return convertSection(props, id, data);

        case "HeadingBlock":
        case "Heading":
            return `[ux_text]\n<h2 style="text-align: ${props.align || 'left'}">${props.title || ''}</h2>\n[/ux_text]`;

        case "RichTextBlock":
        case "Text":
            return convertText(props);

        case "ImageBlock":
        case "Image":
            return convertImage(props);

        case "Button":
        case "ButtonBlock":
            return convertButton(props);

        case "TextBlock":
        case "TextParagraph":
            return convertTextBlock(props);

        case "ContainerBlock":
        case "Container":
            return convertContainer(props, id, data);

        case "SpacerBlock":
        case "Spacer":
            return convertSpacer(props);

        case "DividerBlock":
        case "Divider":
            return convertDivider(props);

        case "Columns":
        case "ColumnsBlock":
            return convertColumns(props, id, data);

        case "CardBlock":
        case "Card":
            return convertCard(props, id, data);

        case "TestimonialBlock":
        case "Testimonial":
            return convertTestimonial(props);

        case "HeroSection":
        case "Hero":
            return convertHero(props, id, data);

        case "FeaturesGrid":
        case "Features":
            return convertFeaturesGrid(props, id, data);

        case "PricingCards":
        case "Pricing":
            return convertPricingCards(props, id, data);

        case "StatsRow":
        case "Stats":
            return convertStatsRow(props);

        case "FAQSection":
        case "FAQ":
            return convertFAQ(props, id, data);

        default:
            // Fallback: If block has content prop, try to render as text
            if (props.content) {
                return `[ux_text]\n${props.content}\n[/ux_text]`;
            }
            console.warn(`[PUCK_TO_FLATSOME] Unknown block type: ${type}`);
            return "";
    }
}

function convertSection(props: any, id: string, data: Data): string {
    let attributes = `padding="${props.padding || '60px'}"`;
    if (props.backgroundColor) {
        // Handle hex vs variable? Flatsome usually takes hex or keywords.
        attributes += ` bg_color="${props.backgroundColor}"`;
    }

    // Look for children in the "content" zone
    const zoneKey = `${id}:content`;
    const children = data.zones ? data.zones[zoneKey] : undefined;

    let innerContent = "";
    if (children && children.length > 0) {
        innerContent = processBlocks(children, data);
    } else {
        // Fallback or empty section
        innerContent = "";
    }

    // STRICT HIERARCHY: [section] content must be in [row][col]
    // If the children are NOT rows (which they usually aren't in Puck), stick them in a col.
    // Flatsome crashes if text is direct child of Section (sometimes, safe to be explicit).

    return `[section ${attributes}]\n[row style="collapse" width="full-width"]\n[col span="12"]\n${innerContent}\n[/col]\n[/row]\n[/section]`;
}


function convertText(props: any): string {
    const content = props.content || props.text || "";
    if (!content) return "";

    // Clean up content?
    // If content contains [shortcodes], we should assume they are valid?
    // But usually Puck RichText is HTML.

    // We wrap standard HTML in [ux_text]
    return `[ux_text]\n${content}\n[/ux_text]`;
}

function convertImage(props: any): string {
    // ux_image uses 'id' (media id) or 'url' (external)
    // If we have a local ID (numeric), use id. If URL, use url.

    // Our import puts 'src' (URL).
    const src = props.src || props.imageUrl;

    // Check if src is a WP Media ID (rare in this context, usually URL)
    // For now assume URL
    if (src) {
        // width/height/depth?
        return `[ux_image url="${src}"]`;
    }
    return "";
}

function convertButton(props: any): string {
    const label = props.label || props.text || "Click Me";
    const link = props.href || props.link || "#";
    const style = props.variant === "outline" ? 'style="outline"' : '';
    const color = props.color ? `color="${props.color}"` : 'color="primary"';

    return `[button text="${label}" link="${link}" ${style} ${color}]`;
}

// ===== NEW BLOCK CONVERTERS =====

function convertTextBlock(props: any): string {
    const content = props.content || props.text || "";
    if (!content) return "";
    
    const align = props.align || "left";
    const color = props.customTextColor ? `color: ${props.customTextColor};` : "";
    const style = color ? ` style="${color}"` : "";
    
    return `[ux_text text_align="${align}"]
<p${style}>${content}</p>
[/ux_text]`;
}

function convertContainer(props: any, id: string, data: Data): string {
    const zoneKey = `${id}:content`;
    const children = data.zones ? data.zones[zoneKey] : undefined;
    
    let innerContent = "";
    if (children && children.length > 0) {
        innerContent = processBlocks(children, data);
    }
    
    // Container maps to a [row][col] wrapper in Flatsome
    const bg = props.customBackgroundColor ? ` bg_color="${props.customBackgroundColor}"` : "";
    const border = props.borderWidth ? ` border="${props.borderWidth}px solid ${props.borderColor || '#fff'}"` : "";
    
    return `[row${bg}${border}]
[col span="12"]
${innerContent}
[/col]
[/row]`;
}

function convertSpacer(props: any): string {
    const height = props.height || props.size || "30";
    return `[gap height="${height}px"]`;
}

function convertDivider(props: any): string {
    const color = props.color || "rgba(255,255,255,0.1)";
    return `[divider color="${color}"]`;
}

function convertColumns(props: any, id: string, data: Data): string {
    // Columns block has multiple column zones
    const columnCount = props.columns || 2;
    const gap = props.gap || "medium";
    
    let columnsContent = "";
    for (let i = 0; i < columnCount; i++) {
        const zoneKey = `${id}:column-${i}`;
        const children = data.zones ? data.zones[zoneKey] : undefined;
        const span = Math.floor(12 / columnCount);
        
        let colContent = "";
        if (children && children.length > 0) {
            colContent = processBlocks(children, data);
        }
        
        columnsContent += `[col span="${span}"]\n${colContent}\n[/col]\n`;
    }
    
    return `[row col_style="divided" col_bg="" depth=""]
${columnsContent}
[/row]`;
}

function convertCard(props: any, id: string, data: Data): string {
    const zoneKey = `${id}:content`;
    const children = data.zones ? data.zones[zoneKey] : undefined;
    
    let innerContent = "";
    if (children && children.length > 0) {
        innerContent = processBlocks(children, data);
    }
    
    const bg = props.backgroundColor ? ` bg_color="${props.backgroundColor}"` : "";
    
    return `[row${bg} depth="2" depth_hover="4"]
[col span="12"]
${innerContent}
[/col]
[/row]`;
}

function convertTestimonial(props: any): string {
    const quote = props.quote || props.content || "";
    const author = props.author || props.name || "";
    const role = props.role || props.title || "";
    const image = props.image || props.avatar || "";
    
    const imageAttr = image ? ` image="${image}"` : "";
    
    return `[testimonial${imageAttr} name="${author}" company="${role}"]
${quote}
[/testimonial]`;
}

function convertHero(props: any, id: string, data: Data): string {
    const zoneKey = `${id}:content`;
    const children = data.zones ? data.zones[zoneKey] : undefined;
    
    let innerContent = "";
    if (children && children.length > 0) {
        innerContent = processBlocks(children, data);
    }
    
    const bg = props.backgroundImage ? ` bg="${props.backgroundImage}"` : "";
    const bgColor = props.backgroundColor ? ` bg_color="${props.backgroundColor}"` : "";
    const height = props.height || "500px";
    const overlay = props.overlay || "0.5";
    
    return `[section${bgColor}${bg} bg_overlay="rgba(0,0,0,${overlay})" height="${height}" dark="true"]
[row style="collapse" width="full-width" v_align="middle"]
[col span="12" align="center"]
${innerContent}
[/col]
[/row]
[/section]`;
}

function convertFeaturesGrid(props: any, id: string, data: Data): string {
    // Features typically have a zone with feature items
    const zoneKey = `${id}:features`;
    const children = data.zones ? data.zones[zoneKey] : undefined;
    
    let featuresContent = "";
    if (children && children.length > 0) {
        featuresContent = processBlocks(children, data);
    }
    
    return `[row col_style="divided"]
${featuresContent}
[/row]`;
}

function convertPricingCards(props: any, id: string, data: Data): string {
    const zoneKey = `${id}:cards`;
    const children = data.zones ? data.zones[zoneKey] : undefined;
    
    let cardsContent = "";
    if (children && children.length > 0) {
        cardsContent = processBlocks(children, data);
    }
    
    return `[row]
${cardsContent}
[/row]`;
}

function convertStatsRow(props: any): string {
    // Stats row has stat items in props
    const stats = props.stats || [];
    
    let statsContent = "";
    for (const stat of stats) {
        statsContent += `[col span="${Math.floor(12 / (stats.length || 1))}"]
[ux_text text_align="center"]
<h2>${stat.value || "0"}</h2>
<p>${stat.label || ""}</p>
[/ux_text]
[/col]
`;
    }
    
    return `[row]
${statsContent}
[/row]`;
}

function convertFAQ(props: any, id: string, data: Data): string {
    const zoneKey = `${id}:items`;
    const children = data.zones ? data.zones[zoneKey] : undefined;
    
    // If we have FAQ items in zone
    if (children && children.length > 0) {
        let faqContent = "";
        for (const item of children) {
            const question = item.props?.question || item.props?.title || "";
            const answer = item.props?.answer || item.props?.content || "";
            faqContent += `[accordion title="${question}"]
${answer}
[/accordion]
`;
        }
        return `[accordion-group]
${faqContent}
[/accordion-group]`;
    }
    
    // Fallback if props has items directly
    const items = props.items || [];
    let faqContent = "";
    for (const item of items) {
        faqContent += `[accordion title="${item.question || ''}"]
${item.answer || ''}
[/accordion]
`;
    }
    
    return `[accordion-group]
${faqContent}
[/accordion-group]`;
}
