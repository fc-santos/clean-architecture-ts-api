import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

const mongoURL = process.env.MONGO_URL

if (!mongoURL) throw new Error('MONGO_URL is not defined')

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(mongoURL)
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
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
