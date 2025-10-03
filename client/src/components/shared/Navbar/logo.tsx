import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg"; // optional prop
}

const sizeClasses = {
  sm: "h-8 w-auto", // small (e.g. footer)
  md: "h-12 w-auto", // default (navbar)
  lg: "h-16 w-auto", // big (landing page)
};

export const Logo = ({ size = "md" }: LogoProps) => (
  <Image
    src="/logo.jpg"
    alt="Company Logo"
    width={120}
    height={120}
    className={sizeClasses[size]}
    priority
  />
);
