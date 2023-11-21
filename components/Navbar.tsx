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
        <div className='min-[1150px]:hidden flex items-center space-x-4'>
          <MobileLayout />
        </div>
        <StoreSwitcher items={stores} />
        <MainNav className='max-[1150px]:hidden ml-5' />
        <div className='min-[1150px]:ml-auto flex items-center space-x-4'>
          <ModeToggle />
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
