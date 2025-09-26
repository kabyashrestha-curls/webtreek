'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  Map, 
  Users, 
  Heart, 
  Star, 
  Globe,
  Camera,
  Award
} from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Expert guides, certified equipment, and comprehensive safety protocols ensure your adventure is both thrilling and secure."
  },
  {
    icon: Map,
    title: "Expert Navigation",
    description: "Our experienced guides know every trail, ensuring you discover the most beautiful and safe routes."
  },
  {
    icon: Users,
    title: "Small Groups",
    description: "Intimate group sizes for personalized attention and a more authentic trekking experience."
  },
  {
    icon: Heart,
    title: "Eco-Friendly",
    description: "We're committed to sustainable tourism and preserving the natural beauty of our trekking destinations."
  },
  {
    icon: Star,
    title: "Premium Experience",
    description: "From comfortable accommodations to gourmet meals, we ensure every detail exceeds your expectations."
  },
  {
    icon: Globe,
    title: "Global Destinations",
    description: "Explore diverse landscapes across multiple continents, from snow-capped peaks to tropical rainforests."
  },
  {
    icon: Camera,
    title: "Photo Opportunities",
    description: "Capture breathtaking moments with our guides who know the best spots for stunning photographs."
  },
  {
    icon: Award,
    title: "Certified Excellence",
    description: "Award-winning service recognized by leading travel organizations and thousands of satisfied trekkers."
  }
]

const Features = () => {
  return (
    <section className="py-20 bg-white">
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
            Why Choose TrekAdventures?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine decades of experience with cutting-edge safety standards to deliver 
            unforgettable trekking adventures that exceed your expectations.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="card p-8 h-full hover:shadow-2xl transition-all duration-300">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-trek-500 to-trek-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-trek-600 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-trek-50 to-nature-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Start Your Adventure?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of adventurers who have already discovered the world's most 
              spectacular trails with TrekAdventures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Browse All Treks
              </button>
              <button className="btn-outline text-lg px-8 py-4">
                Contact Our Team
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features
