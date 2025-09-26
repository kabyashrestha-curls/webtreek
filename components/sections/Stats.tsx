'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Users, MapPin, Star, Award } from 'lucide-react'

const stats = [
  {
    icon: Users,
    number: 5000,
    suffix: '+',
    label: 'Happy Trekkers',
    color: 'text-trek-500'
  },
  {
    icon: MapPin,
    number: 150,
    suffix: '+',
    label: 'Trekking Routes',
    color: 'text-nature-500'
  },
  {
    icon: Star,
    number: 98,
    suffix: '%',
    label: 'Success Rate',
    color: 'text-yellow-500'
  },
  {
    icon: Award,
    number: 25,
    suffix: '+',
    label: 'Years Experience',
    color: 'text-purple-500'
  }
]

const Stats = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    if (isInView) {
      const duration = 2000 // 2 seconds
      const steps = 60
      const stepValue = stats.map(stat => stat.number / steps)
      
      let currentStep = 0
      const timer = setInterval(() => {
        currentStep++
        setCounts(prev => prev.map((count, index) => 
          Math.min(count + stepValue[index], stats[index].number)
        ))
        
        if (currentStep >= steps) {
          clearInterval(timer)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView])

  return (
    <section className="py-20 bg-gradient-to-br from-trek-600 via-trek-700 to-trek-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-trek-100 max-w-2xl mx-auto">
            Discover the scale of our adventures and the trust we've built with trekkers worldwide.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>

                {/* Number */}
                <div className="text-4xl font-bold text-white mb-2">
                  {Math.floor(counts[index])}{stat.suffix}
                </div>

                {/* Label */}
                <div className="text-trek-100 font-medium">
                  {stat.label}
                </div>
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
          className="mt-16 text-center"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Trusted by Adventure Seekers Worldwide
            </h3>
            <p className="text-trek-100 max-w-2xl mx-auto">
              From first-time hikers to experienced mountaineers, we've guided adventurers 
              of all skill levels through some of the world's most challenging and beautiful terrain.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Stats
