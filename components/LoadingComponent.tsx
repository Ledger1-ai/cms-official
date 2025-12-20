import { BrandedLoader } from "@/components/ui/BrandedLoader";

const LoadingComponent = () => {
  return (
    <div className="w-full h-full min-h-[200px] flex items-center justify-center">
      <BrandedLoader variant="inline" />
    </div>
  );
};

export default LoadingComponent;
