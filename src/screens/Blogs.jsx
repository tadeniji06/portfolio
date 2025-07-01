import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import client from "../utils/sanity";
import { Link } from "react-router-dom";
import SEO from "../services/SEO";

const Blogs = () => {
	const [posts, setPosts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [loading, setLoading] = useState(true);
	const [visiblePosts, setVisiblePosts] = useState(4); // New state for pagination
	const POSTS_PER_PAGE = 3;

	useEffect(() => {
		// Fetch posts and categories
		Promise.all([
			client.fetch(`*[_type == "post"] | order(publishedAt desc) {
        title,
        slug,
        publishedAt,
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
        body[0...2] {
          children[0] {
            text
          }
        }
      }`),
			client.fetch(`*[_type == "category"] {
        _id,
        title
      }`),
		])
			.then(([postsData, categoriesData]) => {
				setPosts(postsData);
				setCategories(categoriesData);
				setLoading(false);
			})
			.catch((error) => {
				console.error(error);
				setLoading(false);
			});
	}, []);

	// Reset visible posts when category changes
	useEffect(() => {
		setVisiblePosts(POSTS_PER_PAGE);
	}, [selectedCategory]);

	const filteredPosts =
		selectedCategory === "all"
			? posts
			: posts.filter((post) =>
					post.categories?.some((cat) => cat._id === selectedCategory)
			  );

	const displayedPosts = filteredPosts.slice(0, visiblePosts);
	const hasMorePosts = visiblePosts < filteredPosts.length;

	const loadMorePosts = () => {
		setVisiblePosts((prev) => prev + POSTS_PER_PAGE);
	};

	const getExcerpt = (body) => {
		if (!body || !body[0]?.children?.[0]?.text) return "Read more...";
		return body[0].children[0].text.substring(0, 150) + "...";
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: "easeOut",
			},
		},
	};

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
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

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8'>
			<SEO
				title='Blog Posts'
				description='Read articles about web development, design and more.'
			/>

			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='max-w-7xl mx-auto'
			>
				<div className='text-center mb-12'>
					<motion.h1
						className='text-5xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-purple-400 bg-clip-text text-transparent'
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.7, delay: 0.2 }}
					>
						Latest Blog Posts
					</motion.h1>
					<motion.p
						className='text-gray-300 text-lg max-w-2xl mx-auto'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						Discover insights, tutorials, and thoughts on web
						development, design, and technology
					</motion.p>
				</div>

				{/* Category Filter */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className='mb-8 flex flex-wrap justify-center gap-3'
				>
					<button
						onClick={() => setSelectedCategory("all")}
						className={`px-6 py-2 rounded-full transition-all duration-300 ${
							selectedCategory === "all"
								? "bg-neon-blue text-white shadow-lg shadow-neon-blue/25"
								: "bg-white/10 text-gray-300 hover:bg-white/20"
						}`}
					>
						All Posts
					</button>
					{categories.map((category) => (
						<button
							key={category._id}
							onClick={() => setSelectedCategory(category._id)}
							className={`px-6 py-2 rounded-full transition-all duration-300 ${
								selectedCategory === category._id
									? "bg-neon-blue text-white shadow-lg shadow-neon-blue/25"
									: "bg-white/10 text-gray-300 hover:bg-white/20"
							}`}
						>
							{category.title}
						</button>
					))}
				</motion.div>

				{/* Blog Posts Grid */}
				<motion.div
					variants={containerVariants}
					initial='hidden'
					animate='visible'
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
				>
					<AnimatePresence mode='wait'>
						{displayedPosts.map((post, i) => (
							<motion.div
								key={post.slug.current}
								variants={cardVariants}
								layout
								className='group'
							>
								<Link to={`/blogs/${post.slug.current}`}>
									<motion.article
										whileHover={{ y: -5 }}
										transition={{ duration: 0.3 }}
										className='bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-neon-blue/50 transition-all duration-300 h-full flex flex-col'
									>
										{post.mainImage?.asset?.url && (
											<div className='relative overflow-hidden h-48'>
												<motion.img
													src={post.mainImage.asset.url}
													alt={post.mainImage.alt || post.title}
													className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
													whileHover={{ scale: 1.05 }}
												/>
												<div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
											</div>
										)}

										<div className='p-6 flex-1 flex flex-col'>
											<div className='flex-1'>
												<div className='flex flex-wrap gap-2 mb-3'>
													{post.categories?.map((category) => (
														<span
															key={category._id}
															className='px-3 py-1 text-xs font-medium bg-neon-blue/20 text-neon-blue rounded-full'
														>
															{category.title}
														</span>
													))}
												</div>

												<h2 className='text-xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors duration-300 line-clamp-2'>
													{post.title}
												</h2>

												<p className='text-gray-400 text-sm mb-4 line-clamp-3'>
													{getExcerpt(post.body)}
												</p>
											</div>

											<div className='flex items-center justify-between text-sm text-gray-500'>
												<time>
													{new Date(
														post.publishedAt
													).toLocaleDateString("en-US", {
														year: "numeric",
														month: "short",
														day: "numeric",
													})}
												</time>
												<motion.span
													className='text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300'
													whileHover={{ x: 5 }}
												>
													Read more →
												</motion.span>
											</div>
										</div>
									</motion.article>
								</Link>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>

				{/* Show More Button */}
				{hasMorePosts && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className='flex justify-center mt-12'
					>
						<motion.button
							onClick={loadMorePosts}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className='px-8 py-3 bg-gradient-to-r from-neon-blue to-purple-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 flex items-center gap-2'
						>
							Show More Posts
							<motion.span
								animate={{ y: [0, 3, 0] }}
								transition={{ duration: 1.5, repeat: Infinity }}
							>
								↓
							</motion.span>
						</motion.button>
					</motion.div>
				)}

				{/* Posts count indicator */}
				{filteredPosts.length > 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
						className='text-center mt-6'
					>
						<p className='text-gray-400 text-sm'>
							Showing {displayedPosts.length} of{" "}
							{filteredPosts.length} posts
						</p>
					</motion.div>
				)}

				{filteredPosts.length === 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='text-center py-12'
					>
						<p className='text-gray-400 text-lg'>
							No posts found in this category.
						</p>
					</motion.div>
				)}
			</motion.div>
		</div>
	);
};

export default Blogs;
