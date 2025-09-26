import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Get reviews for a specific trek
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const trekId = searchParams.get('trekId')

    if (!trekId) {
      return NextResponse.json({ error: 'Trek ID is required' }, { status: 400 })
    }

    const reviews = await prisma.review.findMany({
      where: { trekId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

// POST - Create a new review
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { trekId, rating, comment } = body

    if (!trekId || !rating) {
      return NextResponse.json({ error: 'Trek ID and rating are required' }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    // Get user ID from session
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user already reviewed this trek
    const existingReview = await prisma.review.findUnique({
      where: { trekId_userId: { trekId, userId: user.id } }
    })

    if (existingReview) {
      return NextResponse.json({ error: 'You have already reviewed this trek' }, { status: 400 })
    }

    const review = await prisma.review.create({
      data: {
        trekId,
        userId: user.id,
        rating,
        comment
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}
