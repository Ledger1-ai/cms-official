import { Data } from "@measured/puck";

/**
 * Converts Puck Data into Flatsome UX Builder Shortcodes
 * 
 * Mapping Strategy:
 * - Root -> Treated as main content wrapper
 * - Section -> [section]
 * - Columns/Grid -> [row] and [col]
 * - Text/RichText -> [ux_text]
 * - Image -> [ux_image]
 * - Button -> [button]
 */

export function puckToFlatsomeShortcode(data: Data): string {
    if (!data.content || data.content.length === 0) return "";

    let output = "";

    data.content.forEach((block: any) => {
        if (block.type === "RichTextBlock") {
            const html = block.props.content || "";

            // SMART TRANSFORMATION: Convert HTML <section> to Flatsome [section]
            // This solves the problem where a huge HTML blob is just one text block.
            // We detect top-level <section> tags and convert them to native Flatsome [section] blocks.

            if (html.includes('<section')) {
                const processed = html.replace(/<section\s*([^>]*)>([\s\S]*?)<\/section>/gi, (match: string, attrs: string, innerContent: string) => {
                    let sectionContent = innerContent;

                    // Pass 1: Buttons
                    // <a ... class="btn-coral" ...>Text</a> -> [button text="Text" style="outline" color="primary"]
                    sectionContent = sectionContent.replace(/<a\s+[^>]*href="([^"]*)"[^>]*class="[^"]*btn[^"]*"[^>]*>([\s\S]*?)<\/a>/gi, (btnMatch: string, href: string, btnText: string) => {
                        const text = btnText.trim();
                        // We use [button] shortcode which Flatsome recognizes perfectly
                        return `[button text="${text}" link="${href}" color="primary" style="shade" size="large"]`;
                    });

                    // Pass 2: Containers -> Rows
                    // Replaces <div class="container"...> ... </div>
                    if (sectionContent.includes('class="container"')) {
                        sectionContent = sectionContent.replace(/<div\s+[^>]*class="container"[^>]*>([\s\S]*?)<\/div>/gi, (rowMatch: string, rowContent: string) => {
                            // Inside the row, we wrap content in a col
                            // NOTE: rowContent might now contain [button] shortcodes, which is fine.
                            return `[row]\n[col span="12"]\n[ux_text]\n${rowContent}\n[/ux_text]\n[/col]\n[/row]`;
                        });
                    } else {
                        // No container? Wrap everything in row/col default
                        sectionContent = `[row]\n[col span="12"]\n[ux_text]\n${sectionContent}\n[/ux_text]\n[/col]\n[/row]`;
                    }

                    return `
[section padding="60px"]
${sectionContent}
[/section]
`;
                });

                output += processed + "\n";
            } else {
                output += `
[section padding="0px"]
  [row style="collapse" width="full-width"]
    [col span="12"]
      [ux_text]
${html}
      [/ux_text]
    [/col]
  [/row]
[/section]
`;
            }

        } else {
            // For other native Puck blocks (if any), convert them individually
            const converted = convertBlock(block);
            if (converted) output += converted + "\n";
        }
    });

    return output;
}

export function puckToFlatsome(data: Data): string {
    return puckToFlatsomeShortcode(data);
}

function convertBlock(block: any): string {
    const type = block.type;
    const props = block.props || {};

    switch (type) {
        case "Section":
        case "Hero":
            return convertSection(props);

        case "Columns":
        case "Row":
            return convertRow(props);

        case "RichTextBlock":
        case "Text":
        case "Heading":
            return convertText(props);

        case "Image":
            return convertImage(props);

        case "Button":
            return convertButton(props);

        default:
            return "";
    }
}

function convertSection(props: any): string {
    let attributes = `padding="60px"`;
    if (props.backgroundColor) {
        attributes += ` bg_color="${props.backgroundColor}"`;
    }
    return `[section ${attributes}]\n<!-- Content here would depend on hierarchy -->\n[/section]`;
}

function convertRow(props: any): string {
    return `[row]\n[col span="12" span__sm="12"]\n<!-- Column Content -->\n[/col]\n[/row]`;
}

function convertText(props: any): string {
    const content = props.content || props.text || "";
    if (!content) return "";
    return `[ux_text]\n${content}\n[/ux_text]`;
}

function convertImage(props: any): string {
    if (props.id) {
        return `[ux_image id="${props.id}"]`;
    }
    if (props.imageUrl || props.src) {
        return `[ux_image url="${props.imageUrl || props.src}"]`;
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
