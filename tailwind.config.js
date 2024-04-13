/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'small-phones': '300px',
      'miniphones': '335px',
      'phones': '550px',
      'large': '900px',
    },
    fontFamily: {
      body: ["Jacquard"]
    },
    extend: {
      scale: {
        '120': '1.2',
      }
    }
  },
  plugins: [],
}

