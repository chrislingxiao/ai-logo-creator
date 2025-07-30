'use client';

import { Suspense, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Header from './_components/Header';
import axios from 'axios';
import { UserDetailContext } from './_context/UserDetailContext';

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userDetail, setUserDetail] = useState<any | null>(null);

  useEffect(() => {
    if (user) {
      checkUserAuth();
    } else {
      setUserDetail(null);
    }
  }, [user]);

  const checkUserAuth = async () => {
    try {
      const res = await axios.post('/api/users', {
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      });

      setUserDetail(res.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <Suspense>
      <div>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <Header />
          <div className='px=10 2xl: px-56 lg:px-32 xl:px-48'>{children}</div>
        </UserDetailContext.Provider>
      </div>
    </Suspense>
  );
};

export default Provider;
