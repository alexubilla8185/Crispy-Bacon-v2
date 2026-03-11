import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const STATUS_PRIORITY: Record<string, number> = {
  local: 0,
  uploading: 1,
  analyzing: 2,
  completed: 3,
};

export function shouldUpdateStatus(currentStatus: string | undefined, incomingStatus: string | undefined): boolean {
  if (!currentStatus) return true;
  if (!incomingStatus) return false;
  
  // Always allow transitioning to or from failed state to prevent getting stuck
  if (currentStatus === 'failed' || incomingStatus === 'failed') return true;
  
  const currentPriority = STATUS_PRIORITY[currentStatus] ?? -1;
  const incomingPriority = STATUS_PRIORITY[incomingStatus] ?? -1;
  return incomingPriority >= currentPriority;
}
