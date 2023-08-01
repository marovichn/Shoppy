import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return <main className=''>Hello Aadmin Dashboard<UserButton afterSignOutUrl="/"/></main>;
}
