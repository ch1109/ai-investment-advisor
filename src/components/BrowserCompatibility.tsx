'use client';

import { useEffect } from 'react';
import { detectBrowser, loadCompatibilityCSS, checkCSSSupport } from '@/utils/browser-detection';

export default function BrowserCompatibility() {
  useEffect(() => {
    // 检测浏览器并加载兼容性CSS
    loadCompatibilityCSS();
    
    // 检查CSS特性支持并输出调试信息
    const browserInfo = detectBrowser();
    const cssSupport = checkCSSSupport();
    
    if (browserInfo.needsCompatMode) {
      console.log('浏览器信息:', browserInfo);
      console.log('CSS特性支持:', cssSupport);
      
      // 如果是UE WebView，可以发送消息给UE
      if (browserInfo.isUEWebView && (window as unknown as { ue?: { interface?: { broadcast?: (event: string, data: unknown) => void } } }).ue) {
        try {
          const ueWindow = window as unknown as { ue: { interface: { broadcast: (event: string, data: unknown) => void } } };
          ueWindow.ue.interface.broadcast('webview_ready', {
            browserInfo,
            cssSupport
          });
        } catch (error) {
          console.log('UE接口通信失败:', error);
        }
      }
    }
  }, []);

  return null; // 这个组件不渲染任何内容
}
