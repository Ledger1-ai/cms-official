import { RegisterComponent } from "./components/RegisterComponent";
import { getPlans } from "@/actions/plans/plan-actions";
import NextImage from "next/image";

const RegisterPage = async () => {
  const plans = await getPlans();
  return (
    <div className="flex flex-col w-full h-full overflow-auto p-10 space-y-5">
      <div className="py-2 flex items-center justify-center gap-3">
        <h1 className="scroll-m-20 text-3xl sm:text-4xl font-extrabold tracking-tight">Welcome to</h1>
        <NextImage src="/logo.png" alt="BasaltCMS logo" width={150} height={50} className="h-10 sm:h-12 w-auto object-contain" />
      </div>
      {/* @ts-ignore */}
      <RegisterComponent availablePlans={plans} />
    </div>
  );
};

export default RegisterPage;
