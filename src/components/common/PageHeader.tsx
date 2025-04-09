
import { ContextualHelp } from "./ContextualHelp";

interface PageHeaderProps {
  title: string;
  description?: string;
  helpContent?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, helpContent, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b">
      <div>
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h1>
          {helpContent && <ContextualHelp content={helpContent} />}
        </div>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="mt-4 sm:mt-0">{children}</div>}
    </div>
  );
}
