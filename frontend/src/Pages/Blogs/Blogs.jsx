import React from "react";
import { Link } from "react-router-dom";
import { FaCalendar, FaTag } from "react-icons/fa";
import blog1 from "../../assets/image/blog-1.jpg";
import blog2 from "../../assets/image/blog-2.jpg";
import blog3 from "../../assets/image/blog-3.jpg";

// Blog Data Array
const blogsData = [
    {
        id: 1,
        date: "21st May, 2021",
        image: blog1,
        tags: ["food", "burger", "pizza"],
        title: "Delicious Treats Await You!",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, earum.",
    },
    {
        id: 2,
        date: "21st May, 2021",
        image: blog2,
        tags: ["food", "burger", "pizza"],
        title: "New Tasty Recipes!",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, earum.",
    },
    {
        id: 3,
        date: "21st May, 2021",
        image: blog3,
        tags: ["food", "burger", "pizza"],
        title: "Satisfy Your Cravings",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, earum.",
    },
];

const Blogs = () => {
    return (
        <section className="container-page py-16 md:py-24" id="blogs">
            <div className="text-center mb-12">
                <span className="eyebrow text-lg">Our blogs</span>
                <h1 className="text-3xl font-medium text-[var(--color-ink)] mt-1">Our daily stories</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {blogsData.map((blog) => (
                    <div key={blog.id} className="bg-white rounded-2xl border border-[var(--color-line)] overflow-hidden hover:border-[var(--color-accent)] transition-colors">
                        <div className="relative group overflow-hidden">
                            <img src={blog.image} alt={blog.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform" />
                            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[var(--color-ink)] flex items-center text-xs font-medium">
                                <FaCalendar className="text-[var(--color-accent)] mr-1.5" /> {blog.date}
                            </span>
                        </div>

                        <div className="p-6">
                            <div className="flex flex-wrap gap-3 text-[var(--color-ink-soft)] text-xs mb-3">
                                {blog.tags.map((tag, index) => (
                                    <Link key={index} to={`/tags/${tag}`} className="flex items-center hover:text-[var(--color-accent)] transition-colors">
                                        <FaTag className="mr-1 text-[var(--color-accent)]" /> {tag}
                                    </Link>
                                ))}
                            </div>

                            <h3 className="text-lg font-medium text-[var(--color-ink)]">{blog.title}</h3>
                            <p className="text-[var(--color-ink-soft)] text-sm mt-2 mb-4">{blog.description}</p>

                            <Link
                                to={`/blog/${blog.id}`}
                                className="inline-block text-sm font-medium border-b border-[var(--color-ink)] pb-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                            >
                                Read more →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Blogs;
