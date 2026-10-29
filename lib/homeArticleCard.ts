/** Slim article row for the home News tab. Kept free of `reports.ts` so client
 *  components can import this type without pulling the seed report corpus. */
export type HomeArticleCard = {
  slug: string;
  date: string;
  displayDate: string;
  tickerLabel: string | null;
  category: string;
  categoryBg: string;
  categoryFg: string;
  title: string;
  excerpt: string;
};
