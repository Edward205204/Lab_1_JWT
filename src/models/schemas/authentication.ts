import { ObjectId } from 'mongodb'

interface AuthenticationInterface {
  _id?: ObjectId
  username: string
  password: string
  createdAt?: Date
}

export default class Authentication {
  _id?: ObjectId
  username: string
  password: string
  createdAt?: Date

  constructor(data: AuthenticationInterface) {
    if (!data.username || !data.password) throw new Error('Missing data')
    this._id = data._id
    this.username = data.username
    this.password = data.password
    this.createdAt = data.createdAt || new Date()
  }
}
