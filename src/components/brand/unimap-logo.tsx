import Image from "next/image";

type UnimapLogoProps = {
  className?: string;
  title?: string;
  decorative?: boolean;
};

export function UnimapLogo({ className, title = "UNIMAP logo", decorative = true }: UnimapLogoProps) {
  return (
    <Image
      src="/unimap-logo.jpeg"
      alt={decorative ? "" : title}
      width={64}
      height={64}
      className={className}
      aria-hidden={decorative || undefined}
      draggable={false}
    />
  );
}
