const fs = require('fs');
// const globby = require('globby');
const prettier = require('prettier');
const fetch = require('node-fetch');
// import fetch from 'node-fetch';
// import { globby } from 'globby';
// import fs from 'fs';
// import prettier from 'prettier';

const getDate = new Date().toISOString();

const url = 'https://www.grownbetter.com/article';
const DOMAIN = 'https://www.grownbetter.com';

const formatted = (sitemap) => prettier.format(sitemap, { parser: 'html' });

(async () => {
  const fetchArticles = await fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  const articleList = [];
  fetchArticles.map((article) => articleList.push(article.id));

  // const pages = await globby([
  //   // include
  //   'pages/program/**/index.tsx',
  //   'pages/article/**/*.tsx',
  //   // exclude
  //   '!pages/_app.tsx',
  //   '!pages/_document.tsx',
  //   '!pages/index.tsx',
  //   '!pages/course/*.tsx',
  //   '!pages/login/*.tsx',
  //   '!pages/my/**/*.tsx',
  //   '!pages/program/**/product/*.tsx',
  //   '!pages/videos/**/url/*.tsx',
  // ]);

  // console.log('pages', pages);
  console.log('articleList', articleList);

  // 파일 경로를 도메인 형태로 변경
  // ../pages/category/index.tsx -> [domain]/category
  // ../pages/community/threads -> [domain]/community/threads
  // const pagesSitemap = `
  //     ${pages
  //       .map((page) => {
  //         const path = page
  //           .replace('pages/', '')
  //           .replace('.tsx', '')
  //           .replace(/\/index/g, '');
  //         const routePath = path === 'index' ? '' : path;
  //         return `
  //           <url>
  //             <loc>${DOMAIN}/${routePath}</loc>
  //             <lastmod>${getDate}</lastmod>
  //           </url>
  //         `;
  //       })
  //       .join('')}`;

  const pagesSitemap = `
  ${articleList.map((id) => {
    return `
      <url>
        <loc>${`${DOMAIN}/article/${id}`}</loc>
        <lastmod>${getDate}</lastmod>
      </url>
    `;
  })}`;

  const generatedSitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
          <urlset
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
            ${pagesSitemap}
          </urlset>
          `;

  const formattedSitemap = formatted(generatedSitemap);
  console.log('formattedSitemap', formattedSitemap);

  fs.writeFileSync('public/sitemap-test.xml', formattedSitemap, 'utf8');
})().catch((err) => console.log('sitemap', err));

