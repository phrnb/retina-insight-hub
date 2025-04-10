
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ContextualHelpProps {
  content: string;
  title?: string;
  size?: "sm" | "md" | "lg";
}

export function ContextualHelp({ content, title, size = "md" }: ContextualHelpProps) {
  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="help-tooltip">
            <HelpCircle className={iconSizes[size]} />
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={5}>
          {title && <div className="font-medium mb-1">{title}</div>}
          <div className="max-w-xs">{content}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
