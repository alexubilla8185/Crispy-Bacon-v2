'use client';

import { useInsightSubscription } from '@/hooks/useInsightSubscription';

export default function InsightSubscriptionInitializer() {
  useInsightSubscription();
  return null;
}
