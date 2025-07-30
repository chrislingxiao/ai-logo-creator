'use client';

import LookUp from '@/app/_data/Lookup';
import TitleDescription from './TitleDescription';
import { useState } from 'react';
import COLORS from '@/app/_data/Colors';
import { IFormData } from '@/app/_types/types';

interface LogoPaletteProps {
  formData: IFormData;
  onInputChange: (value: string) => void;
}

const LogoPalette = ({ formData, onInputChange }: LogoPaletteProps) => {
  const [selected, setSelected] = useState(formData?.palette || '');

  const handleSelectChange = (value: string) => {
    setSelected(value);
    onInputChange(value);
  };

  return (
    <div className='my-10'>
      <TitleDescription
        title={LookUp.LogoColorPaletteTitle}
        description={LookUp.LogoColorPaletteDesc}
      ></TitleDescription>

      <div className='mt-5 grid grid-cols-2 gap-5 md:grid-cols-3'>
        {COLORS.map((palette, idx) => {
          return (
            <div
              className={`flex cursor-pointer p-1 ${selected === palette.name && 'rounded-lg border-2 border-pink-500'}`}
              key={idx}
            >
              {palette?.colors.map((color, colorIdx) => (
                <div
                  key={`${idx}-${colorIdx}`}
                  className='h-24 w-full cursor-pointer p-3'
                  onClick={() => handleSelectChange(palette.name)}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LogoPalette;
