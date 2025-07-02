
import { LoginForm } from "@/app/component/LoginForm";
import Image from "next/image";

export default function LoginPage(){
  return(
    <div className="z-50 relative flex min-h-screen flex-col items-center gap-10 justify-center py-12 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-center ">
            <Image alt="Logo" height="48" width="48" className="mx-auto w-auto rounded-full" src="/images/logo.jpeg"/>
        </div>
        <LoginForm />
    </div>
  )
}
