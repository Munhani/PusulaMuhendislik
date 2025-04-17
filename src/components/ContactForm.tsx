'use client';

import { useState } from 'react';

interface ContactFormProps {
  onSubmit: (formData: any) => Promise<void>;
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string;
}

export default function ContactForm({ onSubmit, status, errorMessage }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getButtonColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-600 hover:bg-green-700';
      case 'error':
        return 'bg-red-600 hover:bg-red-700';
      case 'loading':
        return 'bg-blue-600 hover:bg-blue-700';
      default:
        return 'bg-blue-900 hover:bg-blue-800';
    }
  };

  const getButtonText = () => {
    switch (status) {
      case 'success':
        return 'Gönderildi!';
      case 'error':
        return 'Hata!';
      case 'loading':
        return 'Gönderiliyor...';
      default:
        return 'Gönder';
    }
  };

  return (
    <div className="relative">
      {status === 'success' && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <strong className="font-bold">Başarılı!</strong>
          <span className="block sm:inline"> Mesajınız başarıyla gönderildi.</span>
          <a href="http://localhost:5555" target="_blank" rel="noopener noreferrer" className="block mt-2 text-green-600 hover:text-green-800">
            Gönderilen mesajları görüntüle
          </a>
        </div>
      )}

      {status === 'error' && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Hata!</strong>
          <span className="block sm:inline"> {errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Adınız Soyadınız
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            E-posta Adresiniz
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefon Numaranız
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Konu
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Mesajınız
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className={`w-full text-white px-6 py-3 rounded-lg transition-colors ${getButtonColor()}`}
        >
          {getButtonText()}
        </button>
      </form>
    </div>
  );
} 