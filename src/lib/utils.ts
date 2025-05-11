import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatDate = (isoString: string) => {
  const oldData = new Date(Number(isoString)).toISOString()
  const date = new Date(String(oldData));
  return date.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata", // Change timezone if needed
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};
