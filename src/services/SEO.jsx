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

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title || defaultTitle}</title>
      <meta
        name='description'
        content={description || defaultDescription}
      />
      <meta name='keywords' content={keywords || defaultKeywords} />
      <meta name='author' content='Olutunmise Adeniji' />
      <meta name='robots' content='index, follow' />

      {/* Canonical URL */}
      <link rel='canonical' href={canonicalUrl || siteUrl} />

      {/* Open Graph Meta Tags */}
      <meta property='og:title' content={title || defaultTitle} />
      <meta
        property='og:description'
        content={description || defaultDescription}
      />
      <meta property='og:image' content={ogImage || defaultOgImage} />
      <meta property='og:url' content={ogUrl || siteUrl} />
      <meta property='og:type' content={ogType} />
      <meta
        property='og:site_name'
        content='Olutunmise Adeniji - FullStack Developer'
      />
      <meta property='og:locale' content='en_NG' />

      {/* Twitter Card Meta Tags */}
      <meta name='twitter:card' content={twitterCard} />
      <meta name='twitter:title' content={title || defaultTitle} />
      <meta
        name='twitter:description'
        content={description || defaultDescription}
      />
      <meta name='twitter:image' content={ogImage || defaultOgImage} />

      {/* Geo Meta Tags */}
      <meta name='geo.region' content='NG' />
      <meta name='geo.placename' content='Lagos' />
      <meta name='geo.position' content='6.5244;3.3792' />
      <meta name='ICBM' content='6.5244, 3.3792' />

      {/* Structured Data */}
      <script type='application/ld+json'>
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Olutunmise Adeniji",
          url: "https://olutunmise.netlify.app",
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
};

export default SEO;
