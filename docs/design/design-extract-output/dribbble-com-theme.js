// React Theme — extracted from https://dribbble.com/shots/23027887-Coursue-Learning-Platform-Dashboard
// Compatible with: Chakra UI, Stitches, Vanilla Extract, or any CSS-in-JS

/**
 * TypeScript type definition for this theme:
 *
 * interface Theme {
 *   colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    neutral50: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
    neutral500: string;
    neutral600: string;
    neutral700: string;
    neutral800: string;
    neutral900: string;
 *   };
 *   fonts: {
    body: string;
 *   };
 *   fontSizes: {
    '8': string;
    '10': string;
    '11': string;
    '12': string;
    '13': string;
    '14': string;
    '15': string;
    '16': string;
    '20': string;
    '24': string;
    '13.3333': string;
 *   };
 *   space: {
    '1': string;
    '4': string;
    '24': string;
    '30': string;
    '36': string;
    '40': string;
    '50': string;
    '56': string;
    '60': string;
    '64': string;
    '70': string;
    '80': string;
    '120': string;
    '260': string;
 *   };
 *   radii: {
    sm: string;
    md: string;
    lg: string;
    full: string;
 *   };
 *   shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
 *   };
 *   states: {
 *     hover: { opacity: number };
 *     focus: { opacity: number };
 *     active: { opacity: number };
 *     disabled: { opacity: number };
 *   };
 * }
 */

export const theme = {
  "colors": {
    "primary": "#0d0c22",
    "secondary": "#ea4c89",
    "accent": "#f3f3f6",
    "background": "#ffffff",
    "foreground": "#000000",
    "neutral50": "#000000",
    "neutral100": "#060318",
    "neutral200": "#ffffff",
    "neutral300": "#6e6d7a",
    "neutral400": "#655c7a",
    "neutral500": "#9e9ea7",
    "neutral600": "#e7e7e9",
    "neutral700": "#524b63",
    "neutral800": "#262627",
    "neutral900": "#dbdbde"
  },
  "fonts": {
    "body": "'Arial', sans-serif"
  },
  "fontSizes": {
    "8": "8px",
    "10": "10px",
    "11": "11px",
    "12": "12px",
    "13": "13px",
    "14": "14px",
    "15": "15px",
    "16": "16px",
    "20": "20px",
    "24": "24px",
    "13.3333": "13.3333px"
  },
  "space": {
    "1": "1px",
    "4": "4px",
    "24": "24px",
    "30": "30px",
    "36": "36px",
    "40": "40px",
    "50": "50px",
    "56": "56px",
    "60": "60px",
    "64": "64px",
    "70": "70px",
    "80": "80px",
    "120": "120px",
    "260": "260px"
  },
  "radii": {
    "sm": "3px",
    "md": "10px",
    "lg": "16px",
    "full": "50px"
  },
  "shadows": {
    "sm": "rgba(0, 0, 0, 0.03) 0px 2px 6px 0px",
    "md": "rgba(0, 0, 0, 0.5) 0px 0px 10px 0px",
    "lg": "rgba(123, 123, 198, 0.25) 0px 12px 20px 0px, rgba(0, 0, 0, 0.08) 0px 2px 3px 0px",
    "xl": "rgba(27, 32, 50, 0.1) 0px 15px 50px 0px"
  },
  "states": {
    "hover": {
      "opacity": 0.08
    },
    "focus": {
      "opacity": 0.12
    },
    "active": {
      "opacity": 0.16
    },
    "disabled": {
      "opacity": 0.38
    }
  }
};

// MUI v5 theme
export const muiTheme = {
  "palette": {
    "primary": {
      "main": "#0d0c22",
      "light": "hsl(243, 48%, 24%)",
      "dark": "hsl(243, 48%, 10%)"
    },
    "secondary": {
      "main": "#ea4c89",
      "light": "hsl(337, 79%, 76%)",
      "dark": "hsl(337, 79%, 46%)"
    },
    "background": {
      "default": "#ffffff",
      "paper": "#0d0c22"
    },
    "text": {
      "primary": "#000000",
      "secondary": "#0d0c22"
    }
  },
  "typography": {
    "fontFamily": "'Times', sans-serif",
    "h2": {
      "fontSize": "24px",
      "fontWeight": "600",
      "lineHeight": "29px"
    },
    "h3": {
      "fontSize": "20px",
      "fontWeight": "400",
      "lineHeight": "32px"
    },
    "body1": {
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "normal"
    },
    "body2": {
      "fontSize": "13.3333px",
      "fontWeight": "400",
      "lineHeight": "normal"
    }
  },
  "shape": {
    "borderRadius": 6
  },
  "shadows": [
    "rgba(0, 0, 0, 0.03) 0px 2px 6px 0px",
    "rgba(0, 0, 0, 0.1) 0px 0px 10px 0px",
    "rgba(0, 0, 0, 0.5) 0px 0px 10px 0px",
    "rgba(123, 123, 198, 0.25) 0px 12px 20px 0px, rgba(0, 0, 0, 0.08) 0px 2px 3px 0px",
    "rgba(0, 0, 0, 0.06) 0px -6px 40px 0px"
  ]
};

export default theme;
