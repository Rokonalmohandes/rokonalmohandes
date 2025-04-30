import React from 'react';
import Link from 'next/link'; // Use Next.js Link
import Image from 'next/image'; // Use Next.js Image

// Define the component using function keyword for default export in Next.js pages
export default function HomePage() {
  return (
    <div className="text-center py-16 px-4 font-sans">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-navy-blue mb-4 font-heading">مرحباً بك في ركن المهندس</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          وجهتك الأولى للحصول على خدمات أكاديمية واحترافية متميزة مصممة خصيصاً لتلبية احتياجات الطلبة والأساتذة بأعلى معايير الجودة والدقة.
        </p>
        {/* Use Next.js Image component */}
        <Image 
          src="/assets/logo_main.jpg" 
          alt="شعار ركن المهندس" 
          width={192} // w-48 is 12rem = 192px
          height={192} // Assuming square aspect ratio based on class, adjust if needed
          className="w-48 h-auto mx-auto mb-8" // Keep Tailwind classes for styling
          priority
        />
      </section>

      {/* Services Overview */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-navy-blue mb-6 font-heading">خدماتنا</h2>
        <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
          نقدم مجموعة واسعة من الخدمات تشمل إعداد التقارير والبحوث، تصميم العروض التقديمية والنماذج، تصميم الشعارات والهويات البصرية، وكتابة وتحويل المحتوى الأكاديمي والرقمي، بالإضافة إلى خدمات متخصصة للأساتذة.
        </p>
        {/* Optional: Add a few icons or small images representing services */}
      </section>

      {/* Quick Navigation Buttons */}
      <section>
        <h3 className="text-2xl font-bold text-navy-blue mb-6 font-heading">اكتشف المزيد</h3>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 rtl:md:space-x-reverse">
          <Link
            href="/services" // Changed 'to' to 'href'
            className="bg-navy-blue text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition duration-300 shadow-md font-heading"
          >
            عرض الخدمات
          </Link>
          <Link
            href="/request-service" // Changed 'to' to 'href'
            className="bg-gold text-navy-blue font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition duration-300 shadow-md font-heading"
          >
            اطلب خدمة الآن
          </Link>
          <Link
            href="/contact" // Changed 'to' to 'href'
            className="border border-navy-blue text-navy-blue font-bold py-3 px-8 rounded-lg hover:bg-navy-blue hover:text-white transition duration-300 shadow-md font-heading"
          >
            تواصل معنا
          </Link>
        </div>
      </section>
    </div>
  );
}

