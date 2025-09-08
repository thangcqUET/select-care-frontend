import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PricingPlanCard } from "@/components/dashboard/pricing-plan-card";
import { UsageStats } from "@/components/dashboard/usage-stats";
import { SelectionsList } from "@/components/dashboard/selections-list";

export default async function DashboardPage() {
  const supabase = await createClient();
  
  // Check if user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect('/auth/login');
  }

  // Get user's subscription data
  const { data: customer } = await supabase
    .from('customers')
    .select(`
      *,
      subscriptions(*)
    `)
    .eq('customer_id', user.id)
    .single();

  // Get user's usage stats
  const { data: usageData } = await supabase
    .from('user_usage')
    .select('*')
    .eq('user_id', user.id)
    .single();

  // Get recent selections
  const { data: recentSelections } = await supabase
    .from('selections')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  const currentPlan = customer?.subscriptions?.[0]?.subscription_status === 'active' 
    ? 'PREMIUM' 
    : 'FREE';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-gray-600">Here's an overview of your SelectCare account</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Usage Stats */}
          <UsageStats 
            usageData={usageData}
            currentPlan={currentPlan}
          />
          
          {/* Recent Selections */}
          <SelectionsList 
            selections={recentSelections || []}
          />
        </div>

        {/* Right Column - Pricing Plan */}
        <div className="lg:col-span-1">
          <PricingPlanCard 
            currentPlan={currentPlan}
            subscription={customer?.subscriptions?.[0]}
            user={{ id: user.id , email: user.email || '' }}
          />
        </div>
      </div>
    </div>
  );
}
