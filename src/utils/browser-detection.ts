/**
 * 浏览器检测工具函数
 */

export interface BrowserInfo {
  isUEWebView: boolean;
  isOldChrome: boolean;
  chromeVersion: number | null;
  needsCompatMode: boolean;
}

/**
 * 检测是否为UE引擎的WebView
 */
export function detectBrowser(): BrowserInfo {
  if (typeof window === 'undefined') {
    return {
      isUEWebView: false,
      isOldChrome: false,
      chromeVersion: null,
      needsCompatMode: false,
    };
  }

  const userAgent = window.navigator.userAgent;

  // 检测Chrome版本
  const chromeMatch = userAgent.match(/Chrome\/(\d+)/);
  const chromeVersion = chromeMatch ? parseInt(chromeMatch[1], 10) : null;

  // 检测是否为UE WebView
  // UE引擎可能使用以下标识符或者使用特定的Chrome版本
  const isUEWebView = userAgent.includes('UE4') ||
                      userAgent.includes('UE5') ||
                      userAgent.includes('UnrealEngine') ||
                      userAgent.includes('UEWebView') ||
                      // UE经常使用固定的Chrome 92版本
                      (chromeVersion === 92) ||
                      // 检查是否有UE特有的window对象属性
                      (typeof (window as unknown as { ue?: unknown }).ue !== 'undefined') ||
                      // 检查其他可能的UE标识
                      userAgent.includes('CEF') || // Chromium Embedded Framework
                      userAgent.includes('Electron'); // 有时UE可能使用Electron

  // Chrome 92及以下版本需要兼容模式
  const isOldChrome = chromeVersion !== null && chromeVersion <= 92;

  // 如果是疑似UE环境或老版本Chrome，都启用兼容模式
  const needsCompatMode = isUEWebView || isOldChrome;

  return {
    isUEWebView,
    isOldChrome,
    chromeVersion,
    needsCompatMode,
  };
}

/**
 * 动态加载兼容性CSS
 */
export function loadCompatibilityCSS() {
  const browserInfo = detectBrowser();

  if (browserInfo.needsCompatMode) {
    // 添加兼容性类名到html和body
    document.documentElement.classList.add('ue-webview-compat');
    document.body.classList.add('ue-webview-compat');

    // 强制重新渲染页面以应用样式
    document.body.style.display = 'none';
    void document.body.offsetHeight; // 触发重排
    document.body.style.display = '';

    // 添加一些额外的兼容性处理
    if (browserInfo.isUEWebView) {
      // 禁用一些可能导致问题的特性
      document.documentElement.style.setProperty('--webkit-transform', 'translateZ(0)');

      // 确保字体正确加载
      document.documentElement.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    }

    console.log('UE WebView兼容模式已启用', browserInfo);

    // 发送自定义事件，通知其他组件兼容模式已启用
    const event = new CustomEvent('ue-compat-enabled', { detail: browserInfo });
    window.dispatchEvent(event);
  }
}

/**
 * 检查CSS特性支持
 */
export function checkCSSSupport() {
  if (typeof window === 'undefined') return {};
  
  const support = {
    cssVariables: CSS.supports('color', 'var(--test)'),
    flexbox: CSS.supports('display', 'flex'),
    grid: CSS.supports('display', 'grid'),
    backdropFilter: CSS.supports('backdrop-filter', 'blur(1px)'),
    lineClamp: CSS.supports('-webkit-line-clamp', '3'),
  };
  
  return support;
}
