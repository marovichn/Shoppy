import { UserButton, auth } from "@clerk/nextjs";
import { FC } from "react";
import MainNav from "./MainNav";
import StoreSwitcher from "./StoreSwitcher";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { ModeToggle } from "./ui/ModeToggle";
import MobileLayout from "./MobileLayout";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const stores = await prismadb.store.findMany({ where: { userId } });

  return (
    <div className='border-b'>
      <div className='flex h-16 items-center max-lg:justify-between px-4 gap-x-2 overflow-x-auto'>
        <div className='lg:hidden flex items-center space-x-4'>
          <MobileLayout />
        </div>
        <StoreSwitcher items={stores} />
        {/* <div className='lg:hidden flex items-center space-x-4'>
          <ModeToggle />
          <UserButton afterSignOutUrl='/' />
        </div> */}

        <MainNav className='max-lg:hidden ml-5' />
        <div className='lg:ml-auto flex items-center space-x-4'>
          <ModeToggle />
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
