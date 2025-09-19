// Using system fonts that closely match the requested fonts
// New York is available on macOS/iOS, with fallbacks for other systems
// Menlo is the default monospace font on macOS

// For New York font (serif)
export const newYork = {
    variable: '--font-new-york',
    style: {
        fontFamily: `'New York', 'Times New Roman', Georgia, serif`,
    },
}

// For Menlo font (monospace)
export const menlo = {
    variable: '--font-menlo',
    style: {
        fontFamily: `Menlo, Monaco, 'Courier New', monospace`,
    },
}
