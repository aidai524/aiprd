import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

const config: Config = {
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	typography: {
  		DEFAULT: {
  			css: {
  				fontSize: '0.8em',
  				lineHeight: '1.5',
  				p: {
  					marginTop: '0.75em',
  					marginBottom: '0.75em',
  				},
  				h1: {
  					fontSize: '1.5em',
  				},
  				h2: {
  					fontSize: '1.3em',
  				},
  				h3: {
  					fontSize: '1.1em',
  				},
  				'code::before': {
  					content: '""',
  				},
  				'code::after': {
  					content: '""',
  				},
  			},
  		},
  		sm: {
  			css: {
  				fontSize: '0.7em',
  				lineHeight: '1.5',
  				p: {
  					marginTop: '0.75em',
  					marginBottom: '0.75em',
  				},
  				h1: {
  					fontSize: '1.5em',
  				},
  				h2: {
  					fontSize: '1.3em',
  				},
  				h3: {
  					fontSize: '1.1em',
  				},
  				'code::before': {
  					content: '""',
  				},
  				'code::after': {
  					content: '""',
  				},
  			},
  		},
  		lg: {
  			css: {
  				fontSize: '0.9em',
  				lineHeight: '1.5',
  				p: {
  					marginTop: '0.75em',
  					marginBottom: '0.75em',
  				},
  				h1: {
  					fontSize: '1.5em',
  				},
  				h2: {
  					fontSize: '1.3em',
  				},
  				h3: {
  					fontSize: '1.1em',
  				},
  				'code::before': {
  					content: '""',
  				},
  				'code::after': {
  					content: '""',
  				},
  			},
  		},
  		xl: {
  			css: {
  				fontSize: '1em',
  				lineHeight: '1.5',
  				p: {
  					marginTop: '0.75em',
  					marginBottom: '0.75em',
  				},
  				h1: {
  					fontSize: '1.5em',
  				},
  				h2: {
  					fontSize: '1.3em',
  				},
  				h3: {
  					fontSize: '1.1em',
  				},
  				'code::before': {
  					content: '""',
  				},
  				'code::after': {
  					content: '""',
  				},
  			},
  		},
  	},
  },
  plugins: [
    typography,
    require("tailwindcss-animate")
  ],
};
export default config;
