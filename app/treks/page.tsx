'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Users, 
  Star,
  Mountain,
  SlidersHorizontal
} from 'lucide-react'

// Mock data - in a real app, this would come from an API
const allTreks = [
  {
    id: 1,
    title: "Everest Base Camp Trek",
    location: "Nepal",
    duration: "14 days",
    difficulty: "Hard",
    rating: 4.9,
    reviews: 128,
    price: 1299,
    maxGroupSize: 12,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    highlights: ["Mountain Views", "Cultural Experience", "High Altitude"],
    category: "Mountains"
  },
  {
    id: 2,
    title: "Inca Trail to Machu Picchu",
    location: "Peru",
    duration: "4 days",
    difficulty: "Moderate",
    rating: 4.8,
    reviews: 95,
    price: 899,
    maxGroupSize: 16,
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    highlights: ["Ancient Ruins", "Mountain Passes", "Cloud Forest"],
    category: "Cultural"
  },
  {
    id: 3,
    title: "Swiss Alps Adventure",
    location: "Switzerland",
    duration: "7 days",
    difficulty: "Moderate",
    rating: 4.7,
    reviews: 76,
    price: 1499,
    maxGroupSize: 10,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    highlights: ["Alpine Meadows", "Glacier Views", "Mountain Huts"],
    category: "Mountains"
  },
  {
    id: 4,
    title: "Patagonia Wilderness",
    location: "Chile",
    duration: "10 days",
    difficulty: "Hard",
    rating: 4.9,
    reviews: 64,
    price: 1899,
    maxGroupSize: 8,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    highlights: ["Torres del Paine", "Glaciers", "Wildlife"],
    category: "Wilderness"
  },
  {
    id: 5,
    title: "Annapurna Circuit Trek",
    location: "Nepal",
    duration: "18 days",
    difficulty: "Hard",
    rating: 4.8,
    reviews: 89,
    price: 1599,
    maxGroupSize: 12,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    highlights: ["Mountain Passes", "Valley Views", "Local Villages"],
    category: "Mountains"
  },
  {
    id: 6,
    title: "Mount Kilimanjaro Trek",
    location: "Tanzania",
    duration: "8 days",
    difficulty: "Hard",
    rating: 4.9,
    reviews: 112,
    price: 2499,
    maxGroupSize: 10,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    highlights: ["Summit Views", "African Wildlife", "Diverse Landscapes"],
    category: "Mountains"
  }
]

const difficulties = ["All", "Easy", "Moderate", "Hard", "Expert"]
const categories = ["All", "Mountains", "Cultural", "Wilderness", "Coastal"]
const durations = ["All", "1-3 days", "4-7 days", "8-14 days", "15+ days"]

export default function TreksPage() {
  const [treks, setTreks] = useState(allTreks)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDuration, setSelectedDuration] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [showFilters, setShowFilters] = useState(false)

  const searchParams = useSearchParams()

  // Initialize from query param
  useEffect(() => {
    const q = searchParams.get('q') || ''
    if (q && q !== searchTerm) setSearchTerm(q)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  // Filter treks based on selected criteria
  useEffect(() => {
    let filtered = allTreks

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(trek => 
        trek.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trek.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Difficulty filter
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(trek => trek.difficulty === selectedDifficulty)
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(trek => trek.category === selectedCategory)
    }

    // Duration filter
    if (selectedDuration !== 'All') {
      const [min, max] = selectedDuration === '1-3 days' ? [1, 3] :
                         selectedDuration === '4-7 days' ? [4, 7] :
                         selectedDuration === '8-14 days' ? [8, 14] : [15, 999]
      
      filtered = filtered.filter(trek => {
        const days = parseInt(trek.duration.split(' ')[0])
        return days >= min && days <= max
      })
    }

    // Price filter
    filtered = filtered.filter(trek => 
      trek.price >= priceRange[0] && trek.price <= priceRange[1]
    )

    setTreks(filtered)
  }, [searchTerm, selectedDifficulty, selectedCategory, selectedDuration, priceRange])

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedDifficulty('All')
    setSelectedCategory('All')
    setSelectedDuration('All')
    setPriceRange([0, 3000])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-trek-600 to-trek-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Discover Amazing Treks</h1>
          <p className="text-xl text-trek-100 max-w-2xl mx-auto">
            Explore our collection of carefully curated trekking adventures 
            from around the world.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search treks by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trek-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center px-6 py-3 bg-trek-500 text-white rounded-lg hover:bg-trek-600 transition-colors duration-200"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trek-500 focus:border-transparent"
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trek-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trek-500 focus:border-transparent"
                >
                  {durations.map((duration) => (
                    <option key={duration} value={duration}>
                      {duration}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>

            {/* Reset Filters */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {treks.length} treks found
              </span>
              <button
                onClick={resetFilters}
                className="text-trek-600 hover:text-trek-700 text-sm font-medium"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {treks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treks.map((trek, index) => (
              <motion.div
                key={trek.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/treks/${trek.id}`}>
                  <div className="card overflow-hidden h-full">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={trek.image}
                        alt={trek.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Difficulty Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          trek.difficulty === 'Easy' ? 'bg-green-500 text-white' :
                          trek.difficulty === 'Moderate' ? 'bg-yellow-500 text-white' :
                          trek.difficulty === 'Hard' ? 'bg-red-500 text-white' :
                          'bg-purple-500 text-white'
                        }`}>
                          {trek.difficulty}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 text-trek-600 px-3 py-1 rounded-full text-sm font-bold">
                          ${trek.price}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-trek-600 transition-colors duration-200">
                          {trek.title}
                        </h3>
                        
                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{trek.location}</span>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">{trek.duration}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="w-4 h-4 mr-1" />
                            <span className="text-sm">Max {trek.maxGroupSize}</span>
                          </div>
                        </div>

                        {/* Highlights */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {trek.highlights.slice(0, 2).map((highlight, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-trek-100 text-trek-700 text-xs rounded-full"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>

                                             {/* Rating */}
                     <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center">
                         <div className="flex items-center">
                           {[...Array(5)].map((_, i) => (
                             <Star
                               key={i}
                               className={`w-4 h-4 ${
                                 i < Math.floor(trek.rating)
                                   ? 'text-yellow-400 fill-current'
                                   : 'text-gray-300'
                               }`}
                             />
                           ))}
                         </div>
                         <span className="ml-2 text-sm text-gray-600">
                           {trek.rating} ({trek.reviews} reviews)
                         </span>
                       </div>
                     </div>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-auto">
                        <div className="btn-primary text-center group-hover:bg-trek-600 transition-colors duration-200">
                          View Details
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Mountain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No treks found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters.
            </p>
            <button
              onClick={resetFilters}
              className="btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
