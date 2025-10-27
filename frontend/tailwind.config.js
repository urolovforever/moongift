export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Royal Blue - Primary (asosiy tugmalar, linklar, header)
        primary: {
          50: '#eff5ff',
          100: '#dbe8fe',
          200: '#bfd6fe',
          300: '#93bbfd',
          400: '#6099fa',
          500: '#3d7bf6',
          600: '#1E5AFF', // Main Royal Blue
          700: '#1a4dd9',
          800: '#1c43af',
          900: '#1d3a8a',
        },
        // Bright Red - Accent (buyurtma berish, aksiya)
        accent: {
          50: '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff6b6b',
          500: '#FF3B3F', // Main Bright Red
          600: '#f71d21',
          700: '#d01317',
          800: '#ab1316',
          900: '#8d1619',
        },
        // Soft Blue - Secondary (batafsil tugmalar, hover fonlari)
        secondary: {
          50: '#f0f8ff',
          100: '#e0f0fe',
          200: '#b9e1fe',
          300: '#6CA9FF', // Main Soft Blue
          400: '#4a97ff',
          500: '#2181ff',
          600: '#0a6aff',
          700: '#0256e3',
          800: '#0747b7',
          900: '#0c3e8f',
        },
        // Keep wood for backward compatibility if needed
        wood: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#1e3a8a',
          900: '#1e293b',
        },
      },
    },
  },
  plugins: [],
}
