'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Clock, 
  Users, 
  Mountain, 
  Star, 
  Calendar,
  Heart,
  Share2,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import ReviewForm from '@/components/reviews/ReviewForm'

// Mock data - in a real app, this would come from an API
const trekData = {
  id: 1,
  title: "Everest Base Camp Trek",
  location: "Nepal",
  duration: "14 days",
  difficulty: "Hard",
  rating: 4.9,
  reviews: 128,
  price: 1299,
  maxGroupSize: 12,
  images: [
    "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  ],
  highlights: [
    "Breathtaking views of Mount Everest",
    "Experience Sherpa culture",
    "High altitude adventure",
    "UNESCO World Heritage sites"
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Kathmandu",
      description: "Welcome to Nepal! Transfer to hotel and trek briefing."
    },
    {
      day: 2,
      title: "Fly to Lukla, Trek to Phakding",
      description: "Scenic flight to Lukla and start of the trek."
    },
    {
      day: 3,
      title: "Trek to Namche Bazaar",
      description: "Ascend to the bustling Sherpa town of Namche."
    }
  ],
  included: [
    "All permits and fees",
    "Accommodation during trek",
    "Meals (breakfast, lunch, dinner)",
    "Experienced guide and porters",
    "Transportation to/from Lukla"
  ],
  excluded: [
    "International flights",
    "Travel insurance",
    "Personal expenses",
    "Tips for guides"
  ],
  requirements: [
    "Good physical fitness",
    "Previous trekking experience",
    "Medical clearance",
    "Proper trekking gear"
  ]
}

export default function TrekDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [guests, setGuests] = useState(1)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/treks" 
            className="inline-flex items-center text-trek-600 hover:text-trek-700 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Treks
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative h-96 rounded-2xl overflow-hidden mb-4">
                <img
                  src={trekData.images[selectedImage]}
                  alt={trekData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-3 rounded-full transition-colors duration-200 ${
                      isFavorite 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/90 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 bg-white/90 text-gray-700 rounded-full hover:bg-white transition-colors duration-200">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Difficulty Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                    {trekData.difficulty}
                  </span>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2">
                {trekData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index 
                        ? 'border-trek-500' 
                        : 'border-transparent hover:border-trek-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${trekData.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Trek Information */}
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {trekData.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{trekData.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-trek-600">
                    ${trekData.price}
                  </div>
                  <div className="text-gray-600">per person</div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(trekData.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {trekData.rating} ({trekData.reviews} reviews)
                </span>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-trek-500 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900">
                    {trekData.duration}
                  </div>
                  <div className="text-gray-600">Duration</div>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 text-trek-500 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900">
                    {trekData.maxGroupSize}
                  </div>
                  <div className="text-gray-600">Max Group Size</div>
                </div>
                <div className="text-center">
                  <Mountain className="w-8 h-8 text-trek-500 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900">
                    {trekData.difficulty}
                  </div>
                  <div className="text-gray-600">Difficulty</div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Highlights
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {trekData.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-trek-500 rounded-full mr-3" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Itinerary
                </h3>
                <div className="space-y-4">
                  {trekData.itinerary.map((day) => (
                    <div key={day.day} className="flex">
                      <div className="w-12 h-12 bg-trek-100 text-trek-600 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                        {day.day}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {day.title}
                        </h4>
                        <p className="text-gray-600">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included/Excluded */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {trekData.included.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    What's Not Included
                  </h3>
                  <ul className="space-y-2">
                    {trekData.excluded.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16">
            <ReviewForm trekId={params.id} onReviewUpdate={() => {}} />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Book This Trek
              </h3>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trek-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trek-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Person' : 'People'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-t pt-6">
                  <div className="flex justify-between text-lg font-semibold mb-4">
                    <span>Total Price</span>
                    <span>${(trekData.price * guests).toLocaleString()}</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-trek-500 hover:bg-trek-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
                  >
                    Book Now
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Need help? Contact our team
                </p>
                <a href="mailto:hello@trekadventures.com" className="text-trek-600 hover:text-trek-700 text-sm font-medium">
                  hello@trekadventures.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
