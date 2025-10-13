'use server';

import { getCustomerId } from '@/lib/paddle/get-customer-id';
import { ErrorMessage, parseSDKResponse } from '@/lib/paddle/data-helpers';
import { getPaddleInstance } from '@/lib/paddle/get-paddle-instance';
import { SubscriptionDetailResponse } from '@/types/api.types';

export async function getSubscription(subscriptionId: string): Promise<SubscriptionDetailResponse> {
  try {
    const customerId = await getCustomerId();
    if (customerId) {
      const subscription = await getPaddleInstance().subscriptions.get(subscriptionId, {
        include: ['next_transaction', 'recurring_transaction_details'],
      });

      return { data: parseSDKResponse(subscription) };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { error: ErrorMessage };
  }
  return { error: ErrorMessage };
}
