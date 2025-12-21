/**
 * i18n filter for archives, tags, and post navigation
 * Generates language-specific archive and tag pages
 * Filters prev/next post navigation to same language
 */

'use strict';

const default_lang = 'zh-TW';

// Helper function to get language from post
function getPostLang(post) {
  if (post.lang) return post.lang;
  if (post.path) {
    const match = post.path.match(/^(zh-TW|en)\//);
    if (match) return match[1];
  }
  return default_lang;
}

// Register helper for same-language prev/next navigation
hexo.extend.helper.register('get_same_lang_prev', function() {
  const page = this.page;
  if (!page) return null;

  const currentLang = getPostLang(page);
  const allPosts = this.site.posts.sort('-date').toArray();
  const sameLangPosts = allPosts.filter(post => getPostLang(post) === currentLang);
  const currentIndex = sameLangPosts.findIndex(post => post.path === page.path);

  if (currentIndex === -1 || currentIndex === 0) return null;
  return sameLangPosts[currentIndex - 1];
});

hexo.extend.helper.register('get_same_lang_next', function() {
  const page = this.page;
  if (!page) return null;

  const currentLang = getPostLang(page);
  const allPosts = this.site.posts.sort('-date').toArray();
  const sameLangPosts = allPosts.filter(post => getPostLang(post) === currentLang);
  const currentIndex = sameLangPosts.findIndex(post => post.path === page.path);

  if (currentIndex === -1 || currentIndex >= sameLangPosts.length - 1) return null;
  return sameLangPosts[currentIndex + 1];
});

// Override archive generator to filter by language
hexo.extend.generator.register('i18n-archive', function(locals) {
  const config = this.config;
  const languages = Array.isArray(config.language) ? config.language : [config.language];
  const archiveDir = config.archive_dir || 'archives';
  const paginationDir = config.pagination_dir || 'page';
  const perPage = config.archive_generator ? config.archive_generator.per_page : config.per_page || 10;
  const result = [];

  languages.forEach(lang => {
    const posts = locals.posts.filter(post => post.lang === lang).sort('-date');

    if (posts.length === 0) return;

    const basePath = lang === languages[0]
      ? `${archiveDir}/`
      : `${lang}/${archiveDir}/`;

    // Generate main archive page
    const totalPages = perPage > 0 ? Math.ceil(posts.length / perPage) : 1;

    for (let i = 0; i < totalPages; i++) {
      const currentPosts = perPage > 0 ? posts.slice(i * perPage, (i + 1) * perPage) : posts;
      const pagePath = i === 0 ? basePath : `${basePath}${paginationDir}/${i + 1}/`;

      result.push({
        path: pagePath,
        layout: ['archive', 'index'],
        data: {
          archive: true,
          title: lang === 'en' ? 'Archives' : '歸檔',
          lang: lang,
          posts: currentPosts,
          total: totalPages,
          current: i + 1,
          current_url: pagePath,
          base: basePath,
          prev: i > 0 ? (i === 1 ? basePath : `${basePath}${paginationDir}/${i}/`) : '',
          prev_link: i > 0 ? (i === 1 ? basePath : `${basePath}${paginationDir}/${i}/`) : '',
          next: i < totalPages - 1 ? `${basePath}${paginationDir}/${i + 2}/` : '',
          next_link: i < totalPages - 1 ? `${basePath}${paginationDir}/${i + 2}/` : ''
        }
      });
    }

    // Generate yearly archives
    const years = {};
    posts.forEach(post => {
      const year = post.date.year();
      if (!years[year]) years[year] = [];
      years[year].push(post);
    });

    Object.keys(years).forEach(year => {
      const yearPath = `${basePath}${year}/`;
      result.push({
        path: yearPath,
        layout: ['archive', 'index'],
        data: {
          archive: true,
          year: parseInt(year),
          title: lang === 'en' ? `Archives: ${year}` : `歸檔：${year}`,
          lang: lang,
          posts: years[year]
        }
      });

      // Generate monthly archives
      const months = {};
      years[year].forEach(post => {
        const month = post.date.month() + 1;
        if (!months[month]) months[month] = [];
        months[month].push(post);
      });

      Object.keys(months).forEach(month => {
        const monthPath = `${basePath}${year}/${month.toString().padStart(2, '0')}/`;
        result.push({
          path: monthPath,
          layout: ['archive', 'index'],
          data: {
            archive: true,
            year: parseInt(year),
            month: parseInt(month),
            title: lang === 'en' ? `Archives: ${year}/${month}` : `歸檔：${year}/${month}`,
            lang: lang,
            posts: months[month]
          }
        });
      });
    });
  });

  return result;
});

// Generate tag-language mapping JSON for client-side filtering
hexo.extend.generator.register('tag-lang-map', function(locals) {
  const config = this.config;
  const languages = Array.isArray(config.language) ? config.language : [config.language];
  const tagLangMap = {};

  languages.forEach(lang => {
    const langPosts = locals.posts.filter(post => post.lang === lang);
    langPosts.forEach(post => {
      post.tags.forEach(tag => {
        if (!tagLangMap[tag.slug]) {
          tagLangMap[tag.slug] = [];
        }
        if (!tagLangMap[tag.slug].includes(lang)) {
          tagLangMap[tag.slug].push(lang);
        }
      });
    });
  });

  return {
    path: 'tag-lang-map.json',
    data: JSON.stringify(tagLangMap)
  };
});

// Override tag generator to filter by language
hexo.extend.generator.register('i18n-tag', function(locals) {
  const config = this.config;
  const languages = Array.isArray(config.language) ? config.language : [config.language];
  const tagDir = config.tag_dir || 'tags';
  const paginationDir = config.pagination_dir || 'page';
  const perPage = config.tag_generator ? config.tag_generator.per_page : config.per_page || 10;
  const result = [];

  languages.forEach(lang => {
    // Get all posts for this language
    const langPosts = locals.posts.filter(post => post.lang === lang);

    // Build tag map for this language
    const tagMap = new Map();
    langPosts.forEach(post => {
      post.tags.forEach(tag => {
        if (!tagMap.has(tag.name)) {
          tagMap.set(tag.name, {
            name: tag.name,
            slug: tag.slug,
            posts: []
          });
        }
        tagMap.get(tag.name).posts.push(post);
      });
    });

    if (tagMap.size === 0) return;

    const basePath = lang === languages[0]
      ? `${tagDir}/`
      : `${lang}/${tagDir}/`;

    // Note: Tag index pages are generated from source/tags/index.md and source/en/tags/index.md
    // The tagcloud is filtered by JavaScript (i18n-nav.js) on the client side

    // Generate individual tag pages
    tagMap.forEach((tagData, tagName) => {
      const posts = tagData.posts.sort((a, b) => b.date - a.date);
      const tagPath = `${basePath}${tagData.slug}/`;
      const totalPages = perPage > 0 ? Math.ceil(posts.length / perPage) : 1;

      for (let i = 0; i < totalPages; i++) {
        const currentPosts = perPage > 0 ? posts.slice(i * perPage, (i + 1) * perPage) : posts;
        const pagePath = i === 0 ? tagPath : `${tagPath}${paginationDir}/${i + 1}/`;

        result.push({
          path: pagePath,
          layout: ['tag', 'archive', 'index'],
          data: {
            title: `${lang === 'en' ? 'Tag' : '標籤'}: ${tagName}`,
            tag: tagName,
            lang: lang,
            posts: currentPosts,
            total: totalPages,
            current: i + 1,
            current_url: pagePath,
            base: tagPath,
            prev: i > 0 ? (i === 1 ? tagPath : `${tagPath}${paginationDir}/${i}/`) : '',
            prev_link: i > 0 ? (i === 1 ? tagPath : `${tagPath}${paginationDir}/${i}/`) : '',
            next: i < totalPages - 1 ? `${tagPath}${paginationDir}/${i + 2}/` : '',
            next_link: i < totalPages - 1 ? `${tagPath}${paginationDir}/${i + 2}/` : ''
          }
        });
      }
    });
  });

  return result;
});
