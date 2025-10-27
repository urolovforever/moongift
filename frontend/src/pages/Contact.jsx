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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-primary-600 mb-8">Bog'lanish</h1>
      <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-accent-500">
        {success && <div className="bg-green-100 p-4 rounded mb-4">Xabar yuborildi!</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input type="text" placeholder="Ism" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent" />
          </div>
          <div className="mb-4">
            <input type="tel" placeholder="Telefon raqam" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent" />
          </div>
          <div className="mb-4">
            <textarea placeholder="Xabar" required rows="5" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"></textarea>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-accent-500 text-white py-3 rounded-lg hover:bg-accent-600 transition-colors font-semibold shadow-md">
            {loading ? 'Yuborilmoqda...' : 'Yuborish'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
