import { cn } from "@/lib/utils";

// ===== SPACING OPTIONS =====
export const spacingOptions = [
    { label: "None", value: "0" },
    { label: "XS (4px)", value: "1" },
    { label: "SM (8px)", value: "2" },
    { label: "MD (16px)", value: "4" },
    { label: "LG (24px)", value: "6" },
    { label: "XL (32px)", value: "8" },
    { label: "2XL (48px)", value: "12" },
    { label: "3XL (64px)", value: "16" },
    { label: "4XL (96px)", value: "24" },
];

// ===== BACKGROUND OPTIONS =====
export const backgroundOptions = [
    { label: "Transparent", value: "transparent" },
    { label: "Black", value: "black" },
    { label: "Slate 950", value: "slate-950" },
    { label: "Slate 900", value: "slate-900" },
    { label: "White/5", value: "white/5" },
    { label: "White/10", value: "white/10" },
    { label: "Indigo/10", value: "indigo-950/20" },
    { label: "Purple/10", value: "purple-950/20" },
    { label: "Emerald/10", value: "emerald-950/20" },
];

export const gradientOptions = [
    { label: "None", value: "none" },
    { label: "Purple to Pink", value: "from-purple-600 to-pink-600" },
    { label: "Indigo to Cyan", value: "from-indigo-600 to-cyan-500" },
    { label: "Green to Teal", value: "from-green-500 to-teal-600" },
    { label: "Orange to Red", value: "from-orange-500 to-red-600" },
    { label: "Blue to Purple", value: "from-blue-600 to-purple-600" },
    { label: "Rose to Orange", value: "from-rose-500 to-orange-500" },
    { label: "Slate Dark", value: "from-slate-900 to-slate-950" },
];

// ===== BORDER OPTIONS =====
export const borderWidthOptions = [
    { label: "None", value: "0" },
    { label: "1px", value: "1" },
    { label: "2px", value: "2" },
    { label: "4px", value: "4" },
];

export const borderColorOptions = [
    { label: "White/5", value: "white/5" },
    { label: "White/10", value: "white/10" },
    { label: "White/20", value: "white/20" },
    { label: "Indigo", value: "indigo-500/30" },
    { label: "Purple", value: "purple-500/30" },
    { label: "Emerald", value: "emerald-500/30" },
    { label: "Orange", value: "orange-500/30" },
    { label: "Solid White", value: "white" },
    { label: "Solid Black", value: "black" },
];

export const borderRadiusOptions = [
    { label: "None", value: "none" },
    { label: "Small", value: "sm" },
    { label: "Medium", value: "md" },
    { label: "Large", value: "lg" },
    { label: "XL", value: "xl" },
    { label: "2XL", value: "2xl" },
    { label: "Full", value: "full" },
];

// ===== OPACITY OPTIONS =====
export const opacityOptions = [
    { label: "100%", value: "100" },
    { label: "90%", value: "90" },
    { label: "75%", value: "75" },
    { label: "50%", value: "50" },
    { label: "25%", value: "25" },
];

// ===== ANIMATION OPTIONS =====
export const animationOptions = [
    { label: "None", value: "none" },
    { label: "Fade In", value: "fadeIn" },
    { label: "Slide Up", value: "slideUp" },
    { label: "Slide Down", value: "slideDown" },
    { label: "Slide Left", value: "slideLeft" },
    { label: "Slide Right", value: "slideRight" },
    { label: "Scale In", value: "scaleIn" },
    { label: "Bounce", value: "bounce" },
];

export const animationDelayOptions = [
    { label: "None", value: "0" },
    { label: "100ms", value: "100" },
    { label: "200ms", value: "200" },
    { label: "300ms", value: "300" },
    { label: "500ms", value: "500" },
];

// ===== VISIBILITY OPTIONS =====
export const booleanOptions = [
    { label: "No", value: false },
    { label: "Yes", value: true },
];

// ===== SIZE OPTIONS =====
export const maxWidthOptions = [
    { label: "Full", value: "full" },
    { label: "7XL (1280px)", value: "7xl" },
    { label: "6XL (1152px)", value: "6xl" },
    { label: "5XL (1024px)", value: "5xl" },
    { label: "4XL (896px)", value: "4xl" },
    { label: "3XL (768px)", value: "3xl" },
    { label: "2XL (672px)", value: "2xl" },
    { label: "XL (576px)", value: "xl" },
];

export const minHeightOptions = [
    { label: "Auto", value: "auto" },
    { label: "Screen", value: "screen" },
    { label: "50vh", value: "[50vh]" },
    { label: "75vh", value: "[75vh]" },
    { label: "400px", value: "[400px]" },
    { label: "500px", value: "[500px]" },
    { label: "600px", value: "[600px]" },
];

// ===== TYPOGRAPHY OPTIONS =====
export const lineHeightOptions = [
    { label: "Tight", value: "tight" },
    { label: "Normal", value: "normal" },
    { label: "Relaxed", value: "relaxed" },
    { label: "Loose", value: "loose" },
];

export const letterSpacingOptions = [
    { label: "Tighter", value: "tighter" },
    { label: "Tight", value: "tight" },
    { label: "Normal", value: "normal" },
    { label: "Wide", value: "wide" },
    { label: "Wider", value: "wider" },
    { label: "Widest", value: "widest" },
];

export const textColorOptions = [
    { label: "White", value: "white" },
    { label: "Slate 100", value: "slate-100" },
    { label: "Slate 200", value: "slate-200" },
    { label: "Slate 300", value: "slate-300" },
    { label: "Slate 400", value: "slate-400" },
    { label: "Indigo 400", value: "indigo-400" },
    { label: "Purple 400", value: "purple-400" },
    { label: "Emerald 400", value: "emerald-400" },
    { label: "Orange 400", value: "orange-400" },
];

export const fontWeightOptions = [
    { label: "Thin", value: "thin" },
    { label: "Extralight", value: "extralight" },
    { label: "Light", value: "light" },
    { label: "Normal", value: "normal" },
    { label: "Medium", value: "medium" },
    { label: "Semibold", value: "semibold" },
    { label: "Bold", value: "bold" },
    { label: "Extrabold", value: "extrabold" },
    { label: "Black", value: "black" },
];

export const textTransformOptions = [
    { label: "Normal", value: "normal-case" },
    { label: "Uppercase", value: "uppercase" },
    { label: "Lowercase", value: "lowercase" },
    { label: "Capitalize", value: "capitalize" },
];

export const textDecorationOptions = [
    { label: "None", value: "no-underline" },
    { label: "Underline", value: "underline" },
    { label: "Line Through", value: "line-through" },
];

export const fontSizeOptions = [
    { label: "XS", value: "xs" },
    { label: "Small", value: "sm" },
    { label: "Base", value: "base" },
    { label: "Large", value: "lg" },
    { label: "XL", value: "xl" },
    { label: "2XL", value: "2xl" },
    { label: "3XL", value: "3xl" },
    { label: "4XL", value: "4xl" },
    { label: "5XL", value: "5xl" },
    { label: "6XL", value: "6xl" },
    { label: "7XL", value: "7xl" },
];

// ===== LAYOUT OPTIONS =====
export const justifyContentOptions = [
    { label: "Start", value: "start" },
    { label: "Center", value: "center" },
    { label: "End", value: "end" },
    { label: "Between", value: "between" },
    { label: "Around", value: "around" },
    { label: "Evenly", value: "evenly" },
];

export const alignItemsOptions = [
    { label: "Start", value: "start" },
    { label: "Center", value: "center" },
    { label: "End", value: "end" },
    { label: "Baseline", value: "baseline" },
    { label: "Stretch", value: "stretch" },
];

export const flexDirectionOptions = [
    { label: "Row", value: "row" },
    { label: "Row Reverse", value: "row-reverse" },
    { label: "Column", value: "col" },
    { label: "Column Reverse", value: "col-reverse" },
];

// ===== UTILITY FUNCTIONS =====

// Maps for JIT compatibility
const mtMap: Record<string, string> = { "0": "mt-0", "1": "mt-1", "2": "mt-2", "4": "mt-4", "6": "mt-6", "8": "mt-8", "12": "mt-12", "16": "mt-16", "24": "mt-24" };
const mbMap: Record<string, string> = { "0": "mb-0", "1": "mb-1", "2": "mb-2", "4": "mb-4", "6": "mb-6", "8": "mb-8", "12": "mb-12", "16": "mb-16", "24": "mb-24" };
const mlMap: Record<string, string> = { "0": "ml-0", "1": "ml-1", "2": "ml-2", "4": "ml-4", "6": "ml-6", "8": "ml-8", "12": "ml-12", "16": "ml-16", "24": "ml-24" };
const mrMap: Record<string, string> = { "0": "mr-0", "1": "mr-1", "2": "mr-2", "4": "mr-4", "6": "mr-6", "8": "mr-8", "12": "mr-12", "16": "mr-16", "24": "mr-24" };

export const getMarginClass = (top?: string, bottom?: string, left?: string, right?: string) => {
    return cn(
        top && mtMap[top],
        bottom && mbMap[bottom],
        left && mlMap[left],
        right && mrMap[right]
    );
};

const pyMap: Record<string, string> = { "0": "py-0", "1": "py-1", "2": "py-2", "4": "py-4", "6": "py-6", "8": "py-8", "12": "py-12", "16": "py-16", "24": "py-24" };
const pxMap: Record<string, string> = { "0": "px-0", "1": "px-1", "2": "px-2", "4": "px-4", "6": "px-6", "8": "px-8", "12": "px-12", "16": "px-16", "24": "px-24" };

export const getPaddingClass = (y?: string, x?: string) => {
    return cn(
        y && pyMap[y],
        x && pxMap[x]
    );
};

const bgMap: Record<string, string> = {
    "transparent": "bg-transparent",
    "black": "bg-black",
    "slate-950": "bg-slate-950",
    "slate-900": "bg-slate-900",
    "white/5": "bg-white/5",
    "white/10": "bg-white/10",
    "indigo-950/20": "bg-indigo-950/20",
    "purple-950/20": "bg-purple-950/20",
    "emerald-950/20": "bg-emerald-950/20",
};

export const getBackgroundClass = (bg?: string, gradient?: string) => {
    if (gradient && gradient !== "none") {
        return `bg-gradient-to-r ${gradient}`; // Gradients are full strings in options
    }
    return bg && bg !== "transparent" ? bgMap[bg] || "" : "";
};

const borderWMap: Record<string, string> = { "0": "border-0", "1": "border", "2": "border-2", "4": "border-4" };
const borderCMap: Record<string, string> = {
    "white/5": "border-white/5",
    "white/10": "border-white/10",
    "white/20": "border-white/20",
    "indigo-500/30": "border-indigo-500/30",
    "purple-500/30": "border-purple-500/30",
    "emerald-500/30": "border-emerald-500/30",
    "orange-500/30": "border-orange-500/30",
    "white": "border-white", // Solid White
    "black": "border-black", // Solid Black
};
const roundedMap: Record<string, string> = {
    "none": "rounded-none",
    "sm": "rounded-sm",
    "md": "rounded-md",
    "lg": "rounded-lg",
    "xl": "rounded-xl",
    "2xl": "rounded-2xl",
    "full": "rounded-full",
};

export const getBorderClass = (width?: string, color?: string, radius?: string) => {
    return cn(
        width && borderWMap[width],
        color && borderCMap[color],
        radius && roundedMap[radius]
    );
};

export const getAnimationClass = (animation?: string) => {
    const animationMap: Record<string, string> = {
        fadeIn: "animate-fadeIn",
        slideUp: "animate-slideUp",
        slideDown: "animate-slideDown",
        slideLeft: "animate-slideLeft",
        slideRight: "animate-slideRight",
        scaleIn: "animate-scaleIn",
        bounce: "animate-bounce",
    };
    return animation && animation !== "none" ? animationMap[animation] || "" : "";
};

export const getVisibilityClass = (hideOnMobile?: boolean, hideOnTablet?: boolean, hideOnDesktop?: boolean) => {
    const classes: string[] = [];
    if (hideOnMobile) classes.push("max-md:hidden");
    if (hideOnTablet) classes.push("md:max-lg:hidden");
    if (hideOnDesktop) classes.push("lg:hidden");
    return classes.join(" ");
};

const maxWMap: Record<string, string> = {
    "full": "max-w-full",
    "7xl": "max-w-7xl",
    "6xl": "max-w-6xl",
    "5xl": "max-w-5xl",
    "4xl": "max-w-4xl",
    "3xl": "max-w-3xl",
    "2xl": "max-w-2xl",
    "xl": "max-w-xl",
};

export const getMaxWidthClass = (maxWidth?: string) => {
    if (!maxWidth || maxWidth === "full") return "";
    return maxWMap[maxWidth] || "";
};

const minHMap: Record<string, string> = {
    "auto": "min-h-0",
    "screen": "min-h-screen",
    "[50vh]": "min-h-[50vh]",
    "[75vh]": "min-h-[75vh]",
    "[400px]": "min-h-[400px]",
    "[500px]": "min-h-[500px]",
    "[600px]": "min-h-[600px]",
};

export const getMinHeightClass = (minHeight?: string) => {
    if (!minHeight || minHeight === "auto") return "";
    return minHMap[minHeight] || "";
};

const opacityMap: Record<string, string> = {
    "100": "opacity-100",
    "90": "opacity-90",
    "75": "opacity-75",
    "50": "opacity-50",
    "25": "opacity-25",
};

export const getOpacityClass = (opacity?: string) => {
    if (!opacity || opacity === "100") return "";
    return opacityMap[opacity] || "";
};

const fontWeightMap: Record<string, string> = {
    "thin": "font-thin",
    "extralight": "font-extralight",
    "light": "font-light",
    "normal": "font-normal",
    "medium": "font-medium",
    "semibold": "font-semibold",
    "bold": "font-bold",
    "extrabold": "font-extrabold",
    "black": "font-black",
};

export const getTypographyClass = (weight?: string, transform?: string, decoration?: string, size?: string) => {
    return cn(
        weight && fontWeightMap[weight],
        transform,
        decoration,
        size && `text-${size}`
    );
};

const justifyMap: Record<string, string> = {
    "start": "justify-start",
    "center": "justify-center",
    "end": "justify-end",
    "between": "justify-between",
    "around": "justify-around",
    "evenly": "justify-evenly",
};

const alignMap: Record<string, string> = {
    "start": "items-start",
    "center": "items-center",
    "end": "items-end",
    "baseline": "items-baseline",
    "stretch": "items-stretch",
};

const flexMap: Record<string, string> = {
    "row": "flex-row",
    "row-reverse": "flex-row-reverse",
    "col": "flex-col",
    "col-reverse": "flex-col-reverse",
};

export const getLayoutClass = (justify?: string, align?: string, direction?: string) => {
    return cn(
        justify && justifyMap[justify],
        align && alignMap[align],
        direction && flexMap[direction]
    );
};

// ===== REUSABLE FIELD DEFINITIONS FOR PUCK =====

export const spacingFields = {
    marginTop: {
        type: "select" as const,
        label: "Margin Top",
        options: spacingOptions,
    },
    marginBottom: {
        type: "select" as const,
        label: "Margin Bottom",
        options: spacingOptions,
    },
    paddingY: {
        type: "select" as const,
        label: "Padding Vertical",
        options: spacingOptions,
    },
    paddingX: {
        type: "select" as const,
        label: "Padding Horizontal",
        options: spacingOptions,
    },
};

export const backgroundFields = {
    backgroundColor: {
        type: "select" as const,
        label: "Background Color",
        options: backgroundOptions,
    },
    customBackgroundColor: {
        type: "text" as const,
        label: "Custom Background (Hex/RGB)",
    },
    backgroundGradient: {
        type: "select" as const,
        label: "Background Gradient",
        options: gradientOptions,
    },
};

export const borderFields = {
    borderWidth: {
        type: "select" as const,
        label: "Border Width",
        options: borderWidthOptions,
    },
    borderColor: {
        type: "select" as const,
        label: "Border Color",
        options: borderColorOptions,
    },
    borderRadius: {
        type: "select" as const,
        label: "Border Radius",
        options: borderRadiusOptions,
    },
};

export const animationFields = {
    animation: {
        type: "select" as const,
        label: "Animation",
        options: animationOptions,
    },
    animationDelay: {
        type: "select" as const,
        label: "Animation Delay",
        options: animationDelayOptions,
    },
};

export const visibilityFields = {
    hideOnMobile: {
        type: "radio" as const,
        label: "Hide on Mobile",
        options: booleanOptions,
    },
    hideOnTablet: {
        type: "radio" as const,
        label: "Hide on Tablet",
        options: booleanOptions,
    },
    hideOnDesktop: {
        type: "radio" as const,
        label: "Hide on Desktop",
        options: booleanOptions,
    },
};

export const typographyFields = {
    fontWeight: {
        type: "select" as const,
        label: "Font Weight",
        options: fontWeightOptions,
    },
    textTransform: {
        type: "select" as const,
        label: "Text Transform",
        options: textTransformOptions,
    },
    textDecoration: {
        type: "select" as const,
        label: "Text Decoration",
        options: textDecorationOptions,
    },
    fontSize: {
        type: "select" as const,
        label: "Font Size",
        options: fontSizeOptions,
    },
    customTextColor: {
        type: "text" as const,
        label: "Custom Text Color (Hex/RGB)",
    },
    customFont: {
        type: "text" as const,
        label: "Custom Font Family",
    }
};

export const layoutFields = {
    flexDirection: {
        type: "select" as const,
        label: "Direction",
        options: flexDirectionOptions,
    },
    justifyContent: {
        type: "select" as const,
        label: "Justify Content",
        options: justifyContentOptions,
    },
    alignItems: {
        type: "select" as const,
        label: "Align Items",
        options: alignItemsOptions,
    },
    gap: {
        type: "select" as const,
        label: "Gap",
        options: spacingOptions,
    }
};

// ===== COMBINED HELPER TO GENERATE ALL STYLE CLASSES =====

export interface CommonStyleProps {
    marginTop?: string;
    marginBottom?: string;
    paddingY?: string;
    paddingX?: string;
    backgroundColor?: string;
    customBackgroundColor?: string;
    backgroundGradient?: string;
    borderWidth?: string;
    borderColor?: string;
    borderRadius?: string;
    animation?: string;
    animationDelay?: string;
    hideOnMobile?: boolean;
    hideOnTablet?: boolean;
    hideOnDesktop?: boolean;
    opacity?: string;
    fontWeight?: string;
    textTransform?: string;
    textDecoration?: string;
    fontSize?: string;
    customTextColor?: string;
    customFont?: string;
    justifyContent?: string;
    alignItems?: string;
    flexDirection?: string;
    gap?: string;
    id?: string;
}

export const getCommonStyleClasses = (props: CommonStyleProps): string => {
    return cn(
        getMarginClass(props.marginTop, props.marginBottom),
        getPaddingClass(props.paddingY, props.paddingX),
        getBackgroundClass(props.backgroundColor, props.backgroundGradient),
        getBorderClass(props.borderWidth, props.borderColor, props.borderRadius),
        getAnimationClass(props.animation),
        getVisibilityClass(props.hideOnMobile, props.hideOnTablet, props.hideOnDesktop),
        getOpacityClass(props.opacity),
        getTypographyClass(props.fontWeight, props.textTransform, props.textDecoration, props.fontSize),
        getLayoutClass(props.justifyContent, props.alignItems, props.flexDirection)
    );
};

export const getCommonInlineStyles = (props: CommonStyleProps): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    if (props.customTextColor) styles.color = props.customTextColor;
    if (props.customBackgroundColor) styles.background = props.customBackgroundColor;
    if (props.customFont) styles.fontFamily = props.customFont;
    if (props.gap) {
        // Map gap option to px value roughly or use rem
        const gapMap: Record<string, string> = { "0": "0px", "1": "4px", "2": "8px", "4": "16px", "6": "24px", "8": "32px", "12": "48px", "16": "64px", "24": "96px" };
        styles.gap = gapMap[props.gap as string];
    }
    return styles;
};
