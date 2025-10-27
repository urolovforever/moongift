import { useState } from 'react';
import { sendContactMessage } from '../api/api';

function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendContactMessage(formData);
      setSuccess(true);
      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      console.error('Xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-light py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-text-primary mb-4">Bog'lanish</h1>
          <p className="text-xl text-text-secondary">Biz bilan bog'laning va savollaringizga javob oling</p>
        </div>
        <div className="bg-white rounded-button shadow-soft-lg p-10 border-t-4 border-accent">
          {success && (
            <div className="bg-green-50 border-2 border-green-500 text-green-700 p-5 rounded-button mb-6 font-semibold text-center">
              ✓ Xabar muvaffaqiyatli yuborildi!
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-text-primary font-semibold mb-2">Ismingiz</label>
              <input
                type="text"
                placeholder="Ismingizni kiriting"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-5 py-3 border-2 border-border rounded-button focus:ring-2 focus:ring-primary focus:border-primary transition-all text-text-primary"
              />
            </div>
            <div className="mb-6">
              <label className="block text-text-primary font-semibold mb-2">Telefon raqamingiz</label>
              <input
                type="tel"
                placeholder="+998 90 123 45 67"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-5 py-3 border-2 border-border rounded-button focus:ring-2 focus:ring-primary focus:border-primary transition-all text-text-primary"
              />
            </div>
            <div className="mb-6">
              <label className="block text-text-primary font-semibold mb-2">Xabaringiz</label>
              <textarea
                placeholder="Xabaringizni yozing..."
                required
                rows="6"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-5 py-3 border-2 border-border rounded-button focus:ring-2 focus:ring-primary focus:border-primary transition-all text-text-primary resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-button hover:bg-primary-700 transition-colors font-semibold text-lg shadow-soft-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Yuborilmoqda...' : 'Xabar yuborish'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
