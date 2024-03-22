import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import TrashIcon from '@/assets/icons/TrashIcon';

import { afishaItemProps } from '@/types/componentsType';

export const AfishaItem: React.FC<afishaItemProps> = ({ afishaItem }) => {
  return (
    <article className="flex flex-col w-full sm:w-[48%] lg:w-[32%] bg-nav-gray p-4 items-center rounded-lg justify-between gap-y-4">
      <div className="relative w-full h-60">
        <Image
          src={afishaItem.image}
          alt={'афиша'}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </div>

      <div className="flex items-center ">
        <Link
          className="edit__buttons"
          href={'/afisha/delete/' + afishaItem._id}
        >
          <TrashIcon />
          <span className="hidden sm:block">Удалить</span>
        </Link>
      </div>
    </article>
  );
};
