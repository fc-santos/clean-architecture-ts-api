import { type AccountModel, type AddAccountModel, type AddAccount, type Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter) { }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return await new Promise(resolve => { resolve({ id: 'valid_id', name: account.name, email: account.email, password: account.password }) })
  }
}
