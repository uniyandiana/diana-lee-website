import { sanityFetch } from "@/lib/sanity";
import OpportunitiesClient from "@/components/OpportunitiesClient";

export const metadata = {
  title: "Opportunities | Diana Lee",
  description: "Curated opportunities for career development, entrepreneurship, and personal growth - events, competitions, grants, and resources across Hong Kong, UK, and internationally.",
};

export default async function Opportunities() {
  // Fetch all opportunities from Sanity
  const allOpportunities = await sanityFetch({
    query: `*[_type == "opportunity"] | order(deadline asc) {
      _id,
      title,
      slug,
      description,
      url,
      type,
      region,
      tags,
      deadline,
      dateLabel,
      language,
      featured
    }`,
  });

  // Separate active and expired opportunities
  const now = new Date();
  const activeOpportunities = allOpportunities.filter((opp: any) =>
    new Date(opp.deadline) >= now
  );
  const expiredOpportunities = allOpportunities.filter((opp: any) =>
    new Date(opp.deadline) < now
  );

  return (
    <OpportunitiesClient
      activeOpportunities={activeOpportunities}
      expiredOpportunities={expiredOpportunities}
    />
  );
}
