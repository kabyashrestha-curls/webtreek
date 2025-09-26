'use client'

import { motion } from 'framer-motion'
import { 
  Mountain, 
  Users, 
  Shield, 
  Heart, 
  Globe, 
  Award,
  MapPin,
  Clock
} from 'lucide-react'

const AboutPage = () => {
  const stats = [
    { icon: Mountain, number: '150+', label: 'Trekking Routes' },
    { icon: Users, number: '5000+', label: 'Happy Trekkers' },
    { icon: Clock, number: '25+', label: 'Years Experience' },
    { icon: Award, number: '98%', label: 'Success Rate' }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Your safety is our top priority. We maintain the highest safety standards with certified guides and equipment.'
    },
    {
      icon: Heart,
      title: 'Environmental Responsibility',
      description: 'We\'re committed to sustainable tourism and preserving the natural beauty of our trekking destinations.'
    },
    {
      icon: Users,
      title: 'Community Impact',
      description: 'We support local communities and ensure fair compensation for guides and porters.'
    },
    {
      icon: Globe,
      title: 'Cultural Respect',
      description: 'We respect and celebrate local cultures, traditions, and customs in all our destinations.'
    }
  ]

  const team = [
    {
      name: 'Nabin Poudel',
      role: 'Founder & CEO',
      image: '',
      bio: 'Former mountain guide with 20+ years of experience in the Himalayas.'
    },
    {
      name: 'Kabya shrestha',
      role: 'Head of Operations',
      image: '',
      bio: 'Expert in logistics and safety protocols for high-altitude expeditions.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-trek-600 to-trek-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-6"
          >
            About TrekAdventures
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-trek-100 max-w-3xl mx-auto"
          >
            We're passionate about connecting people with the world's most spectacular 
            landscapes through safe, sustainable, and unforgettable trekking experiences.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Our Story
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              Founded in 1998 by a group of passionate mountaineers, TrekAdventures began 
              with a simple mission: to make the world's most incredible trekking destinations 
              accessible to everyone while maintaining the highest standards of safety and 
              environmental responsibility.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              What started as a small operation in the Himalayas has grown into a global 
              community of adventure seekers, expert guides, and local partners who share 
              our vision of sustainable adventure tourism.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-trek-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-trek-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <div className="w-16 h-16 bg-trek-100 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-trek-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-trek-600 font-medium mb-4">
                  {member.role}
                </div>
                <p className="text-gray-600">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
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
              <a href="/treks" className="btn-primary text-lg px-8 py-4">
                Browse All Treks
              </a>
              <a href="/contact" className="btn-outline text-lg px-8 py-4">
                Contact Our Team
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutPage
