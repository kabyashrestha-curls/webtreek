import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      role: 'USER',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      name: 'Jane Smith',
      role: 'USER',
    },
  })

  const guide1 = await prisma.user.upsert({
    where: { email: 'guide@example.com' },
    update: {},
    create: {
      email: 'guide@example.com',
      name: 'Mike Guide',
      role: 'GUIDE',
    },
  })

  // Create sample treks
  const trek1 = await prisma.trek.upsert({
    where: { id: 'trek-1' },
    update: {},
    create: {
      id: 'trek-1',
      title: 'Everest Base Camp Trek',
      description: 'Experience the ultimate adventure to the base of the world\'s highest peak.',
      difficulty: 'HARD',
      duration: 14,
      distance: 130.0,
      elevation: 5364,
      price: 1299.0,
      maxGroupSize: 12,
      images: [
        'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
      ],
      location: 'Nepal',
      coordinates: { lat: 27.9881, lng: 86.9250 },
      highlights: ['Mountain Views', 'Cultural Experience', 'High Altitude'],
      itinerary: [
        { day: 1, title: 'Arrival in Kathmandu', description: 'Welcome to Nepal! Transfer to hotel and trek briefing.' },
        { day: 2, title: 'Fly to Lukla', description: 'Scenic flight to Lukla and start of the trek.' }
      ],
      included: ['All permits and fees', 'Accommodation during trek', 'Meals', 'Experienced guide and porters'],
      excluded: ['International flights', 'Travel insurance', 'Personal expenses'],
      requirements: ['Good physical fitness', 'Previous trekking experience', 'Medical clearance'],
      guideId: guide1.id,
    },
  })

  const trek2 = await prisma.trek.upsert({
    where: { id: 'trek-2' },
    update: {},
    create: {
      id: 'trek-2',
      title: 'Inca Trail to Machu Picchu',
      description: 'Follow the ancient path of the Incas to the magnificent Machu Picchu.',
      difficulty: 'MODERATE',
      duration: 4,
      distance: 43.0,
      elevation: 4200,
      price: 899.0,
      maxGroupSize: 16,
      images: [
        'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
      ],
      location: 'Peru',
      coordinates: { lat: -13.1631, lng: -72.5450 },
      highlights: ['Ancient Ruins', 'Mountain Passes', 'Cloud Forest'],
      itinerary: [
        { day: 1, title: 'Start from Cusco', description: 'Transfer to trailhead and begin trek.' },
        { day: 2, title: 'First Pass', description: 'Cross the first mountain pass.' }
      ],
      included: ['All permits and fees', 'Accommodation during trek', 'Meals', 'Experienced guide and porters'],
      excluded: ['International flights', 'Travel insurance', 'Personal expenses'],
      requirements: ['Good physical fitness', 'Previous hiking experience'],
      guideId: guide1.id,
    },
  })

  // Create sample reviews
  await prisma.review.upsert({
    where: { id: 'review-1' },
    update: {},
    create: {
      id: 'review-1',
      trekId: trek1.id,
      userId: user1.id,
      rating: 5,
      comment: 'Absolutely incredible experience! The guides were professional and the scenery was breathtaking.',
    },
  })

  await prisma.review.upsert({
    where: { id: 'review-2' },
    update: {},
    create: {
      id: 'review-2',
      trekId: trek1.id,
      userId: user2.id,
      rating: 4,
      comment: 'Great trek with amazing views. Highly recommend for adventure seekers.',
    },
  })

  await prisma.review.upsert({
    where: { id: 'review-3' },
    update: {},
    create: {
      id: 'review-3',
      trekId: trek2.id,
      userId: user1.id,
      rating: 5,
      comment: 'The Inca Trail was magical. Perfect blend of history and adventure.',
    },
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
