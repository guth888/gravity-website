import { Link } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/Header";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-900">
      {/* Header */}
      <Header />

      {/* Content */}
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-8 text-gray-900">
            All articles
          </h1>

          {/* Navigation Bar */}
          <div className="flex items-center justify-between mb-12 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-6 overflow-x-auto">
              <button className="text-gray-900 font-medium whitespace-nowrap border-b-2 border-gray-900 pb-2">
                All
              </button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
                Company Updates
              </button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
                Product Updates
              </button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
                Industry Insights
              </button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
                Case Studies
              </button>
            </div>
            
            {/* Search Icon */}
            <button className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Coming Soon Message */}
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="mb-8">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-headline font-semibold mb-4 text-gray-900">Coming Soon</h2>
            <p className="text-gray-600 mb-8 text-lg">
              We're preparing our first articles on AI advertising, LLM monetization, and the future of contextual ads. Subscribe to get notified when we publish.
            </p>
            
            {/* Email Subscribe */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="your@email.com"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-white border border-gray-300 rounded-full px-5 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              />
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap">
                Notify me
              </button>
            </div>
          </div>

          {/* Placeholder Article Grid (Hidden but shows structure) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 opacity-0 pointer-events-none">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <article key={i} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Article Title</h3>
                  <p className="text-sm text-gray-500">Date • X min read</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
