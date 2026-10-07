import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "link";

const base =
  "inline-flex items-center justify-center gap-2 font-sans text-sm tracking-wide transition-colors duration-300";

const variants: Record<Variant, string> = {
  primary: "btn-gilded rounded-full px-7 py-3.5 font-medium text-on-gold",
  ghost: "rounded-full border border-bone/40 px-7 py-3.5 text-bone hover:border-gold hover:text-gold",
  link: "underline decoration-gold/60 underline-offset-[6px] hover:decoration-gold hover:text-gold",
};

type Props = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

/** Internal hrefs use next/link; anything with a scheme (or mailto:) is a plain anchor. */
export function Button({ href, variant = "primary", className = "", children, ...rest }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const external = /^(https?:|mailto:)/.test(href) || href.endsWith(".pdf");
  if (external) {
    const isWeb = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
