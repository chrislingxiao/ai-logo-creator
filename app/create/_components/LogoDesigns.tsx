'use client';

import LookUp from '@/app/_data/Lookup';
import TitleDescription from './TitleDescription';
import { useState } from 'react';
import LOGO_DESIGNS from '@/app/_data/LogoDesigns';
import Image from 'next/image';
import { IFormData, ILogoDesign } from '@/app/_types/types';

interface LogoDesignsProps {
  formData: IFormData;
  onInputChange: (design: ILogoDesign) => void;
}

const LogoDesigns = ({ formData, onInputChange }: LogoDesignsProps) => {
  const [selectedDesign, setSelectedDesign] = useState(
    formData?.design?.title || ''
  );

  const handleSelectChange = (design: ILogoDesign) => {
    setSelectedDesign(design.title);
    onInputChange(design);
  };

  return (
    <div className='my-10'>
      <TitleDescription
        title={LookUp.LogoDesignTitle}
        description={LookUp.LogoDesignDesc}
      ></TitleDescription>

      <div className='mt-10 grid grid-cols-2 gap-10 md:grid-cols-3'>
        {LOGO_DESIGNS.map((design, idx) => {
          return (
            <div
              className={`flex cursor-pointer rounded-xl border-pink-500 p-1 hover:border-2 ${selectedDesign === design.title && 'rounded-xl border-2 border-pink-500'}`}
              key={idx}
              onClick={() => handleSelectChange(design)}
            >
              <Image
                src={design.image}
                alt={design.title}
                width={300}
                height={200}
                className='h-[200px] w-full rounded-xl object-cover'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LogoDesigns;
