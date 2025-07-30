'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  LogoTitle,
  LogoDesc,
  LogoDesigns,
  LogoPalette,
  LogoIdea,
  LogoDone,
} from './_components';
import { ILogoDesign, IFormData, IPriceOption } from '../_types/types';
import PriceModel from './_components/PriceModel';

const CreateLogo = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<IFormData>({
    title: '',
    desc: '',
    palette: '',
    design: {} as ILogoDesign,
    idea: '',
    price: {} as IPriceOption,
  });

  const handleInputChange = (
    field: string,
    value: string | ILogoDesign | IPriceOption
  ) => {
    // Handle the input change logic here
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    setStep(1);

    return () => {
      // Cleanup if necessary
      setFormData({} as IFormData);
      setStep(1);
    };
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <LogoTitle
            formData={formData}
            onInputChange={(val) => handleInputChange('title', val)}
          />
        );
      case 2:
        return (
          <LogoDesc
            formData={formData}
            onInputChange={(val) => handleInputChange('desc', val)}
          />
        );
      case 3:
        return (
          <LogoPalette
            formData={formData}
            onInputChange={(val) => handleInputChange('palette', val)}
          />
        );
      case 4:
        return (
          <LogoDesigns
            formData={formData}
            onInputChange={(val) => handleInputChange('design', val)}
          />
        );
      case 5:
        return (
          <LogoIdea
            formData={formData}
            onInputChange={(val) => handleInputChange('idea', val)}
          />
        );
      case 6:
        return <PriceModel formData={formData} />;
      case 7:
        return <LogoDone />;
      default:
        return null;
    }
  };

  const stepContent = renderStep();

  return (
    <div className='mt-28 rounded-xl border p-10 2xl:mx-72'>
      {stepContent}

      {step < 6 && (
        <div className='mt-10 flex items-center justify-between'>
          <Button
            className='cursor-pointer bg-gray-100 text-black hover:bg-red-500'
            variant='outline'
            onClick={() => setStep((prev) => prev - 1)}
            disabled={step === 1}
          >
            <ArrowLeft /> Previous
          </Button>

          <Button
            className='cursor-pointer bg-pink-400 hover:bg-pink-500'
            onClick={() => setStep((prev) => prev + 1)}
          >
            <ArrowRight /> Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateLogo;
