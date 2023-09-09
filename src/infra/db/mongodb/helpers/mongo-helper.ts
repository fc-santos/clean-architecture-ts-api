import { type Collection, MongoClient, type InsertOneResult, type Document } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient | null,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },
  async disconnect (): Promise<void> {
    if (this.client) {
      await this.client.close()
    }
  },
  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },
  map (result: InsertOneResult<Document>, collection: any): any {
    const { _id, ...rest } = collection
    return {
      ...rest,
      id: _id.toHexString()
    }
  }
}
