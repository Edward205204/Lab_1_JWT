import express from 'express'
import authRoutes from '~/routes/auth.routes'
const app = express()
const PORT = 3020

app.use(express.json())
app.use('/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`Employee Service is running on port ${PORT}`)
})
