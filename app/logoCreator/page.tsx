'use client';

import { Suspense, useContext, useEffect, useState } from 'react';
import { UserDetailContext } from '../_context/UserDetailContext';
import { useSearchParams } from 'next/navigation';
import { IFormData, ILogoDesign, IPriceOption } from '../_types/types';
import { toast } from 'sonner';
import { Prompt } from '../_data/Prompt';
import axios from 'axios';
import LookUp from '../_data/Lookup';
import { DownloadIcon, LayoutDashboard, LoaderIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LogoCreator = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const searchParams = useSearchParams();
  const modelType = searchParams.get('type');

  const [formData, setFormData] = useState<IFormData>({
    title: '',
    desc: '',
    palette: '',
    design: {} as ILogoDesign,
    idea: '',
    price: {} as IPriceOption,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [logoImage, setLogoImage] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined' && userDetail?.email) {
      const storgae = localStorage.getItem('formData');
      if (storgae) {
        setFormData(JSON.parse(storgae));
      }
    }
  }, [userDetail]);

  useEffect(() => {
    if (typeof window !== 'undefined' && logoImage) {
      localStorage.clear();
      if (modelType !== 'Free') {
        setUserDetail({
          ...userDetail!,
          credits: Number(userDetail?.credits || 0) - 1,
        });
      }
    }
  }, [logoImage]);

  useEffect(() => {
    if (formData?.title?.length > 0) {
      CreateAILogo();
    }
  }, [formData]);

  const CreateAILogo = async () => {
    if (modelType !== 'Free' && (userDetail?.credits || 0) <= 0) {
      toast('Not enough credits!!');
      return;
    }

    setLoading(true);

    const prompt = Prompt.LOGO_PROMPT.replace('{logoTitle}', formData?.title)
      .replace('{logoDesc}', formData?.desc)
      .replace('{logoColor}', formData.palette)
      .replace('{logoIdea}', formData?.idea)
      .replace('{logoDesign}', formData?.design?.title)
      .replace('{logoPrompt}', formData?.design?.prompt);

    const res = await axios.post('/api/ai-logo-model-mongo', {
      prompt,
      email: userDetail?.email,
      title: formData.title,
      desc: formData.desc,
      type: modelType,
      userCredits: userDetail?.credits,
    });

    setLogoImage(res.data?.image);
    setLoading(false);
  };

  const openImage = () => {
    const imageWindow = window.open();
    imageWindow?.document.write(
      `<img src="${logoImage}" alt="Base64 Image" />`
    );
  };

  return (
    <Suspense>
      <div className='mt-16 flex flex-col items-center justify-center'>
        <h2 className='text-3xl font-bold text-pink-400'>
          {LookUp.LoadingTitle}
        </h2>
        {loading && (
          <div className='mt-2 flex flex-col items-center'>
            <p className='text-xl text-gray-500'>{LookUp.LoadingDesc}</p>
            <LoaderIcon className='animate-spin' />
            <Image
              src={'/images/loading.gif'}
              alt='loading'
              width={200}
              height={200}
              className='mt-6'
            />
            <h2 className='mt-2 text-2xl font-medium text-gray-500'>
              Do Not Refresh!
            </h2>
          </div>
        )}

        {logoImage && (
          <div className='mt-5'>
            <Image
              src={logoImage}
              alt='logo'
              width={300}
              height={300}
              className='rounded-xl'
            />

            <div className='mt-4 flex items-center justify-between gap-5'>
              <Button
                className='cursor-pointer bg-pink-400 hover:bg-pink-500'
                onClick={openImage}
              >
                <DownloadIcon /> Download
              </Button>
              <Link href={'/dashboard'}>
                <Button variant='outline'>
                  <LayoutDashboard /> Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default LogoCreator;
