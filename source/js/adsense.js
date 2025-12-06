// Google AdSense 直接 HTML 腳本插入
(function() {
  // 檢查是否已載入 AdSense 腳本
  if (document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
    return;
  }
  
  // 直接插入原始 HTML 格式的腳本標籤
  const scriptHTML = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2722174726615585"
     crossorigin="anonymous"></script>`;
  
  document.head.insertAdjacentHTML('beforeend', scriptHTML);
})();