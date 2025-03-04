'use client';

import React from 'react';
import { ShirtIcon, AlignCenterIcon, HomeIcon, BookmarkIcon } from 'lucide-react';
import { Button } from '@ui';
import { useRouter, usePathname } from 'next/navigation';
import clsx from 'clsx';
import { routes } from '@utils';

const BottomNavBar: React.ComponentType = () => {
  const router = useRouter();
  const pathname = usePathname();

  const hover = 'hover:bg-alta-gray-200 dark:hover:bg-alta-gray-800';

  return (
    <div
      className="fixed rounded-t-3xl bottom-0 left-1/2 transform -translate-x-1/2 bg-white dark:bg-alta-black md:bg-alta-gray-100 md:dark:bg-alta-gray-900
      py-4 px-20 w-full max-w-3xl flex justify-between !text-gray-400 z-50"
    >
      <Button
        MainIcon={() => <HomeIcon className="w-10 h-10" />}
        className={clsx(
          pathname.startsWith(routes.home.href) &&
          'p-2 bg-alta-gray-200 dark:bg-alta-gray-800 rounded-full text-alta-gray-700 dark:text-alta-white',
          hover,
        )}
      // onClick={() => router.push(routes.home.href)}
      />
      <Button
        MainIcon={() => <AlignCenterIcon className="w-10 h-10" />}
        className={clsx(
          pathname.startsWith(routes.shop.href) &&
          'p-2 bg-alta-gray-200 dark:bg-alta-gray-800 rounded-full text-alta-gray-700 dark:text-alta-white',
          hover,
        )}
        onClick={() => router.push(routes.shop.href)}
      />
      <Button
        MainIcon={() => <ShirtIcon className="w-10 h-10" />}
        className={clsx(
          pathname.startsWith(routes.outfits.href) &&
          'p-2 bg-alta-gray-200 dark:bg-alta-gray-800 rounded-full text-alta-gray-700 dark:text-alta-white',
          hover,
        )}
      // onClick={() => router.push(routes.outfits.href)}
      />
      <Button
        MainIcon={() => <BookmarkIcon className="w-10 h-10" />}
        className={clsx(
          pathname.startsWith(routes.wishlist.href) &&
          'p-2 bg-alta-gray-200 dark:bg-alta-gray-800 rounded-full text-alta-gray-700 dark:text-alta-white',
          hover,
        )}
      // onClick={() => router.push(routes.wishlist.href)}
      />
    </div>
  );
};

export default BottomNavBar;
