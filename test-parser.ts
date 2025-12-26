
import { flatsomeToPuck } from "./lib/wordpress/flatsome-to-puck";

// The content we saw in the diagnostic (Step 1715)
const rawContent = `<!-- wp:html -->[section padding="60px"]
[row style="collapse" width="full-width"]
[col span="12"]
[ux_text]
    <div style="position:absolute; top:-50px; left:-50px; width:200px; height:200px; background: #F28C74; opacity:0.05; border-radius:50%; filter:blur(40px);"></div>
    
    <div class="container" style="max-width: 1200px; margin: 0 auto; position: relative; z-index: 2;">
        <h1 style="font-family: 'Arial Black', sans-serif; font-size: clamp(2.5rem, 8vw, 5rem); text-transform:uppercase; margin-bottom:20px; line-height: 0.9; letter-spacing: -2px;">
            Fresh. <span style="color: #F28C74;">Local.</span> Fast.
        </h1>
        
        <p style="font-size: 1.2rem; color: #BDC3C7; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; letter-spacing: 1px;">
            Experience the best flavors in Jacksonville Beach.
        </p>
        
        [/ux_text]
[button text="ORDER ONLINE" link="https://elated-carver.51-81-186-244.plesk.page/order" color="primary" style="shade" size="large"]
[ux_text]
    </div>

    <div style="position:absolute; bottom:-50px; right:-50px; width:300px; height:300px; background: #F28C74; opacity:0.03; border-radius:50%; filter:blur(60px);"></div>
[/ux_text]
[/col]
[/row]
[/section]`;

console.log("--- START TEST ---");
const blocks = flatsomeToPuck(rawContent);
console.log(JSON.stringify(blocks, null, 2));
console.log("--- END TEST ---");
