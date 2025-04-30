
'use client'; // Required for useState and event handlers

import React, { useState, ChangeEvent, FormEvent } from 'react';

// Define the component using function keyword for default export in Next.js pages
export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    contactMethod: 'Telegram', // Default value
    contactId: '',
    message: '',
  });
  const [contactLabel, setContactLabel] = useState('معرف Telegram');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'contactMethod') {
      switch (value) {
        case 'Telegram':
          setContactLabel('معرف Telegram');
          break;
        case 'WhatsApp':
          setContactLabel('رقم WhatsApp');
          break;
        case 'Instagram':
          setContactLabel('معرف Instagram');
          break;
        default:
          setContactLabel('المعرف أو الرقم');
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Basic validation
    if (!formData.fullName || !formData.contactId || !formData.message) {
        setSubmitMessage('يرجى ملء جميع الحقول المطلوبة.');
        setIsSubmitting(false);
        return;
    }

    console.log('Contact Form Data to be sent:', formData);
    // TODO: Replace console.log and simulation with fetch call to API route in step 010
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || `HTTP error! status: ${response.status}`);
      }

      setSubmitMessage('تم استلام رسالتك بنجاح! سنتواصل معك قريباً.');
      // Optionally clear the form
      // setFormData({ fullName: '', contactMethod: 'Telegram', contactId: '', message: '' });
      // setContactLabel('معرف Telegram');
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      setSubmitMessage('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 px-4 max-w-3xl mx-auto font-sans">
      <h1 className="text-4xl font-bold text-center text-navy-blue mb-10 font-heading">تواصل معنا</h1>
      <p className="text-center text-gray-600 mb-10">
        هل لديك استفسار أو اقتراح؟ يرجى ملء النموذج أدناه أو استخدام معلومات التواصل المباشرة في أسفل الصفحة.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md border border-gray-200">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-navy-blue focus:border-navy-blue"
          />
        </div>

        {/* Contact Method */}
        <div>
          <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700 mb-1">وسيلة التواصل المفضلة <span className="text-red-500">*</span></label>
          <select
            id="contactMethod"
            name="contactMethod"
            value={formData.contactMethod}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-navy-blue focus:border-navy-blue bg-white"
          >
            <option value="Telegram">Telegram</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Instagram">Instagram</option>
          </select>
        </div>

        {/* Contact ID/Phone */}
        <div>
          <label htmlFor="contactId" className="block text-sm font-medium text-gray-700 mb-1">{contactLabel} <span className="text-red-500">*</span></label>
          <input
            type={formData.contactMethod === 'WhatsApp' ? 'tel' : 'text'} // Use 'tel' for WhatsApp
            id="contactId"
            name="contactId"
            value={formData.contactId}
            onChange={handleInputChange}
            required
            placeholder={formData.contactMethod === 'WhatsApp' ? '+964xxxxxxxxx' : '@username'}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-navy-blue focus:border-navy-blue ltr-input" // Added ltr-input for potential styling
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">نص الرسالة <span className="text-red-500">*</span></label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            required
            placeholder="اكتب رسالتك هنا..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-navy-blue focus:border-navy-blue"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-navy-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-300 shadow-md disabled:opacity-50 font-heading"
          >
            {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
          </button>
        </div>

        {/* Submission Message */}
        {submitMessage && (
          <p className={`text-center mt-4 ${submitMessage.includes('بنجاح') ? 'text-green-600' : 'text-red-600'}`}>
            {submitMessage}
          </p>
        )}
      </form>

       {/* Direct Contact Info (Optional addition to this page) */}
       <div className="mt-12 text-center text-gray-600">
         <h3 className="text-xl font-bold text-navy-blue mb-4 font-heading">أو تواصل معنا مباشرة</h3>
         <p>البريد الإلكتروني: <a href="mailto:info.roknalmohandes@gmail.com" className="text-navy-blue hover:text-gold">info.roknalmohandes@gmail.com</a></p>
         <p>الهاتف / WhatsApp: <a href="tel:+9647817202969" className="text-navy-blue hover:text-gold">+964 781 720 2969</a></p>
         <p>Telegram: <a href="https://t.me/soyer_mf" target="_blank" rel="noopener noreferrer" className="text-navy-blue hover:text-gold">@soyer_mf</a></p>
         <p>Instagram: <a href="https://instagram.com/rokon.almohandes" target="_blank" rel="noopener noreferrer" className="text-navy-blue hover:text-gold">@rokon.almohandes</a></p>
       </div>
    </div>
  );
}

