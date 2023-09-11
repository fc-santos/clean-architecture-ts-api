import { MongoHelper as sut } from './mongo-helper'

const mongoURL = process.env.MONGO_URL

if (!mongoURL) throw new Error('MONGO_URL is not defined')

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(mongoURL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
