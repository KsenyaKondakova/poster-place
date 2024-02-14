import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Nav from '@/components/Nav';

type LayoutProps = {
  children: React.ReactNode;
};
function Layout({ children }: LayoutProps) {
  const { data: session } = useSession();
  const [displayMenuMobile, setDisplayMenuMobile] = useState(true);
  const [displayContent, setDisplayContent] = useState(true);
  const handleResize = () => {
    setDisplayMenuMobile(window.innerWidth > 1020);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  if (session) {
    return (
      <div className="flex-col lg:flex-row flex bg-neutral-800 min-h-screen">
        <Nav
          displayMenuMobile={displayMenuMobile}
          setDisplayMenuMobile={setDisplayMenuMobile}
          displayContent={displayContent}
          setDisplayContent={setDisplayContent}
        />
        {displayContent && (
          <div className="bg-yellow-100 flex-grow mt-2 mr-2 mb-2 rounded-xl p-4 w-full lg:w-4/5  ">
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-amber-100 w-full h-screen flex items-center justify-center">
      <button
        onClick={() => signIn('yandex')}
        className="flex items-center justify-center gap-2 text-black transition duration-300 ease-in-out bg-white p-3 rounded-md border-none px-4 transform hover:bg-red-200 hover:scale-105"
      >
        <Image
          src="/Yandex_znak.png"
          width={30}
          height={30}
          alt="Picture of the author"
        />
        <span>Войти с помощью Яндекс</span>
      </button>
    </div>
  );
}

export default Layout;
