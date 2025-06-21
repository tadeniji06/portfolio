import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import client from "../utils/sanity";
import SEO from "../services/SEO";

// Custom components for PortableText rendering
const portableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className='text-3xl font-bold mb-6 text-white'>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className='text-2xl font-bold mb-4 text-white'>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className='text-xl font-semibold mb-3 text-white'>{children}</h3>
    ),
    normal: ({ children }) => (
      <p className='mb-4 text-gray-300 leading-relaxed'>{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className='border-l-4 border-neon-blue pl-6 my-6 italic text-gray-300 bg-white/5 py-4 rounded-r-lg'>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className='font-bold text-white'>{children}</strong>
    ),
    em: ({ children }) => (
      <em className='italic text-neon-blue'>{children}</em>
    ),
    link: ({ value, children }) => (
      <a
        href={value.href}
        target='_blank'
        rel='noopener noreferrer'
        className='text-neon-blue hover:text-purple-400 underline transition-colors duration-200'
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='my-8'
      >
        <img
          src={value.asset.url}
          alt={value.alt || ""}
          className='w-full rounded-lg shadow-2xl'
        />
        {value.caption && (
          <p className='text-center text-sm text-gray-400 mt-2 italic'>
            {value.caption}
          </p>
        )}
      </motion.div>
    ),
    code: ({ value }) => (
      <motion.pre
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-gray-900 p-4 rounded-lg overflow-x-auto my-6 border border-gray-700'
      >
        <code className='text-green-400 text-sm'>{value.code}</code>
      </motion.pre>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className='list-disc list-inside mb-4 text-gray-300 space-y-2'>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className='list-decimal list-inside mb-4 text-gray-300 space-y-2'>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className='text-gray-300'>{children}</li>
    ),
    number: ({ children }) => (
      <li className='text-gray-300'>{children}</li>
    ),
  },
};

const Blog = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post" && slug.current == $slug][0]{
        title,
        publishedAt,
        body,
        mainImage {
          asset -> {
            url,
            alt
          }
        },
        categories[]-> {
          title,
          _id
        },
        author-> {
          name,
          image {
            asset -> {
              url
            }
          }
        }
      }`,
        { slug }
      )
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className='w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full'
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-white mb-4'>
            Post not found
          </h1>
          <p className='text-gray-400'>
            The blog post you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
      <SEO
        title={`${post.title} | Blog - Olutunmise Adeniji`}
        description={
          post.body?.[0]?.children?.[0]?.text?.slice(0, 160) ||
          "Explore this blog post from Olutunmise Adeniji, a seasoned frontend developer."
        }
        keywords={
          post.categories?.map((cat) => cat.title).join(", ") || ""
        }
        ogImage={post.mainImage?.asset?.url}
        canonicalUrl={`https://olutunmise.netlify.app/blogs/${slug}`}
        ogUrl={`https://olutunmise.netlify.app/blogs/${slug}`}
        author={post.author?.name}
        publishedAt={post.publishedAt}
        isBlogPost={true}
      />

      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='max-w-4xl mx-auto px-6 py-12'
      >
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mb-12'
        >
          <div className='flex flex-wrap gap-2 mb-6'>
            {post.categories?.map((category) => (
              <span
                key={category._id}
                className='px-4 py-2 text-sm font-medium bg-neon-blue/20 text-neon-blue rounded-full'
              >
                {category.title}
              </span>
            ))}
          </div>

          <h1 className='text-4xl md:text-5xl font-bold mb-6 text-white leading-tight'>
            {post.title}
          </h1>

          <div className='flex items-center gap-4 text-gray-400 mb-8'>
            {post.author && (
              <div className='flex items-center gap-3'>
                {post.author.image?.asset?.url && (
                  <img
                    src={post.author.image.asset.url}
                    alt={post.author.name}
                    className='w-10 h-10 rounded-full object-cover'
                  />
                )}
                <span className='font-medium'>{post.author.name}</span>
              </div>
            )}
            <span>•</span>
            <time>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </motion.header>

        {/* Main Image */}
        {post.mainImage?.asset?.url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mb-12'
          >
            <img
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt || post.title}
              className='w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl'
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='prose prose-invert prose-lg max-w-none'
        >
          {post.body && (
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          )}
        </motion.div>

        {/* Back to Blog */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='mt-16 pt-8 border-t border-gray-700'
        >
          <Link
            to='/blogs'
            className='inline-flex items-center gap-2 text-neon-blue hover:text-purple-400 transition-colors duration-200 font-medium'
          >
            ← Back to all posts
          </Link>
        </motion.div>
      </motion.article>
    </div>
  );
};

export default Blog;
