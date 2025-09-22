'use client';

import {Suspense} from 'react';
import dynamicImport from 'next/dynamic';

// 禁用静态生成
export const dynamic = 'force-dynamic';

// 动态导入客户端组件
const DetailedMarketInsightsContent = dynamicImport(() => import('./DetailedMarketInsightsContent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">加载中...</h2>
        <p className="text-gray-600">Loading detailed insights...</p>
      </div>
    </div>
  )
});

export default function DetailedMarketInsightsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">加载中...</h2>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <DetailedMarketInsightsContent />
    </Suspense>
  );
}
