import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const SEO = ({
  title,
  description,
  keywords,
  ogImage,
  ogUrl,
  ogType = "website",
  twitterCard = "summary_large_image",
  canonicalUrl,
  author,
  publishedAt,
  isBlogPost = false,
}) => {
  const defaultTitle =
    "Top Web & Frontend Developer in Nigeria | Olutunmise Adeniji";
  const defaultDescription =
    "Experienced Web and Frontend Developer based in Nigeria specializing in React, JavaScript, and modern web technologies.";
  const defaultKeywords =
    "web developer Nigeria, frontend developer Nigeria, React developer, JavaScript developer, Nigerian developer, web development services, frontend expert Nigeria";
  const defaultOgImage =
    "https://olutunmise.netlify.app/profile-image.jpg";
  const siteUrl = "https://olutunmise.netlify.app";

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalOgImage = ogImage || defaultOgImage;
  const finalOgUrl = ogUrl || siteUrl;
  const finalCanonicalUrl = canonicalUrl || siteUrl;

  const schemaBlogPost = isBlogPost
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: finalTitle,
        description: finalDescription,
        image: finalOgImage,
        author: {
          "@type": "Person",
          name: author || "Olutunmise Adeniji",
        },
        publisher: {
          "@type": "Organization",
          name: "Olutunmise Adeniji",
          logo: {
            "@type": "ImageObject",
            url: defaultOgImage,
          },
        },
        datePublished: publishedAt || new Date().toISOString(),
        dateModified: publishedAt || new Date().toISOString(),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": finalOgUrl,
        },
      }
    : null;

  return (
    <Helmet>
      {/* Basic */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Olutunmise Adeniji" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:url" content={finalOgUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Olutunmise Adeniji - FullStack Developer" />
      <meta property="og:locale" content="en_NG" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />

      {/* Geo */}
      <meta name="geo.region" content="NG" />
      <meta name="geo.placename" content="Lagos" />
      <meta name="geo.position" content="6.5244;3.3792" />
      <meta name="ICBM" content="6.5244, 3.3792" />

      {/* Schema: Person */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Olutunmise Adeniji",
          url: siteUrl,
          jobTitle: "Web & Frontend Developer",
          worksFor: {
            "@type": "Organization",
            name: "Freelance",
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lagos",
            addressRegion: "Lagos",
            addressCountry: "Nigeria",
          },
          sameAs: [
            "https://github.com/tadeniji06",
            "https://twitter.com/tade_niji06",
          ],
        })}
      </script>

      {/* Schema: BlogPosting */}
      {isBlogPost && (
        <script type="application/ld+json">
          {JSON.stringify(schemaBlogPost)}
        </script>
      )}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  ogImage: PropTypes.string,
  ogUrl: PropTypes.string,
  ogType: PropTypes.string,
  twitterCard: PropTypes.string,
  canonicalUrl: PropTypes.string,
  author: PropTypes.string,
  publishedAt: PropTypes.string,
  isBlogPost: PropTypes.bool,
};

export default SEO;
