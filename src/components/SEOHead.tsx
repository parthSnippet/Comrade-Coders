import { Helmet } from "react-helmet-async";

const SITE_NAME = "Comrade Coders";
const BASE_URL = "https://www.comerade-coders.com";
const DEFAULT_IMAGE = `${BASE_URL}/CClogo.png`;

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = DEFAULT_IMAGE,
  noIndex = false,
  structuredData,
}: SEOHeadProps) {
  const fullTitle = `${title} – ${SITE_NAME}`;

  const canonicalUrl = canonical
    ? new URL(canonical, BASE_URL).toString()
    : undefined;

  const siteStructuredData: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
      logo: DEFAULT_IMAGE,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: BASE_URL,
    },
  ];

  const customStructuredData = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  const allStructuredData = [
    ...siteStructuredData,
    ...customStructuredData,
  ];

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{fullTitle}</title>

      <meta name="description" content={description} />

      <meta
        name="robots"
        content={
          noIndex
            ? "noindex, nofollow"
            : "index, follow"
        }
      />

      {canonicalUrl && (
        <link rel="canonical" href={canonicalUrl} />
      )}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {canonicalUrl && (
        <meta property="og:url" content={canonicalUrl} />
      )}

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      <meta name="twitter:title" content={fullTitle} />
      <meta
        name="twitter:description"
        content={description}
      />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {allStructuredData.map((schema, index) => (
        <script
          key={`structured-data-${index}`}
          type="application/ld+json"
        >
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}