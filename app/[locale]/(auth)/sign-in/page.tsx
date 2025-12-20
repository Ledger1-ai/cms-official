import { LoginComponent } from "./components/LoginComponent";
import NextImage from "next/image";

const SignInPage = async () => {
  return (
    <div className="h-full">
      <div className="py-10 flex items-center justify-center gap-3">
        <h1 className="scroll-m-20 text-3xl sm:text-4xl font-extrabold tracking-tight">Welcome to</h1>
        <NextImage src="/logo.png" alt="Ledger1CMS logo" width={150} height={50} className="h-10 sm:h-12 w-auto object-contain" />
      </div>
      <div>
        <LoginComponent />
      </div>
    </div>
  );
};

export default SignInPage;
