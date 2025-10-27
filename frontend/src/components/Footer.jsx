import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-primary-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🌙 MoonGift</h3>
            <p className="text-primary-200 mb-4">Lazer texnologiyasi yordamida yog'och va boshqa materiallarga yuqori sifatli ishlov berish.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Tezkor havolalar</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-primary-200 hover:text-accent-400 transition-colors">Mahsulotlar</Link></li>
              <li><Link to="/about" className="text-primary-200 hover:text-accent-400 transition-colors">Biz haqimizda</Link></li>
              <li><Link to="/contact" className="text-primary-200 hover:text-accent-400 transition-colors">Bog'lanish</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Aloqa</h3>
            <ul className="space-y-2 text-primary-200">
              <li>📞 +998 90 123 45 67</li>
              <li>📍 Toshkent, O'zbekiston</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-800 mt-8 pt-8 text-center text-primary-300">
          <p>&copy; 2025 MoonGift. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
