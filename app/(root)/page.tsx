"use client"

import Modal from "@/components/ui/modal";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className='p-4'>
      <Modal title="Test" description="Test" isOpen onClose={()=>{}}></Modal>
    </main>
  );
}
