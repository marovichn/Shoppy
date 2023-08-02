import { FC } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Copy, ServerIcon } from "lucide-react";
import { Badge, BadgeProps } from "./ui/badge";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};
const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert: FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
    const onCopy = () =>{
        navigator.clipboard.writeText(description);
        toast.success("API route copied to clipbiard")
    }
  return (
    <Alert>
      <ServerIcon className='h-4 w-4 mt-[0.2rem]' />
      <AlertTitle className='flex items-center gap-x-2'>
        {title}
        <Badge className="ml-2" variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm">
            {description}
        </code>
        <Button variant="outline" size="icon">
            <Copy className="h-4 w-4" onClick={onCopy}></Copy>
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
