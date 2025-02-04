/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}', // Incluye todos los archivos en la carpeta src
    './public/index.html', // Incluye el archivo HTML principal
  ],
  theme: {
    extend: {
      colors: {
      
        
        gray: {
          300: '#D9D9D9',
        },
        sky: {
          500: '#0284c7',
      },
      red: {
        500: '#ff0000',
      },
      Teal:{
        600:'#0d9488'

      },
      Gray:{
        200:'#e2e8f0'
      },
    },
  },
  plugins: [],
  }  
}