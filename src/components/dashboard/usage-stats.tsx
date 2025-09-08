interface UsageStatsProps {
  usageData?: {
    selections_today: number;
    selections_total: number;
    last_daily_reset: string;
  } | null;
  currentPlan: 'FREE' | 'PREMIUM';
}

export function UsageStats({ usageData, currentPlan }: UsageStatsProps) {
  const dailyLimit = currentPlan === 'FREE' ? 10 : null;
  const selectionsToday = usageData?.selections_today || 0;
  const selectionsTotal = usageData?.selections_total || 0;
  
  const dailyProgress = dailyLimit ? (selectionsToday / dailyLimit) * 100 : 0;
  const isNearLimit = dailyLimit && selectionsToday >= dailyLimit * 0.8;
  const isAtLimit = dailyLimit && selectionsToday >= dailyLimit;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Usage Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Usage */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">Today's Selections</h3>
            {dailyLimit && (
              <span className="text-xs text-gray-500">{selectionsToday}/{dailyLimit}</span>
            )}
          </div>
          
          {dailyLimit ? (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isAtLimit ? 'bg-red-500' : 
                      isNearLimit ? 'bg-yellow-500' : 
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(dailyProgress, 100)}%` }}
                  />
                </div>
              </div>
              
              {isAtLimit && (
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-xs text-red-600">Daily limit reached</span>
                </div>
              )}
              
              {isNearLimit && !isAtLimit && (
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-xs text-yellow-600">Approaching limit</span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900">{selectionsToday}</div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-xs text-green-600">Unlimited</span>
              </div>
            </div>
          )}
        </div>

        {/* Total Selections */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Total Selections</h3>
          <div className="text-2xl font-bold text-gray-900">{selectionsTotal.toLocaleString()}</div>
          <div className="text-xs text-gray-500">All time</div>
        </div>

        {/* Plan Status */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Plan Status</h3>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            currentPlan === 'PREMIUM' 
              ? 'bg-purple-100 text-purple-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {currentPlan}
          </div>
          <div className="text-xs text-gray-500">
            {currentPlan === 'FREE' ? 'Limited features' : 'Full access'}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Last reset: {usageData?.last_daily_reset ? 
              new Date(usageData.last_daily_reset).toLocaleDateString() : 
              'Never'
            }
          </div>
          
          {currentPlan === 'FREE' && isNearLimit && (
            <div className="text-right">
              <p className="text-xs text-gray-600 mb-1">Need more selections?</p>
              <button className="text-xs text-purple-600 hover:text-purple-800 font-medium">
                Upgrade to Premium →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
