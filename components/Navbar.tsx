import { UserButton, auth } from "@clerk/nextjs";
import { FC } from "react";
import MainNav from "./MainNav";
import StoreSwitcher from "./StoreSwitcher";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { ModeToggle } from "./ui/ModeToggle";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const stores = await prismadb.store.findMany({ where: { userId } });

  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4 gap-x-2'>
        <StoreSwitcher items={stores} />
        <MainNav />

        <div className='ml-auto flex items-center space-x-4'>
          <ModeToggle />
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
