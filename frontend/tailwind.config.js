export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // 🔵 ASOSIY RANG - Ko'k (ishonch)
        // Buyurtma berish tugmasi, linklar, header aktiv elementlar
        primary: {
          DEFAULT: '#1E5AFF',
          50: '#eff5ff',
          100: '#dbe8fe',
          200: '#bfd6fe',
          300: '#93bbfd',
          400: '#6099fa',
          500: '#3d7bf6',
          600: '#1E5AFF', // Main Blue
          700: '#1a4dd9',
          800: '#1c43af',
          900: '#1d3a8a',
        },
        // 🔴 URG'U BERUVCHI RANG - Qizil (sevgi, sovg'a, hissiyot)
        // Aksiya, Chegirma, button hover, e'tibor tortish
        accent: {
          DEFAULT: '#FF3B3F',
          50: '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff6b6b',
          500: '#FF3B3F', // Main Red
          600: '#f71d21',
          700: '#d01317',
          800: '#ab1316',
          900: '#8d1619',
        },
        // 🔵 YUMSHOQ KO'K (orqa elementlar va yordamchi)
        // Card hover fon, secondary tugmalar ("Batafsil")
        secondary: {
          DEFAULT: '#6CA9FF',
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
        // FON RANGLARI
        'bg-main': '#FFFFFF', // Asosiy oq fon
        'bg-secondary': '#F4F6FA', // Sektsiyalarni ajratish uchun

        // MATN RANGLARI
        'text-main': '#111111', // Asosiy matn (deyarli qora)
        'text-secondary': '#555555', // Tavsif va holat matnlari
        'text-tertiary': '#888888', // Eng past ahamiyatli yozuvlar

        // CHEGARA VA SOYALAR
        'border-main': '#E1E1E1', // Chegara rangi
      },
      boxShadow: {
        'premium': '0 2px 12px rgba(0, 0, 0, 0.06)', // Premium effekt
        'premium-lg': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'premium-hover': '0 6px 24px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'button': '10px', // Tugmalar uchun
      },
    },
  },
  plugins: [],
}
