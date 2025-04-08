import { MongoClient, Db, Collection } from 'mongodb'
import Authentication from '~/models/schemas/authentication'

const uri = `mongodb://localhost:27017/newDB?appName=MongoDB+Compass&directConnection=true&serverSelectionTimeoutMS=2000`

class DatabaseService {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db('thayHieuDB')
    this.connect()
  }

  async connect() {
    try {
      await this.client.connect()
      await this.db.command({ ping: 1 })
      console.log('Connected to thayHieuDB database')
    } catch (error) {
      console.error('Database connection error:', error)
      await this.client.close()
      throw error
    }
  }

  get authentication(): Collection<Authentication> {
    return this.db.collection('authentication')
  }
}

const databaseService = new DatabaseService()
export default databaseService
