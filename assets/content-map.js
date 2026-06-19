const contentMap = {
  sections: [
    {
      id: "news",
      label: "新闻中心",
      tags: ["爱游戏", "行业动态", "官方公告"],
      items: [
        { title: "爱游戏发布全新版本", url: "https://official-site-i-game.com.cn/news/1", keywords: ["爱游戏", "版本更新"] },
        { title: "平台用户突破百万", url: "https://official-site-i-game.com.cn/news/2", keywords: ["用户增长", "里程碑"] },
        { title: "合规运营报告公示", url: "https://official-site-i-game.com.cn/news/3", keywords: ["合规", "报告"] }
      ]
    },
    {
      id: "products",
      label: "产品中心",
      tags: ["游戏产品", "爱游戏"],
      items: [
        { title: "经典棋牌合集", url: "https://official-site-i-game.com.cn/products/chess", keywords: ["棋牌", "经典"] },
        { title: "休闲益智专区", url: "https://official-site-i-game.com.cn/products/casual", keywords: ["休闲", "益智", "爱游戏"] },
        { title: "竞技对战平台", url: "https://official-site-i-game.com.cn/products/arena", keywords: ["竞技", "对战"] }
      ]
    },
    {
      id: "about",
      label: "关于我们",
      tags: ["公司介绍", "爱游戏", "企业文化"],
      items: [
        { title: "公司简介", url: "https://official-site-i-game.com.cn/about/intro", keywords: ["简介", "团队"] },
        { title: "发展历程", url: "https://official-site-i-game.com.cn/about/history", keywords: ["历程", "历史"] }
      ]
    }
  ],
  siteBase: "https://official-site-i-game.com.cn",
  defaultKeywords: ["爱游戏", "游戏平台", "在线娱乐"]
};

function searchContent(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results = [];
  const visited = new Set();

  contentMap.sections.forEach(section => {
    section.items.forEach(item => {
      const matchSource = [
        item.title.toLowerCase(),
        item.url.toLowerCase(),
        ...item.keywords.map(k => k.toLowerCase()),
        ...section.tags.map(t => t.toLowerCase()),
        section.label.toLowerCase()
      ];

      const match = matchSource.some(src => src.includes(q));
      if (match && !visited.has(item.url)) {
        visited.add(item.url);
        results.push({
          sectionId: section.id,
          sectionLabel: section.label,
          title: item.title,
          url: item.url,
          keywords: item.keywords
        });
      }
    });
  });

  return results;
}

function filterByTag(tag) {
  const tagLower = tag.toLowerCase().trim();
  const matched = [];

  contentMap.sections.forEach(section => {
    const sectionTagMatch = section.tags.some(t => t.toLowerCase() === tagLower);
    section.items.forEach(item => {
      const itemTagMatch = item.keywords.some(k => k.toLowerCase() === tagLower);
      if (sectionTagMatch || itemTagMatch) {
        matched.push({
          sectionId: section.id,
          sectionLabel: section.label,
          title: item.title,
          url: item.url,
          keywords: item.keywords
        });
      }
    });
  });

  return matched;
}

function getAllKeywords() {
  const kwSet = new Set();
  contentMap.sections.forEach(section => {
    section.tags.forEach(t => kwSet.add(t));
    section.items.forEach(item => {
      item.keywords.forEach(k => kwSet.add(k));
    });
  });
  contentMap.defaultKeywords.forEach(k => kwSet.add(k));
  return Array.from(kwSet);
}

console.log("内容地图已加载，站点基础URL:", contentMap.siteBase);
console.log("可用搜索示例:");
console.log('  searchContent("爱游戏")');
console.log('  filterByTag("竞技")');
console.log("  getAllKeywords()");