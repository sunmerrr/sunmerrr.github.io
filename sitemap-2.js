// pages/sitemap.xml.tsx
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { getServerSideSitemap } from 'next-sitemap';
import { API_ENDPOINT } from '@common/constant';

export const Sitemap = ({ articles }) => {
  const lastmod = new Date().toISOString();

  const articleSitemap = `${articles
    .map((article) => {
      return `
      <url>
        <loc>${`https://www.grownbetter.com/article/${article.id}`}</loc>
        <lastmod>${lastmod}</lastmod>
      </url>`;
    })
    .join('')}
  `;

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${articleSitemap}
    </urlset>
  `;

  return generatedSitemap;
};

export const getStaticProps = async (ctx) => {
  const articleList = await fetch(`${API_ENDPOINT}/article/getAll?category=''`).then((res) => res.json()); // article 전체 목록
  const programList = await fetch(`${API_ENDPOINT}/program/getAllProgramShort`).then((res) => res.json()); // program 전체 목록

  const articles = articleList.articles;
  const lastmod = new Date().toISOString();

  // 정적 페이지
  const defaultFields = [
    {
      loc: `https://www.grownbetter.com/`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod,
    },
    {
      loc: `https://www.grownbetter.com/article`,
      changefreq: 'daily',
      priority: 0.9,
      lastmod,
    },
  ];

  // 동적 페이지
  const articleFields = articles.map((article) => ({
    loc: `https://www.grownbetter.com/article/${article.id}`,
    changefreq: 'daily',
    priority: 1.0,
    lastmod,
  }));

  const programFields = programList.map((program) => ({
    loc: `https://www.grownbetter.com/program/${program.id}`,
    changefreq: 'weekly',
    priority: 1.0,
    lastmod,
  }));

  const fields = [...defaultFields, ...articleFields, ...programFields];

  // getServerSideSitemap('application/xml 응답헤더',  'xml 형식 데이터')
  const constext = { ...ctx, resolvedUrl: '/sitemap-test.xml' };
  // return getServerSideSitemap(constext, fields);
  return { props: { articles } };
};

export default Sitemap;
