import React from 'react';

// Define service data structure
interface Service {
  name: string;
  description: string;
  icon?: string; // Optional icon class (e.g., from an icon library)
}

// Service data
const studentServices: Service[] = [
  { name: 'إعداد التقارير الأكاديمية', description: 'تقارير متكاملة ومنظمة حسب المعايير الأكاديمية.' },
  { name: 'إعداد بحوث التخرج', description: 'مساعدة شاملة في إعداد بحوث التخرج من الألف إلى الياء.' },
  { name: 'تصميم عروض تقديمية احترافية (PowerPoint)', description: 'عروض تقديمية جذابة وفعالة للمشاريع والمناقشات.' },
  { name: 'تصميم نماذج Excel مخصصة', description: 'نماذج Excel متقدمة لتنظيم البيانات وتحليلها.' },
  { name: 'تصميم شعارات ولوغو', description: 'تصميم شعارات فريدة تعبر عن هويتك أو مشروعك.' },
  { name: 'تصميم هوية بصرية كاملة', description: 'هوية بصرية متكاملة تشمل الشعار والألوان والخطوط.' },
  { name: 'كتابة ملازم علمية وتحويلها إلى PDF', description: 'تنظيم وكتابة الملازم العلمية بجودة عالية.' },
  { name: 'تحويل المحاضرات إلى كتب بصيغة PDF', description: 'تحويل محتوى المحاضرات إلى كتب إلكترونية منسقة.' },
];

const professorServices: Service[] = [
  { name: 'تصميم نماذج أسئلة اختبارات جاهزة للطباعة (PDF)', description: 'نماذج اختبارات احترافية ومنظمة وجاهزة للاستخدام.' },
  { name: 'تحويل الامتحانات الورقية إلى Google Forms', description: 'تحويل الامتحانات لنسخ رقمية تفاعلية مع تصحيح تلقائي.' },
  { name: 'تصميم عروض تقديمية (PowerPoint) للمحاضرات والندوات', description: 'عروض تقديمية مميزة للمحتوى الأكاديمي والمهني.' },
  { name: 'تفريغ وكتابة محتوى المحاضرات وإرسالها بصيغة PDF', description: 'تفريغ دقيق للمحاضرات الصوتية أو المرئية وتحويلها لنص.' },
];

// Service Card Component (Keep as separate component for clarity)
const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
    {/* Placeholder for icon - replace with actual icons later if available */}
    <div className="w-12 h-12 bg-navy-blue text-gold rounded-full flex items-center justify-center mb-4">
      {/* Example: FontAwesome icon (requires setup) */}
      {/* <i className={`fas ${service.icon || 'fa-tools'} text-2xl`}></i> */}
      <span className="text-2xl">📄</span> {/* Default emoji icon */}
    </div>
    <h3 className="text-xl font-bold text-navy-blue mb-2 font-heading">{service.name}</h3>
    <p className="text-gray-600 text-sm font-sans flex-grow">{service.description}</p>
  </div>
);

// Define the page component using function keyword for default export
export default function ServicesPage() {
  return (
    <div className="py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-navy-blue mb-12 font-heading">خدماتنا</h1>

      {/* Student Services Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-navy-blue mb-8 text-center md:text-right font-heading">خدمات للطلبة</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {studentServices.map((service, index) => (
            <ServiceCard key={`student-${index}`} service={service} />
          ))}
        </div>
      </section>

      {/* Professor Services Section */}
      <section>
        <h2 className="text-3xl font-bold text-navy-blue mb-8 text-center md:text-right font-heading">خدمات للأساتذة</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {professorServices.map((service, index) => (
            <ServiceCard key={`prof-${index}`} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
}

