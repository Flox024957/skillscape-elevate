import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavTooltipProps {
  description: string;
  children: React.ReactNode;
}

export const NavTooltip = ({ description, children }: NavTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side="bottom" 
          className="bg-popover/95 backdrop-blur-sm border border-border shadow-lg"
        >
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};