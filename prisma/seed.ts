import { prisma } from '../lib/prisma'
import { initializeDemoData } from '../lib/auth-server'

async function main() {
  console.log('🌱 Seeding database...')
  
  try {
    await initializeDemoData()
    console.log('✅ Database seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })