
import Image from "next/image";
import Link from "next/link";
import { Button } from "./component/modal/Button";

export default async function Home() {
  
  return (
    <div className="z-50 relative flex min-h-screen flex-col items-center gap-10 justify-center py-12 sm:px-6 lg:px-8 ">
      <div className="flex items-center justify-center ">
        <Image alt="Logo" height="48" width="48" className="mx-auto w-auto rounded-full" src="/images/logo.jpeg"/>
      </div>
      <h1 className="font-[family-name:var(--font-indie-flower)] text-3xl md:text-6xl italic text-sky-500">
        Your Personal Messenger
      </h1>
      <div className="w-2/3 max-w-[400px] md:max-w-[500px] mx-auto flex items-center gap-4">
        <Button fullWidth>
            <Link href="/auth/log-in">Log In</Link>
        </Button>
        <Button fullWidth>
            <Link href="/auth/register">Register</Link>
        </Button>
      </div>
    </div>
  );
}
