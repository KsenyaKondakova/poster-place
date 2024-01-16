import React from 'react';
import BuildingIcon from '@/assets/icons/BuildingIcon';
import CardIcon from '@/assets/icons/Card';
import ChatIcon from '@/assets/icons/ChatIcon';
import ExitIcon from '@/assets/icons/ExitIcon';
import ListIcon from '@/assets/icons/ListIcon';
import LogoutIcon from '@/assets/icons/LogoutIcon';
import MenuIcon from '@/assets/icons/MenuIcon';
import NewsIcon from '@/assets/icons/NewsIcon';
import SquaresIcon from '@/assets/icons/SquaresIcon';
import StarIcon from '@/assets/icons/StarIcon';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { NextRouter, useRouter } from 'next/router';

type NavProps = {
  displayMenuMobile: boolean;
  setDisplayMenuMobile: (value: boolean | ((prevMenu: boolean) => boolean)) => void;
  displayContent: boolean;
  setDisplayContent: (value: boolean | ((prevContent: boolean) => boolean)) => void;
};
function Nav({
  displayMenuMobile,
  setDisplayMenuMobile,
  displayContent,
  setDisplayContent,
}: NavProps) {
  const router: NextRouter = useRouter();
  const pathname: string = router.pathname || '';
  const inactiveLink: string =
    'flex gap-2 text-xl font-extralight bg-nav-gray p-3 rounded-2xl hover:shadow-lg transition duration-300 ease-in-out  hover:shadow-amber-100';
  const activeLink: string = inactiveLink + ' bg-nav-yellow text-neutral-800';
  const handleClickMenu = () => {
    setDisplayMenuMobile((prevMenu) => !prevMenu);
    setDisplayContent((prevContent) => !prevContent);
  };
  return (
    <aside className="flex-col flex sm:w-full lg:w-1/5 p-4 gap-y-4">
      <div className="flex justify-between">
        <Link href={'/'} className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#fff7ed"
            className="w-7 h-7">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
            />
          </svg>
          <span className="text-xl text-orange-50">BUTIK64</span>
        </Link>
        {!displayMenuMobile && (
          <button onClick={() => handleClickMenu()}>
            <MenuIcon />
          </button>
        )}
        {!displayContent && (
          <button onClick={() => handleClickMenu()}>
            <ExitIcon />
          </button>
        )}
      </div>

      <div className={`flex flex-col gap-4 text-orange-50  ${!displayMenuMobile ? 'hidden' : ''}`}>
        <nav className="flex flex-col gap-5">
          <Link href={'/'} className={pathname === '/' ? activeLink : inactiveLink}>
            <SquaresIcon />
            <span>Панель мониторинга</span>
          </Link>
          <Link href={'/news'} className={pathname === '/news' ? activeLink : inactiveLink}>
            <NewsIcon />
            <span>Новости</span>
          </Link>
          <Link href={'/afisha'} className={pathname === '/afisha' ? activeLink : inactiveLink}>
            <ChatIcon />
            <span>Афиша</span>
          </Link>
          <Link
            href={'/categories'}
            className={pathname === '/categories' ? activeLink : inactiveLink}>
            <ListIcon />
            <span>Категории</span>
          </Link>
          <Link href={'/places'} className={pathname === '/places' ? activeLink : inactiveLink}>
            <BuildingIcon />

            <span>Заведения</span>
          </Link>
          <Link href={'/stars'} className={pathname === '/stars' ? activeLink : inactiveLink}>
            <StarIcon />
            <span>Звезды</span>
          </Link>
          <Link href={'/sales'} className={pathname === '/sales' ? activeLink : inactiveLink}>
            <CardIcon />
            <span>Продажи</span>
          </Link>
        </nav>{' '}
        <button className="flex items-center" onClick={() => signOut()}>
          <LogoutIcon />
          <span>Выйти</span>
        </button>
      </div>
    </aside>
  );
}

export default Nav;
