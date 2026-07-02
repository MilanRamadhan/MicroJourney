const fs = require('fs');

const htmlContent = fs.readFileSync('d:/Tugas-tugas/LIDM/MicroJourney/ReferensiDesign/LandingPage/LandingPage.html', 'utf-8');

const colors = {
    "surface-container-high": "#e6e8ea",
    "on-background": "#191c1e",
    "on-error-container": "#93000a",
    "background": "#f7f9fb",
    "on-tertiary-fixed-variant": "#5a4300",
    "on-secondary-fixed": "#002109",
    "outline-variant": "#bec8d2",
    "surface": "#f7f9fb",
    "surface-dim": "#d8dadc",
    "secondary-fixed-dim": "#4ae176",
    "on-primary-fixed": "#001e2f",
    "secondary": "#006e2f",
    "on-tertiary": "#ffffff",
    "on-secondary-container": "#007432",
    "on-primary-fixed-variant": "#004c6e",
    "surface-tint": "#006591",
    "tertiary-fixed": "#ffdf9a",
    "tertiary-container": "#c39400",
    "on-error": "#ffffff",
    "on-secondary-fixed-variant": "#005321",
    "on-primary": "#ffffff",
    "inverse-surface": "#2d3133",
    "surface-variant": "#e0e3e5",
    "inverse-primary": "#89ceff",
    "inverse-on-surface": "#eff1f3",
    "secondary-fixed": "#6bff8f",
    "on-surface-variant": "#3e4850",
    "error": "#ba1a1a",
    "error-container": "#ffdad6",
    "tertiary": "#785a00",
    "surface-container-highest": "#e0e3e5",
    "primary-container": "#0ea5e9",
    "surface-container": "#eceef0",
    "on-surface": "#191c1e",
    "primary-fixed": "#c9e6ff",
    "primary-fixed-dim": "#89ceff",
    "secondary-container": "#6bff8f",
    "on-tertiary-container": "#423000",
    "surface-bright": "#f7f9fb",
    "surface-container-lowest": "#ffffff",
    "on-tertiary-fixed": "#251a00",
    "surface-container-low": "#f2f4f6",
    "on-primary-container": "#003751",
    "primary": "#006591",
    "on-secondary": "#ffffff",
    "outline": "#6e7881",
    "tertiary-fixed-dim": "#f7be1d"
};

const spacing = {
    "gutter": "24px",
    "base": "8px",
    "sm": "12px",
    "md": "24px",
    "xl": "64px",
    "margin-mobile": "16px",
    "lg": "40px",
    "container-max": "1200px",
    "xs": "4px"
};

let replaced = htmlContent;

// Fix closing tags for images and inputs
replaced = replaced.replace(/<img(.*?)>/g, (match) => {
    if (!match.endsWith('/>')) {
        return match.slice(0, -1) + ' />';
    }
    return match;
});

// Remove header and footer if needed, or extract main part
const bodyMatch = replaced.match(/<body[^>]*>([\s\S]*)<\/body>/);
let body = bodyMatch ? bodyMatch[1] : replaced;

// Replace color classes
for (const [key, value] of Object.entries(colors)) {
    const rxBg = new RegExp(`bg-${key}(?![\\w-])`, 'g');
    body = body.replace(rxBg, `bg-[${value}]`);
    
    const rxText = new RegExp(`text-${key}(?![\\w-])`, 'g');
    body = body.replace(rxText, `text-[${value}]`);
    
    const rxBorder = new RegExp(`border-${key}(?![\\w-])`, 'g');
    body = body.replace(rxBorder, `border-[${value}]`);

    const rxRing = new RegExp(`ring-${key}(?![\\w-])`, 'g');
    body = body.replace(rxRing, `ring-[${value}]`);

    const rxShadow = new RegExp(`shadow-${key}(?![\\w-])`, 'g');
    body = body.replace(rxShadow, `shadow-[${value}]`);

    const rxFrom = new RegExp(`from-${key}(?![\\w-])`, 'g');
    body = body.replace(rxFrom, `from-[${value}]`);

    const rxTo = new RegExp(`to-${key}(?![\\w-])`, 'g');
    body = body.replace(rxTo, `to-[${value}]`);
}

// Replace spacing
for (const [key, value] of Object.entries(spacing)) {
    const prefixes = ['p', 'px', 'py', 'pt', 'pb', 'pl', 'pr', 'm', 'mx', 'my', 'mt', 'mb', 'ml', 'mr', 'gap', 'w', 'h', 'top', 'bottom', 'left', 'right', 'max-w'];
    for (const prefix of prefixes) {
        const rx = new RegExp(`(^|\\s)${prefix}-${key}(?![\\w-])`, 'g');
        body = body.replace(rx, `$1${prefix}-[${value}]`);
    }
}

// Fonts
const fontMappings = {
    'font-headline-lg': 'text-[32px] leading-[40px] font-bold font-[family-name:var(--font-plus-jakarta)]',
    'font-headline-md': 'text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-plus-jakarta)]',
    'font-body-lg': 'text-[18px] leading-[28px] font-normal font-[family-name:var(--font-inter)]',
    'font-body-md': 'text-[16px] leading-[24px] font-normal font-[family-name:var(--font-inter)]',
    'font-label-md': 'text-[14px] leading-[20px] tracking-[0.01em] font-semibold font-[family-name:var(--font-inter)]',
    'font-label-sm': 'text-[12px] leading-[16px] font-medium font-[family-name:var(--font-inter)]',
    'font-display-lg': 'text-[48px] leading-[56px] tracking-[-0.02em] font-extrabold font-[family-name:var(--font-plus-jakarta)]'
};

for (const [key, value] of Object.entries(fontMappings)) {
    const rx = new RegExp(key, 'g');
    body = body.replace(rx, value);
    // remove text-* size if we already added it
    const textRx = new RegExp(`text-${key.replace('font-', '')}`, 'g');
    body = body.replace(textRx, '');
}

// class -> className
body = body.replace(/class="/g, 'className="');
// html comments
body = body.replace(/<!--[\s\S]*?-->/g, '');

fs.writeFileSync('parsed.tsx', body);
