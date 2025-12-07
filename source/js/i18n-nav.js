/**
 * i18n Navigation Handler
 * Dynamically updates navigation links based on current language
 */
(function() {
  'use strict';

  // Detect current language from URL
  function getCurrentLang() {
    const path = window.location.pathname;
    if (path.startsWith('/en/')) {
      return 'en';
    }
    return 'zh-TW';
  }

  // Get the equivalent path in another language
  function getSwitchLangPath(targetLang) {
    const currentPath = window.location.pathname;
    const currentLang = getCurrentLang();

    if (targetLang === currentLang) {
      return currentPath;
    }

    if (targetLang === 'en') {
      // Switching from zh-TW to en
      if (currentPath === '/' || currentPath === '') {
        return '/en/';
      }
      // Handle zh-TW prefix paths (posts)
      if (currentPath.startsWith('/zh-TW/')) {
        return '/en/' + currentPath.slice(7);
      }
      // Handle archives and tags - add /en/ prefix
      if (currentPath.startsWith('/archives/') || currentPath.startsWith('/tags/')) {
        return '/en' + currentPath;
      }
      // Handle non-prefixed paths
      return '/en' + currentPath;
    } else {
      // Switching from en to zh-TW
      if (currentPath === '/en/' || currentPath === '/en') {
        return '/';
      }
      // Remove /en/ prefix
      if (currentPath.startsWith('/en/')) {
        const remainingPath = currentPath.slice(4);
        // Check if it's a post path (contains year pattern like 2025/07/05)
        if (/^\d{4}\/\d{2}\/\d{2}\//.test(remainingPath)) {
          return '/zh-TW/' + remainingPath;
        }
        // For archives, tags, etc., just remove /en/ prefix
        return '/' + remainingPath;
      }
      return currentPath;
    }
  }

  // Update navigation links for current language
  function updateNavLinks() {
    const lang = getCurrentLang();
    const isEnglish = lang === 'en';

    // Update home, archives and tags navigation links in header
    document.querySelectorAll('header a[href]').forEach(link => {
      const href = link.getAttribute('href');

      if (isEnglish) {
        // On English pages, update nav links to English versions
        if (href === '/' || href === '') {
          link.setAttribute('href', '/en/');
        } else if (href === '/archives/' || href === '/archives') {
          link.setAttribute('href', '/en/archives/');
        } else if (href === '/tags/' || href === '/tags') {
          link.setAttribute('href', '/en/tags/');
        }
      }
    });

    // Update tag cloud links on tags page
    const tagcloudContent = document.querySelector('.tagcloud-content');
    if (tagcloudContent) {
      // Fetch tag-language mapping and filter tags
      fetch('/tag-lang-map.json')
        .then(response => response.json())
        .then(tagLangMap => {
          tagcloudContent.querySelectorAll('a[href^="/tags/"]').forEach(link => {
            const href = link.getAttribute('href');
            // Extract tag slug from href (e.g., "/tags/2025/" -> "2025")
            const match = href.match(/\/tags\/([^/]+)\/?/);
            if (match) {
              const tagSlug = match[1];
              const tagLangs = tagLangMap[tagSlug] || [];

              if (isEnglish) {
                // On English page: hide tags without English posts, update links
                if (!tagLangs.includes('en')) {
                  link.style.display = 'none';
                } else {
                  link.setAttribute('href', '/en' + href);
                }
              } else {
                // On Chinese page: hide tags without Chinese posts
                if (!tagLangs.includes('zh-TW')) {
                  link.style.display = 'none';
                }
              }
            }
          });
        })
        .catch(err => {
          console.warn('Failed to load tag-lang-map.json:', err);
          // Fallback: just update links for English pages
          if (isEnglish) {
            tagcloudContent.querySelectorAll('a[href^="/tags/"]').forEach(link => {
              const href = link.getAttribute('href');
              if (!href.startsWith('/en/')) {
                link.setAttribute('href', '/en' + href);
              }
            });
          }
        });
    }

    // Update ALL language switch links (identify by text content only)
    // Also fix active class for language switcher
    document.querySelectorAll('a').forEach(link => {
      const text = link.textContent.trim();

      // Check if this is a language switch link by text content
      // Don't check href value since it may have been modified already
      if (text === '中文') {
        link.setAttribute('href', getSwitchLangPath('zh-TW'));
        // Fix active class: add active for Chinese when on Chinese pages
        const parentLi = link.closest('li.sub-menu-item');
        if (parentLi) {
          if (!isEnglish) {
            parentLi.classList.add('active');
          } else {
            parentLi.classList.remove('active');
          }
        }
      } else if (text === 'English' || text === 'ENGLISH') {
        link.setAttribute('href', getSwitchLangPath('en'));
        // Fix active class: add active for English when on English pages
        const parentLi = link.closest('li.sub-menu-item');
        if (parentLi) {
          if (isEnglish) {
            parentLi.classList.add('active');
          } else {
            parentLi.classList.remove('active');
          }
        }
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavLinks);
  } else {
    updateNavLinks();
  }

  // Also run after PJAX navigation (if Keep theme uses PJAX)
  document.addEventListener('pjax:complete', updateNavLinks);
})();
