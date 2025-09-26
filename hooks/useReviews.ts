import { useState, useEffect } from 'react'

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

export const useReviews = (trekId: string) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchReviews = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/reviews?trekId=${trekId}`)
      if (response.ok) {
        const data = await response.json()
        setReviews(data)
      } else {
        setError('Failed to fetch reviews')
      }
    } catch (err) {
      setError('Failed to fetch reviews')
    } finally {
      setLoading(false)
    }
  }

  const addReview = async (rating: number, comment: string) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trekId, rating, comment })
      })

      if (response.ok) {
        await fetchReviews()
        return true
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to add review')
      }
    } catch (err) {
      throw err
    }
  }

  const updateReview = async (reviewId: string, rating: number, comment: string) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment })
      })

      if (response.ok) {
        await fetchReviews()
        return true
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update review')
      }
    } catch (err) {
      throw err
    }
  }

  const deleteReview = async (reviewId: string) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchReviews()
        return true
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete review')
      }
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    if (trekId) {
      fetchReviews()
    }
  }, [trekId])

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    addReview,
    updateReview,
    deleteReview
  }
}
