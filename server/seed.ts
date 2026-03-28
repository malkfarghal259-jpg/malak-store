import db from './db'

const products = [
  {
    title: 'Nomad Tumbler',
    handle: 'nomad-tumbler',
    description: 'This durable and portable insulated tumbler will keep your beverage at the perfect temperature during your next adventure.',
    price: 35.00,
    images: JSON.stringify(['https://images.unsplash.com/photo-1577705998148-ebb10702d733?q=80&w=2670&auto=format&fit=crop']),
    rating: 4.5,
    review_count: 120
  },
  {
    title: 'Minimalist Wristwatch',
    handle: 'minimalist-wristwatch',
    description: 'This contemporary wristwatch has a clean, minimalist look and high quality components.',
    price: 149.00,
    images: JSON.stringify(['https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2599&auto=format&fit=crop']),
    rating: 4.8,
    review_count: 85
  },
  {
    title: 'Focus Paper Refill',
    handle: 'focus-paper-refill',
    description: 'The refill pack of our high quality dotted paper for your Focus Journal.',
    price: 15.00,
    images: JSON.stringify(['https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2459&auto=format&fit=crop']),
    rating: 4.2,
    review_count: 50
  }
]

const categories = [
    { title: 'Accessories', handle: 'accessories', description: 'Stylish essentials' },
    { title: 'Home Office', handle: 'home-office', description: 'Productivity boosters' }
]

const seed = async () => {
    try {
        // Seed categories
        for (const cat of categories) {
            db.query('INSERT IGNORE INTO categories (title, handle, description) VALUES (?, ?, ?)', [cat.title, cat.handle, cat.description])
        }
        
        // Seed products
        for (const prod of products) {
            db.query('INSERT IGNORE INTO products (title, handle, description, price, images, rating, review_count) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [prod.title, prod.handle, prod.description, prod.price, prod.images, prod.rating, prod.review_count])
        }
        
        console.log('Seeding completed!')
    } catch (err) {
        console.error('Seeding error:', err)
    } finally {
        // db.end(); // Don't end it yet if the server is starting
    }
}

seed()
