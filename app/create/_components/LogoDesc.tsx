'use client';

import LookUp from '@/app/_data/Lookup';
import TitleDescription from './TitleDescription';
import { useState } from 'react';
import { IFormData } from '@/app/_types/types';

interface LogoDescProps {
  formData: IFormData;
  onInputChange: (value: string) => void;
}

const LogoDesc = ({ formData, onInputChange }: LogoDescProps) => {
  const [desc, setDesc] = useState(formData?.desc || '');

  const handleInputChange = (value: string) => {
    setDesc(value);
    onInputChange(value);
  };

  return (
    <div className='my-10'>
      <TitleDescription
        title={LookUp.LogoDescTitle}
        description={LookUp.LogoDescDesc}
      ></TitleDescription>

      <textarea
        placeholder={LookUp.LogoDescInputPlaceholder}
        className='mt-5 w-full rounded-lg border p-4'
        value={desc}
        onChange={(e) => handleInputChange(e.target.value)}
      ></textarea>
    </div>
  );
};

export default LogoDesc;
