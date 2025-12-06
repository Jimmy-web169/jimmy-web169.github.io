// Google Analytics 初始化腳本
(function() {
  // 檢查是否有 Keep 主題配置
  const gaConfig = window.KEEP && window.KEEP.theme_config && window.KEEP.theme_config.google_analytics;
  
  // 如果配置存在且啟用，則初始化 GA
  if (gaConfig && gaConfig.enable && gaConfig.tracking_id) {
    // 動態載入 Google Tag Manager 腳本
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaConfig.tracking_id}`;
    document.head.appendChild(script);
    
    script.onload = function() {
      // 初始化 Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', gaConfig.tracking_id);
      
      console.log(`Google Analytics 已初始化 (${gaConfig.tracking_id})`);
    };
    
    script.onerror = function() {
      console.error('Google Analytics 載入失敗');
    };
  } else {
    // 使用預設配置作為後備方案
    const defaultTrackingId = 'G-FY2GLL103K';
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${defaultTrackingId}`;
    document.head.appendChild(script);
    
    script.onload = function() {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', defaultTrackingId);
    };
  }
})();