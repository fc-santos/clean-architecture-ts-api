import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

const mongoURL = process.env.MONGO_URL

if (!mongoURL) throw new Error('MONGO_URL is not defined')

describe('Account Mongo Repository', () => {
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

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('Should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email')
    expect(account.password).toBe('any_password')
  })
})
