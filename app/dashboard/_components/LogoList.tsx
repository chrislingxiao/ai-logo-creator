'use client';

import {
  UserDetailContext,
  UserDetailContextType,
} from '@/app/_context/UserDetailContext';
import { db } from '@/app/config/FirebaseConfig';
import axios from 'axios';
import {
  collection,
  getDocs,
  orderBy,
  query,
  DocumentData,
} from 'firebase/firestore';
import Image from 'next/image';

import { useContext, useEffect, useState } from 'react';

const LogoList = () => {
  const { userDetail, setUserDetail } =
    useContext<UserDetailContextType>(UserDetailContext);

  const [logoList, setLogoList] = useState<DocumentData[]>([]);

  useEffect(() => {
    userDetail && GetUserLogos();
  }, [userDetail]);

  const GetUserLogos = async () => {
    if (!userDetail?.email) return;

    const res = await axios.get(`/api/logos?email=${userDetail.email}`);

    setLogoList(res.data.logos);
  };

  const viewLogo = (imageUrl: string) => {
    const imageWindow = window.open();
    imageWindow?.document.write(`<img src="${imageUrl}" alt="Base64 Image" />`);
  };

  return (
    <div className='mt-10'>
      <div className='grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'>
        {logoList?.length
          ? logoList.map((logo, idx) => (
              <div
                key={idx}
                className='cursor-pointer transition-all hover:scale-105'
                onClick={() => viewLogo(logo?.image)}
              >
                <Image
                  src={logo?.image}
                  width={400}
                  height={200}
                  className='w-full rounded-xl'
                  alt={logo?.title}
                />
                <h2 className='mt-2 text-center text-lg font-medium'>
                  {logo?.title}
                </h2>
                <p className='text-center text-sm text-gray-500'>
                  {logo?.desc}
                </p>
              </div>
            ))
          : [1, 2, 3, 4, 5].map((_, idx) => (
              <div
                key={idx}
                className='h-[200px] w-full animate-pulse rounded-xl bg-slate-200'
              ></div>
            ))}
      </div>
    </div>
  );
};

export default LogoList;
