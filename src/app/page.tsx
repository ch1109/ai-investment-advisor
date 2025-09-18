'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/zh');
  }, [router]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>正在跳转到 AI 投顾...</h2>
        <p>Loading AI Investment Advisor...</p>
      </div>
    </div>
  );
}