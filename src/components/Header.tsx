
'use client'; // Needed for useState, usePathname hooks

import React, { useState } from 'react'; // Import useState
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react'; // Import icons for menu toggle

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/services', label: 'الخدمات' },
    { href: '/request-service', label: 'اطلب خدمة' },
    { href: '/about', label: 'من نحن' },
    { href: '/contact', label: 'تواصل معنا' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-navy-blue text-white shadow-md sticky top-0 z-50 font-heading">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center" onClick={handleLinkClick}>
          <Image 
            src="/assets/logo_white.png" 
            alt="ركن المهندس" 
            width={100} 
            height={48} 
            className="h-12 w-auto mr-3 rtl:ml-3 rtl:mr-0" 
            priority 
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive ? "text-gold bg-white bg-opacity-10" : "hover:text-gold hover:bg-white hover:bg-opacity-5"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu} 
            className="text-white focus:outline-none p-2 rounded-md hover:bg-white hover:bg-opacity-10"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu (conditionally rendered) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-navy-blue shadow-lg py-2">
          {navLinks.map((link) => {
             const isActive = pathname === link.href;
             return (
               <Link 
                 key={link.href} 
                 href={link.href} 
                 className={`block py-2 px-6 text-sm transition-colors duration-200 ${isActive ? "text-gold bg-white bg-opacity-10" : "hover:text-gold hover:bg-white hover:bg-opacity-5"}`}
                 onClick={handleLinkClick} // Close menu on link click
               >
                 {link.label}
               </Link>
             );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;

