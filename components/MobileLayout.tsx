"use client";

import { Transition, Dialog } from "@headlessui/react";
import {
  ArrowUpDown,
  Badge,
  Eye,
  List,
  ListChecks,
  Menu,
  Palette,
  PencilRuler,
  Percent,
  Settings,
  Table,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface MobileLayoutProps {}

interface SidebarOption {}

const MobileLayout: FC<MobileLayoutProps> = ({}) => {
  const [open, setOpen] = useState<boolean>(false);
  const params = useParams();
  const pathname = usePathname();
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
      Icon: Eye,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
      Icon: List,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
      Icon: Table,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
      Icon: ListChecks,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
      Icon: PencilRuler,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`,
      Icon: Palette,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
      Icon: ArrowUpDown,
    },
    {
      href: `/${params.storeId}/users`,
      label: "Store users",
      active: pathname === `/${params.storeId}/users`,
      Icon: Users,
    },
    {
      href: `/${params.storeId}/promos`,
      label: "Promocodes",
      active: pathname === `/${params.storeId}/promos`,
      Icon: Percent,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
      Icon: Settings,
    },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <Button onClick={() => setOpen(true)} className=''>
        <Menu className='h-4 w-4' />
      </Button>
      <Transition.Root show={open} as='div'>
        <Dialog
          as='div'
          className='relative z-[60] overflow-y-auto'
          onClose={setOpen}
        >
          <div className='fixed inset-0 overflow-y-auto' />

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='absolute inset-0 overflow-y-auto '>
              <div className='pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10  '>
                <Transition.Child
                  as='div'
                  enter='transform transition ease-in-out duration-500 sm:duration-700'
                  enterFrom='-translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500 sm:duration-700'
                  leaveFrom='translate-x-0'
                  leaveTo='-translate-x-full'
                >
                  <Dialog.Panel className='pointer-events-auto w-screen max-w-[200px] overflow-y-auto  h-screen border-r-[1px] dark:border-r-slate-500 border-r-slate-900'>
                    <div className='flex h-full flex-col overflow-y-auto dark:bg-slate-950 bg-white py-6 shadow-xl'>
                      <div className='px-4 sm:px-6'>
                        <div className='flex items-start justify-between overflow-y-auto'>
                          <Dialog.Title className=' font-semibold leading-6 text-gray-900 dark:text-white text-2xl'>
                            Menu
                          </Dialog.Title>
                          <div className='ml-3 flex h-7 items-center'>
                            <button
                              type='button'
                              className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-nonetransition dark:bg-transparent '
                              onClick={() => setOpen(false)}
                            >
                              <span className='sr-only'>Close panel</span>
                              <X
                                className='dark:white h-6 w-6'
                                aria-hidden='true'
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='relative mt-6 flex-1 px-4 sm:px-6 text-black '>
                        {/* Content */}
                        <nav
                          className={cn("flex flex-col items-start  space-y-4")}
                        >
                          {routes.map((route) => (
                            <Link
                              key={route.href}
                              className={cn(
                                "text-sm font-medium transition-colors hover:text-primary flex gap-x-2 items-center",
                                route.active
                                  ? "text-black dark:text-white"
                                  : "text-muted-foreground"
                              )}
                              href={route.href}
                            >
                              <route.Icon />
                              {route.label}
                            </Link>
                          ))}
                        </nav>
                        {/* content end */}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default MobileLayout;
