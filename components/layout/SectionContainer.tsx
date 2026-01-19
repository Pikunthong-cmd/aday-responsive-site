import { cn } from "@/app/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  padded?: boolean; 
}

export default function SectionContainer({
  children,
  className,
  padded = true,
}: SectionContainerProps) {
  return (
    <section
      className={cn(
        "max-w-7xl mx-auto",
        padded && "px-4 sm:px-6 lg:px-6",
        className
      )}
    >
      {children}
    </section>
  );
}
