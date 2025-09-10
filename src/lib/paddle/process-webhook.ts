import {
  CustomerCreatedEvent,
  CustomerUpdatedEvent,
  EventEntity,
  EventName,
  SubscriptionCreatedEvent,
  SubscriptionUpdatedEvent,
} from '@paddle/paddle-node-sdk';
import { createClient } from '@/lib/supabase/server-internal';

export class ProcessWebhook {
  async processEvent(eventData: EventEntity) {
    switch (eventData.eventType) {
      case EventName.SubscriptionCreated:
      case EventName.SubscriptionUpdated:
        console.log('Processing subscription event:', eventData);
        await this.updateSubscriptionData(eventData);
        break;
      case EventName.CustomerCreated:
      case EventName.CustomerUpdated:
        console.log('Processing customer event:', eventData);
        await this.updateCustomerData(eventData);
        break;
    }
  }

  private async updateSubscriptionData(eventData: SubscriptionCreatedEvent | SubscriptionUpdatedEvent) {
    const supabase = await createClient();
    const customData = eventData.data.customData as Record<string, unknown> | undefined;
    const clientEmail = customData?.email as string | undefined;
    const clientUserId = customData?.user_id as string | undefined;
    // add client context if email and user_id are present
    let clientContextId: string | null = null;
    if (clientEmail && clientUserId) {
      const { data: contextData, error: contextError } = await supabase
        .from('client_context')
        .upsert({
          email: clientEmail ?? null,
          user_id: clientUserId ?? null,
        })
        .select()
        .single();
      if (contextError) console.error('Error upserting client context:', contextError);
      else clientContextId = contextData?.id || null;
    }
    const { error } = await supabase
      .from('subscriptions')
      .upsert({
        subscription_id: eventData.data.id,
        subscription_status: eventData.data.status,
        price_id: eventData.data.items[0].price?.id ?? '',
        product_id: eventData.data.items[0].price?.productId ?? '',
        scheduled_change: eventData.data.scheduledChange?.effectiveAt,
        customer_id: eventData.data.customerId,
        client_context_id: clientContextId,
      })
      .select();

    if (error) throw error;
  }

  private async updateCustomerData(eventData: CustomerCreatedEvent | CustomerUpdatedEvent) {
    const supabase = await createClient();
    const { error } = await supabase
      .from('customers')
      .upsert({
        customer_id: eventData.data.id,
        email: eventData.data.email,
      })
      .select();

    if (error) throw error;
  }
}
