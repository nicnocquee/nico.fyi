"use client";

import { cn } from "@/lib/utils"; // Assuming you have shadcn's utility function
import { AnchorHTMLAttributes, HTMLAttributes } from "react";

export function BlueSkyFlutterContainer({
  className,
  children,
}: HTMLAttributes<HTMLAnchorElement>) {
  return (
    <div className={cn("inline-flex items-center gap-2 group", className)}>
      <svg
        className="w-8 h-8 transition-transform duration-500 group-hover:rotate-[-5deg] group-focus:rotate-[-5deg]"
        viewBox="0 0 566 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path
            id="wing"
            fill="currentColor"
            d="M 123.244 35.008 C 188.248 83.809 283.836 176.879 283.836 235.857 C 283.836 316.899 283.879 235.845 283.836 376.038 C 283.889 375.995 282.67 376.544 280.212 383.758 C 266.806 423.111 214.487 576.685 94.841 453.913 C 31.843 389.269 61.013 324.625 175.682 305.108 C 110.08 316.274 36.332 297.827 16.093 225.504 C 10.271 204.699 0.343 76.56 0.343 59.246 C 0.343 -27.451 76.342 -0.206 123.244 35.008 Z"
          />
        </defs>
        <use
          xlinkHref="#wing"
          className="origin-center animate-[flutter_430ms_ease-in-out] group-hover:animate-flutter-left group-focus:animate-flutter-left"
        />
        <use
          xlinkHref="#wing"
          className="origin-center scale-x-[-1] animate-[flutter_500ms_ease-in-out] group-hover:animate-flutter-right group-focus:animate-flutter-right"
        />
      </svg>
      {children}
    </div>
  );
}

export function BlueSkyFlutterAnchor({
  href,
  children,
  className,
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export function BlueSkyFlutter({
  href,
  text,
  className,
}: {
  href: string;
  text: string;
  className?: string;
}) {
  return (
    <BlueSkyFlutterContainer className={className}>
      <BlueSkyFlutterAnchor href={href}>{text}</BlueSkyFlutterAnchor>
    </BlueSkyFlutterContainer>
  );
}
