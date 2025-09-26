'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    comment: "The Everest Base Camp trek was absolutely incredible! The guides were professional, the scenery was breathtaking, and the whole experience exceeded my expectations. I felt safe throughout the entire journey.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    trek: "Everest Base Camp Trek"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Toronto, Canada",
    rating: 5,
    comment: "I've been on several treks with TrekAdventures, and they never disappoint. The Inca Trail was perfectly organized, and our guide shared fascinating historical insights that made the experience even more special.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    trek: "Inca Trail to Machu Picchu"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Madrid, Spain",
    rating: 5,
    comment: "As a solo female traveler, I was initially nervous about trekking alone. But the team made me feel completely safe and included. The Swiss Alps trek was magical, and I made friends for life!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    trek: "Swiss Alps Adventure"
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Melbourne, Australia",
    rating: 5,
    comment: "The Patagonia trek was challenging but absolutely worth it. The guides were incredibly knowledgeable about the local wildlife and geology. The views were spectacular, and the group size was perfect.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    trek: "Patagonia Wilderness"
  },
  {
    id: 5,
    name: "Lisa Wang",
    location: "Singapore",
    rating: 5,
    comment: "I'm not an experienced hiker, but the team made sure I was well-prepared and comfortable. The Annapurna Circuit was challenging but manageable, and the cultural experiences were unforgettable.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    trek: "Annapurna Circuit Trek"
  },
  {
    id: 6,
    name: "James Wilson",
    location: "London, UK",
    rating: 5,
    comment: "Professional, safe, and incredibly fun! The Kilimanjaro trek was a bucket list item for me, and TrekAdventures made it happen perfectly. The guides were experts, and the equipment was top-notch.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    trek: "Mount Kilimanjaro Trek"
  }
]

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Trekkers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what adventurers from around the world 
            have to say about their TrekAdventures experience.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card p-6 h-full relative">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-trek-200 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <Quote className="w-8 h-8" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Comment */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.comment}"
                </blockquote>

                {/* Trek Name */}
                <div className="text-sm text-trek-600 font-medium mb-4">
                  {testimonial.trek}
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-trek-50 to-nature-50 rounded-3xl p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Share Your Experience
            </h3>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-6">
              After completing your trek, share your experience and help other adventurers 
              discover the perfect adventure for them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/treks" className="btn-primary text-lg px-8 py-4">
                Browse Treks
              </a>
              <a href="/contact" className="btn-outline text-lg px-8 py-4">
                Contact Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
