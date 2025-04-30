import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

// Define the component using function keyword for default export in Next.js pages
export default function AboutUsPage() {
  return (
    <div className="py-12 px-4 font-sans">
      <h1 className="text-4xl font-bold text-center text-navy-blue mb-10 font-heading">من نحن</h1>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Text Content */}
        <div className="md:w-2/3 text-center md:text-right">
          <h2 className="text-2xl font-bold text-navy-blue mb-4 font-heading">ركن المهندس: شريكك الأكاديمي والاحترافي</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            يهدف مشروع "ركن المهندس" إلى تقديم حلول أكاديمية واحترافية عالية الجودة، مصممة خصيصًا لتلبية احتياجات وتطلعات الطلاب والأساتذة في مختلف المجالات. نحن نؤمن بأهمية الدعم الأكاديمي والمهني المتميز، ونسعى لنكون الشريك الموثوق الذي يساعدك على تحقيق أهدافك بكفاءة وفعالية.
          </p>
          <p className="text-gray-700 leading-relaxed">
            نحن نخدم شريحة واسعة من الطلاب والأساتذة، مع التركيز بشكل خاص على الدقة في العمل وسرعة الإنجاز. سواء كنت طالبًا تحتاج إلى مساعدة في إعداد تقرير أو بحث تخرج، أو أستاذًا تبحث عن تصميم احترافي لمحتواك الأكاديمي، فإن "ركن المهندس" هو وجهتك المثالية للحصول على خدمات موثوقة تلبي توقعاتك وتتجاوزها.
          </p>
        </div>

        {/* Image */}
        <div className="md:w-1/3 mt-6 md:mt-0 flex justify-center">
          {/* Use Next.js Image component */}
          <Image
            src="/assets/about_us_image.jpg" // Path relative to the public folder
            alt="فريق ركن المهندس"
            width={400} // Provide an appropriate width (adjust as needed)
            height={400} // Provide an appropriate height (adjust as needed)
            className="rounded-lg shadow-lg max-w-full h-auto object-cover"
            style={{ maxHeight: '400px' }} // Keep style if needed, but width/height props are important
          />
        </div>
      </div>
    </div>
  );
}

