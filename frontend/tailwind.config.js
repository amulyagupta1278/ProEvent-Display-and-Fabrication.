/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ["Poppins", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
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
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			'marquee-left': {
  				'0%':   { transform: 'translateX(0)' },
  				'100%': { transform: 'translateX(-50%)' },
  			},
  			'marquee-right': {
  				'0%':   { transform: 'translateX(-50%)' },
  				'100%': { transform: 'translateX(0)' },
  			},
  			'slide-up': {
  				'0%':   { transform: 'translateY(100%)', opacity: '0' },
  				'100%': { transform: 'translateY(0)',    opacity: '1' },
  			},
  			'typing-dot': {
  				'0%, 60%, 100%': { transform: 'translateY(0)',    opacity: '0.35' },
  				'30%':           { transform: 'translateY(-5px)', opacity: '1'    },
  			},
  			'message-in': {
  				'0%':   { transform: 'translateX(14px) scale(0.95)', opacity: '0' },
  				'100%': { transform: 'translateX(0) scale(1)',        opacity: '1' },
  			},
  			'badge-pulse': {
  				'0%, 100%': { transform: 'scale(1)'    },
  				'50%':      { transform: 'scale(1.18)' },
  			},
  			'modal-in': {
  				'0%':   { transform: 'scale(0.94) translateY(12px)', opacity: '0' },
  				'100%': { transform: 'scale(1) translateY(0)',        opacity: '1' },
  			},
  		},
  		animation: {
  			'accordion-down':  'accordion-down 0.2s ease-out',
  			'accordion-up':    'accordion-up 0.2s ease-out',
  			'marquee-left':    'marquee-left 28s linear infinite',
  			'marquee-right':   'marquee-right 28s linear infinite',
  			'slide-up':        'slide-up 0.4s cubic-bezier(.22,1,.36,1) forwards',
  			'typing-dot':      'typing-dot 1.2s ease-in-out infinite',
  			'message-in':      'message-in 0.4s cubic-bezier(.22,1,.36,1) forwards',
  			'badge-pulse':     'badge-pulse 2s ease-in-out infinite',
  			'modal-in':        'modal-in 0.35s cubic-bezier(.22,1,.36,1) forwards',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};