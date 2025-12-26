
import { puckToFlatsomeShortcode } from "./puck-to-flatsome";

const mockData = {
    content: [
        {
            type: "Section",
            props: {
                id: "sec-1",
                backgroundColor: "#000",
                padding: "40px"
            }
        }
    ],
    zones: {
        "sec-1:content": [
            {
                type: "HeadingBlock",
                props: {
                    title: "Hello Nested",
                    align: "center"
                }
            },
            {
                type: "Button",
                props: {
                    label: "Click Me",
                    href: "https://example.com"
                }
            }
        ]
    },
    root: { props: { title: "Test Page" } }
};

console.log("Testing Flatsome Exporter with Nested Zones...");
const output = puckToFlatsomeShortcode(mockData);

console.log("OUTPUT:");
console.log(output);

if (output.includes("[section") && output.includes("[row]") && output.includes("Hello Nested")) {
    console.log("SUCCESS: Nested content exported correctly within [section][row][col].");
} else {
    console.error("FAILURE: Output missing required structure.");
}
