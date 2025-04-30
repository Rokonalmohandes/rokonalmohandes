import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Use Next.js Image component

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-blue text-white mt-12 py-8 font-sans">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          {/* About/Logo */}
          <div className="flex flex-col items-center md:items-start">
            <Image 
              src="/assets/logo_white.png" 
              alt="ركن المهندس" 
              width={128} // Provide appropriate width
              height={64}  // Provide appropriate height
              className="h-16 w-auto mb-4" // Keep existing height/width styling if needed
            />
            <p className="text-sm text-gray-400">
              متخصصون في تقديم حلول أكاديمية واحترافية عالية الجودة للطلبة والأساتذة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gold mb-4 font-heading">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="hover:text-gold">الخدمات</Link></li>
              <li><Link href="/request-service" className="hover:text-gold">اطلب خدمة</Link></li>
              <li><Link href="/about" className="hover:text-gold">من نحن</Link></li>
              <li><Link href="/contact" className="hover:text-gold">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gold mb-4 font-heading">معلومات التواصل</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:info.roknalmohandes@gmail.com" className="hover:text-gold">info.roknalmohandes@gmail.com</a></li>
              <li><a href="tel:+9647817202969" className="hover:text-gold">+964 781 720 2969</a></li>
              <li><a href="https://t.me/soyer_mf" target="_blank" rel="noopener noreferrer" className="hover:text-gold">Telegram: @soyer_mf</a></li>
              <li><a href="https://instagram.com/rokon.almohandes" target="_blank" rel="noopener noreferrer" className="hover:text-gold">Instagram: @rokon.almohandes</a></li>
              <li className="pt-2">ساعات العمل: 24/7</li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-6" />

        <div className="text-center text-gray-500 text-sm">
          &copy; {currentYear} ركن المهندس. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

