
'use client'; // Required for useState and event handlers

import React, { useState, ChangeEvent, FormEvent } from 'react';

// Re-using service lists (or import from a shared location)
const studentServices = [
  'إعداد التقارير الأكاديمية',
  'إعداد بحوث التخرج',
  'تصميم عروض تقديمية احترافية (PowerPoint)',
  'تصميم نماذج Excel مخصصة حسب الطلب',
  'تصميم شعارات ولوغو',
  'تصميم هوية بصرية كاملة',
  'كتابة ملازم علمية وتحويلها إلى ملفات PDF',
  'تحويل المحاضرات إلى كتب بصيغة PDF',
];

const professorServices = [
  'تصميم نماذج أسئلة اختبارات جاهزة للطباعة (PDF)',
  'تحويل الامتحانات الورقية إلى Google Forms للتوزيع والتصحيح التلقائي',
  'تصميم عروض تقديمية (PowerPoint) للمحاضرات والندوات',
  'تفريغ وكتابة محتوى المحاضرات وإرسالها بصيغة PDF',
];

const allServices = [...studentServices, ...professorServices];

// Define the component using function keyword for default export in Next.js pages
export default function RequestServicePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    contactMethod: 'Telegram', // Default value
    contactId: '',
    serviceType: allServices[0], // Default to the first service
    serviceDetails: '',
    deliveryDate: '', // Added delivery date field
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

    // Basic validation (deliveryDate is optional)
    if (!formData.fullName || !formData.contactId || !formData.serviceDetails) {
        setSubmitMessage('يرجى ملء جميع الحقول المطلوبة.');
        setIsSubmitting(false);
        return;
    }

    console.log('Form Data to be sent:', formData);
    try {
      const response = await fetch("/api/request-service", {
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

      setSubmitMessage('تم استلام طلبك بنجاح! سنتواصل معك قريباً.');
      // Optionally clear the form
      // setFormData({ fullName: '', contactMethod: 'Telegram', contactId: '', serviceType: allServices[0], serviceDetails: '', deliveryDate: '' });
      // setContactLabel('معرف Telegram');
    } catch (error) {
      console.error('Failed to submit form:', error);
      setSubmitMessage('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 px-4 max-w-3xl mx-auto font-sans">
      <h1 className="text-4xl font-bold text-center text-navy-blue mb-10 font-heading">اطلب خدمة</h1>
      <p className="text-center text-gray-600 mb-10">
        يرجى ملء النموذج التالي لطلب إحدى خدماتنا. سنقوم بمراجعة طلبك والتواصل معك في أقرب وقت ممكن.
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

        {/* Service Type */}
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">نوع الخدمة المطلوبة <span className="text-red-500">*</span></label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-navy-blue focus:border-navy-blue bg-white"
          >
            <optgroup label="خدمات للطلبة">
              {studentServices.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </optgroup>
            <optgroup label="خدمات للأساتذة">
              {professorServices.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Service Details */}
        <div>
          <label htmlFor="serviceDetails" className="block text-sm font-medium text-gray-700 mb-1">تفاصيل الخدمة <span className="text-red-500">*</span></label>
          <textarea
            id="serviceDetails"
            name="serviceDetails"
            rows={5}
            value={formData.serviceDetails}
            onChange={handleInputChange}
            required
            placeholder="يرجى وصف الخدمة المطلوبة بالتفصيل، مثل الموضوع، عدد الصفحات، الموعد النهائي، وأي متطلبات أخرى..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-navy-blue focus:border-navy-blue"
          ></textarea>
        </div>

        {/* Delivery Date (Optional) */}
        <div>
          <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-1">تاريخ التسليم المطلوب (إن وجد)</label>
          <input
            type="date"
            id="deliveryDate"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-navy-blue focus:border-navy-blue"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-navy-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-300 shadow-md disabled:opacity-50 font-heading"
          >
            {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
          </button>
        </div>

        {/* Submission Message */}
        {submitMessage && (
          <p className={`text-center mt-4 ${submitMessage.includes('بنجاح') ? 'text-green-600' : 'text-red-600'}`}>
            {submitMessage}
          </p>
        )}
      </form>
    </div>
  );
}

