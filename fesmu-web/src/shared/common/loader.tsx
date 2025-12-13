import { Loader2 } from "lucide-react";
import { FC } from "react";

interface CommonLoaderFormProps {
  isLoad: boolean;
}
const CommonLoaderForm: FC<CommonLoaderFormProps> = ({ isLoad }) => {
  return (
    isLoad && (
      <div className="absolute bg-zinc-300/30 flex items-center justify-center top-0 left-0 w-full h-full">
        <Loader2 className="animate-spin" size={45} />
      </div>
    )
  );
};
export { CommonLoaderForm };
