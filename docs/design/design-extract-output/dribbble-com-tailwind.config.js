/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(243, 48%, 97%)',
            '100': 'hsl(243, 48%, 94%)',
            '200': 'hsl(243, 48%, 86%)',
            '300': 'hsl(243, 48%, 76%)',
            '400': 'hsl(243, 48%, 64%)',
            '500': 'hsl(243, 48%, 50%)',
            '600': 'hsl(243, 48%, 40%)',
            '700': 'hsl(243, 48%, 32%)',
            '800': 'hsl(243, 48%, 24%)',
            '900': 'hsl(243, 48%, 16%)',
            '950': 'hsl(243, 48%, 10%)',
            DEFAULT: '#0d0c22'
        },
        secondary: {
            '50': 'hsl(337, 79%, 97%)',
            '100': 'hsl(337, 79%, 94%)',
            '200': 'hsl(337, 79%, 86%)',
            '300': 'hsl(337, 79%, 76%)',
            '400': 'hsl(337, 79%, 64%)',
            '500': 'hsl(337, 79%, 50%)',
            '600': 'hsl(337, 79%, 40%)',
            '700': 'hsl(337, 79%, 32%)',
            '800': 'hsl(337, 79%, 24%)',
            '900': 'hsl(337, 79%, 16%)',
            '950': 'hsl(337, 79%, 10%)',
            DEFAULT: '#ea4c89'
        },
        accent: {
            '50': 'hsl(240, 14%, 97%)',
            '100': 'hsl(240, 14%, 94%)',
            '200': 'hsl(240, 14%, 86%)',
            '300': 'hsl(240, 14%, 76%)',
            '400': 'hsl(240, 14%, 64%)',
            '500': 'hsl(240, 14%, 50%)',
            '600': 'hsl(240, 14%, 40%)',
            '700': 'hsl(240, 14%, 32%)',
            '800': 'hsl(240, 14%, 24%)',
            '900': 'hsl(240, 14%, 16%)',
            '950': 'hsl(240, 14%, 10%)',
            DEFAULT: '#f3f3f6'
        },
        'neutral-50': '#000000',
        'neutral-100': '#060318',
        'neutral-200': '#ffffff',
        'neutral-300': '#6e6d7a',
        'neutral-400': '#655c7a',
        'neutral-500': '#9e9ea7',
        'neutral-600': '#e7e7e9',
        'neutral-700': '#524b63',
        'neutral-800': '#262627',
        'neutral-900': '#dbdbde',
        background: '#ffffff',
        foreground: '#000000'
    },
    fontFamily: {
        sans: [
            'Mona Sans',
            'sans-serif'
        ],
        body: [
            'Times',
            'sans-serif'
        ],
        font2: [
            'Arial',
            'sans-serif'
        ]
    },
    fontSize: {
        '8': [
            '8px',
            {
                lineHeight: '8px'
            }
        ],
        '10': [
            '10px',
            {
                lineHeight: '10px'
            }
        ],
        '11': [
            '11px',
            {
                lineHeight: '11px'
            }
        ],
        '12': [
            '12px',
            {
                lineHeight: '12px'
            }
        ],
        '13': [
            '13px',
            {
                lineHeight: '13px'
            }
        ],
        '14': [
            '14px',
            {
                lineHeight: '28px'
            }
        ],
        '15': [
            '15px',
            {
                lineHeight: '21px'
            }
        ],
        '16': [
            '16px',
            {
                lineHeight: 'normal'
            }
        ],
        '20': [
            '20px',
            {
                lineHeight: '32px'
            }
        ],
        '24': [
            '24px',
            {
                lineHeight: '29px'
            }
        ],
        '13.3333': [
            '13.3333px',
            {
                lineHeight: 'normal'
            }
        ]
    },
    spacing: {
        '2': '4px',
        '12': '24px',
        '15': '30px',
        '18': '36px',
        '20': '40px',
        '25': '50px',
        '28': '56px',
        '30': '60px',
        '32': '64px',
        '35': '70px',
        '40': '80px',
        '60': '120px',
        '130': '260px',
        '1px': '1px'
    },
    borderRadius: {
        sm: '3px',
        md: '10px',
        lg: '16px',
        full: '50px'
    },
    boxShadow: {
        sm: 'rgba(0, 0, 0, 0.03) 0px 2px 6px 0px',
        md: 'rgba(0, 0, 0, 0.5) 0px 0px 10px 0px',
        lg: 'rgba(123, 123, 198, 0.25) 0px 12px 20px 0px, rgba(0, 0, 0, 0.08) 0px 2px 3px 0px',
        xl: 'rgba(27, 32, 50, 0.1) 0px 15px 50px 0px'
    },
    screens: {
        '400px': '400px',
        sm: '500px',
        md: '801px',
        '905px': '905px',
        '920px': '920px',
        '921px': '921px',
        lg: '1010px',
        '1200px': '1200px',
        '1205px': '1205px',
        xl: '1240px',
        '1350px': '1350px',
        '1445px': '1445px',
        '2xl': '1600px',
        '1800px': '1800px',
        '1921px': '1921px'
    },
    transitionDuration: {
        '50': '0.05s',
        '70': '0.07s',
        '100': '0.1s',
        '150': '0.15s',
        '200': '0.2s',
        '250': '0.25s',
        '300': '0.3s',
        '400': '0.4s',
        '450': '0.45s',
        '500': '0.5s',
        '600': '0.6s',
        '650': '0.65s'
    },
    transitionTimingFunction: {
        custom: 'cubic-bezier(0.87, 0, 0.13, 1)',
        default: 'ease',
        linear: 'linear'
    },
    container: {
        center: true,
        padding: '0px'
    },
    maxWidth: {
        container: '1172px'
    }
},
  },
};
