export type Article = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  isPremium: boolean;
  pdfUrl?: string;
  tags?: string[];
};

export const articles: Article[] = [
  {
    id: "1",
    slug: "triphala-health-benefits",
    title: "Triphala: Comprehensive Health Benefits",
    summary:
      "An overview of Triphala in classical texts, formulation details, and modern evidence.",
    content:
      "Full content about Triphala, its formulation ratios, indications, contraindications, and references.",
    isPremium: false,
    tags: ["formulations", "classical", "evidence"],
  },
  {
    id: "2",
    slug: "ashwagandha-stress-adaptogen",
    title: "Ashwagandha as an Adaptogen: Clinical Perspective",
    summary:
      "Summarized insights on Ashwagandha's adaptogenic role with dosage, standardization, and references.",
    content:
      "Detailed clinical guidance, case notes, titration strategies, and standardized extract comparisons.",
    isPremium: true,
    pdfUrl: undefined,
    tags: ["adaptogen", "clinical"],
  },
];
