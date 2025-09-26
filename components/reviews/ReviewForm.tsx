'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Star, Edit2, Trash2, X, Check } from 'lucide-react'
import toast from 'react-hot-toast'

interface Review {
  id: string
  rating: number
  comment?: string
  createdAt: string
  user: {
    id: string
    name?: string
    image?: string
  }
}

interface ReviewFormProps {
  trekId: string
  onReviewUpdate: () => void
}

const ReviewForm = ({ trekId, onReviewUpdate }: ReviewFormProps) => {
  const { data: session } = useSession()
  const [reviews, setReviews] = useState<Review[]>([])
  const [userReview, setUserReview] = useState<Review | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    rating: 5,
    comment: ''
  })

  // Fetch reviews for this trek
  useEffect(() => {
    fetchReviews()
  }, [trekId])

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?trekId=${trekId}`)
      if (response.ok) {
        const data = await response.json()
        setReviews(data)
        
        // Check if current user has already reviewed
        if (session?.user?.email) {
          const userReview = data.find((review: Review) => 
            review.user.name === session.user?.name || 
            review.user.email === session.user?.email
          )
          setUserReview(userReview || null)
        }
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) {
      toast.error('Please sign in to leave a review')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trekId,
          rating: formData.rating,
          comment: formData.comment
        })
      })

      if (response.ok) {
        toast.success('Review submitted successfully!')
        setFormData({ rating: 5, comment: '' })
        fetchReviews()
        onReviewUpdate()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to submit review')
      }
    } catch (error) {
      toast.error('Failed to submit review')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdate = async () => {
    if (!userReview) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/reviews/${userReview.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: formData.rating,
          comment: formData.comment
        })
      })

      if (response.ok) {
        toast.success('Review updated successfully!')
        setIsEditing(false)
        fetchReviews()
        onReviewUpdate()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to update review')
      }
    } catch (error) {
      toast.error('Failed to update review')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!userReview || !confirm('Are you sure you want to delete your review?')) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/reviews/${userReview.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Review deleted successfully!')
        setUserReview(null)
        setFormData({ rating: 5, comment: '' })
        fetchReviews()
        onReviewUpdate()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to delete review')
      }
    } catch (error) {
      toast.error('Failed to delete review')
    } finally {
      setIsSubmitting(false)
    }
  }

  const startEditing = () => {
    if (userReview) {
      setFormData({
        rating: userReview.rating,
        comment: userReview.comment || ''
      })
      setIsEditing(true)
    }
  }

  const cancelEditing = () => {
    setIsEditing(false)
    if (userReview) {
      setFormData({
        rating: userReview.rating,
        comment: userReview.comment || ''
      })
    }
  }

  if (!session) {
    return (
      <div className="bg-gray-50 rounded-2xl p-6 text-center">
        <p className="text-gray-600 mb-4">Please sign in to leave a review</p>
        <button className="btn-primary">Sign In</button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* User's Review Form */}
      {!userReview && !isEditing && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Write a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="text-2xl hover:scale-110 transition-transform duration-200"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= formData.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Comment (optional)
              </label>
              <textarea
                id="comment"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                rows={4}
                className="input-field resize-none"
                placeholder="Share your experience..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      )}

      {/* Edit Review Form */}
      {isEditing && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Edit Review</h3>
            <button
              onClick={cancelEditing}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="text-2xl hover:scale-110 transition-transform duration-200"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= formData.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="edit-comment" className="block text-sm font-medium text-gray-700 mb-2">
                Comment
              </label>
              <textarea
                id="edit-comment"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                rows={4}
                className="input-field resize-none"
                placeholder="Share your experience..."
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleUpdate}
                disabled={isSubmitting}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                {isSubmitting ? 'Updating...' : 'Update Review'}
              </button>
              <button
                onClick={handleDelete}
                disabled={isSubmitting}
                className="btn-outline border-red-500 text-red-500 hover:bg-red-50 disabled:opacity-50"
              >
                {isSubmitting ? 'Deleting...' : 'Delete Review'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User's Existing Review */}
      {userReview && !isEditing && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Your Review</h3>
              <p className="text-sm text-gray-600">
                {new Date(userReview.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={startEditing}
              className="text-trek-600 hover:text-trek-700 transition-colors duration-200"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= userReview.rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          
          {userReview.comment && (
            <p className="text-gray-700">{userReview.comment}</p>
          )}
        </div>
      )}

      {/* All Reviews */}
      {reviews.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            All Reviews ({reviews.length})
          </h3>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-trek-100 rounded-full flex items-center justify-center">
                      {review.user.image ? (
                        <img
                          src={review.user.image}
                          alt={review.user.name || 'User'}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-trek-600 font-semibold">
                          {review.user.name?.charAt(0) || 'U'}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {review.user.name || 'Anonymous'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                {review.comment && (
                  <p className="text-gray-700">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewForm
