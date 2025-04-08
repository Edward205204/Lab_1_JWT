import databaseService from './databases.services'
import Authentication from '~/models/schemas/authentication'

class AuthService {
  async register(user: Authentication): Promise<Authentication> {
    await databaseService.authentication.insertOne(user)
    return user
  }

  async login(username: string): Promise<Authentication | null> {
    return (await databaseService.authentication.findOne({ username })) || null
  }

  async findByName(username: string): Promise<Authentication | null> {
    return databaseService.authentication.findOne({ username })
  }

  async findProfile(name: string): Promise<Authentication | null> {
    return (await databaseService.authentication.findOne({ username: name })) || null
  }
}

export default new AuthService()
