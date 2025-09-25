
import React from 'react';
import { useLanguage } from './LanguageProvider';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">

        {/* Heading at the top */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-Mobile text-gray-900 leading-tight">
            {t('hero.title')}
          </h1>
        </div>

        {/* Two-column layout below heading */}
        <div className="flex flex-col lg:flex-row items-center justify-between ">
          
          {/* Left content: Paragraph, features, CTA */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <p className="text-lg text-gray-700 mb-6">
              {t('hero.desc')}
            </p>

            <div className="  p-6 mb-8 ">
              <h3 className="text-md font-semibold text-gray-800 mb-4">{t('hero.features.title')}</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-left">
                <li>{t('hero.features.1')}</li>
                <li>{t('hero.features.2')}</li>
                <li>{t('hero.features.3')}</li>
                <li>{t('hero.features.4')}</li>
                <li>{t('hero.features.5')}</li>
              </ul>
            </div>

            <div>
              <a
                href="#tools"
                className="inline-block bg-slate-900 hover:bg-blue-700 text-white font-Mobile py-3 px-6 rounded-lg shadow transition duration-200"
              >
                {t('hero.cta')}
              </a>
            </div>
          </div>

          {/* Right content: Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="/aisol.png"
              alt="Hero"
              className="w-72 h-72 md:w-96 md:h-96  hover:shadow-xl  object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

