import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-primary text-white mt-24 shadow-premium-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-3xl font-bold mb-4">🌙 MoonGift</h3>
            <p className="text-white/90 text-base leading-relaxed">
              Lazer texnologiyasi yordamida yog'och va boshqa materiallarga yuqori sifatli ishlov berish.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-5">Tezkor havolalar</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-white/90 hover:text-accent transition-colors font-semibold text-base">
                  → Mahsulotlar
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/90 hover:text-accent transition-colors font-semibold text-base">
                  → Biz haqimizda
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/90 hover:text-accent transition-colors font-semibold text-base">
                  → Bog'lanish
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-5">Aloqa</h3>
            <ul className="space-y-3 text-white/90 text-base">
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <span className="font-semibold">+998 90 123 45 67</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                <span className="font-semibold">Toshkent, O'zbekiston</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t-2 border-primary-700 mt-12 pt-8 text-center">
          <p className="text-white/80 font-medium">&copy; 2025 MoonGift. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
