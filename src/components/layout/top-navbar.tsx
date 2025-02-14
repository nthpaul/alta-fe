"use client";
import { Button, Typography } from "@ui";
import { ThemeToggle } from '@/components/theme/theme-toggle';
import React from "react";
import { BellIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { routes } from "@utils";

interface Props {
  title?: string;
}
// not adding this to the root layout because sometimes it gets hidden during certain iteractions
// so just adding it to pages for now
// TODO: dynamic render depending on interaction
const TopNavbar: React.ComponentType<Props> = ({
  title
}) => {
  // const router = useRouter();

  return <div className='fixed border md:border-none w-screen max-w-3xl left-1/2 transform -translate-x-1/2 dark:bg-alta-black bg-white justify-between items-center flex p-4 z-50'>
    {title && <Typography variant='h1'>{title}</Typography>}
    <div className='flex items-center gap-6'>
      <Button
        MainIcon={() => <BellIcon className='w-6 h-6' />}
        className="text-alta-gray-500 flex h-full cursor-pointer items-center justify-center rounded-full border-gray-600/50 duration-200 hover:bg-gray-600/20"
        // TODO: add notifications panel expand
        onClick={() => null}
      />
      <Button
        MainIcon={() => <UserIcon className='w-6 h-6' />}
        className="text-alta-gray-500 flex h-full cursor-pointer items-center justify-center rounded-full border-gray-600/50 duration-200 hover:bg-gray-600/20"
      // onClick={() => {
      // TODO: add actual userId here
      // router.push(routes.profile.href("1"));
      // }}
      />
      <ThemeToggle />
    </div>

  </div>;
};

export default TopNavbar;
