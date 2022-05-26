import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { getServerSideSitemap } from 'next-sitemap';
import { API_ENDPOINT } from '@common/constant';
import prettier from 'prettier';

export async function getStaticProps() {
  const articleList = await fetch(`${API_ENDPOINT}/article/getAll?category=''`).then((res) => res.json()); // article 전체 목록
  const programList = await fetch(`${API_ENDPOINT}/program/getAllProgramShort`).then((res) => res.json()); // program 전체 목록

  const articles = articleList.articles;
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
}
export default () => {
  return;
};