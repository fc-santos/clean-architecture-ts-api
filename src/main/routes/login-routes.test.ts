import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { hash } from 'bcrypt'

const mongoURL = process.env.MONGO_URL

if (!mongoURL) throw new Error('MONGO_URL is not defined')

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(mongoURL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Filipe',
          email: 'filipe.santos@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Filipe',
        email: 'filipe.santos@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'filipe.santos@gmail.com',
          password: '123'
        })
        .expect(200)
    })
  })
})
