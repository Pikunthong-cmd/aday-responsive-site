import { cn } from "@/app/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
  fullWidth?: boolean;
}

export default function SectionContainer({
  children,
  className,
  padded = true,
  fullWidth = false,
}: SectionContainerProps) {
  return (
    <section
      className={cn(
        fullWidth ? "w-full max-w-none" : "max-w-7xl mx-auto",
        padded && !fullWidth && "px-4 sm:px-6 lg:px-0",
        className
      )}
    >
      {children}
    </section>
  );
}
