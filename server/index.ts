import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './db'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Get all products
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (results) {
      // Parse images string back to JSON
      const parsedResults = results.map((p: any) => ({
        ...p,
        images: JSON.parse(p.images || '[]')
      }))
      res.json(parsedResults)
    } else {
      res.status(500).json({ error: 'Failed to fetch products' })
    }
  })
})

// Get product by handle
app.get('/api/products/:handle', (req, res) => {
  const { handle } = req.params
  db.query('SELECT * FROM products WHERE handle = ?', [handle], (err, results) => {
    if (results && results.length > 0) {
      const p = results[0]
      res.json({
        ...p,
        images: JSON.parse(p.images || '[]')
      })
    } else {
      res.status(404).json({ error: 'Product not found' })
    }
  })
})

// Authentication: Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body
  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, result) => {
    if (result) {
      res.status(201).json({ message: 'User registered successfully', userId: result.insertId })
    } else {
      res.status(400).json({ error: 'Email already exists or invalid data' })
    }
  })
})

// Authentication: Login (simple for demo)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (results && results.length > 0) {
      const user = results[0]
      res.json({ message: 'Login successful', user: { id: user.id, email: user.email, name: user.name } })
    } else {
      res.status(401).json({ error: 'Invalid credentials' })
    }
  })
})

// Orders: Create (Fake Checkout)
app.post('/api/orders', (req, res) => {
  const { userId, products, totalAmount, shippingAddress } = req.body
  const orderNumber = `ORD-${Date.now()}`
  
  // Fake payment simulation
  setTimeout(() => {
    db.query('INSERT INTO orders (user_id, order_number, total_amount, shipping_address, status) VALUES (?, ?, ?, ?, ?)', 
    [userId, orderNumber, totalAmount, JSON.stringify(shippingAddress), 'paid'], (err, result) => {
      if (result) {
        const orderId = result.insertId
        
        // Insert items
        const values = products.map((p: any) => [orderId, p.id, p.quantity, p.price, p.size, p.color])
        db.query('INSERT INTO order_items (order_id, product_id, quantity, price, size, color) VALUES ?', [values], (err2) => {
            res.json({ message: 'Order placed successfully', orderNumber, orderId })
        })
      } else {
        res.status(500).json({ error: 'Order creation failed' })
      }
    })
  }, 1000) // 1s fake processing delay
})

app.listen(PORT, () => {
    console.log(`Express API running on http://localhost:${PORT}`)
})
