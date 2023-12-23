import { DataSource } from 'typeorm'
import { config } from 'dotenv'
config()
class Database {
  private static instance: DataSource

  private constructor() {}

  static getInstance(): DataSource {
    if (!Database.instance) {
      Database.instance = new DataSource({
        type: process.env.DB_TYPE as any,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: ['src/orm/entities/*{.ts,.js}'],
        migrations: ['src/migrations/*.ts', 'dist/migrations/*{.ts,.js}'],
        synchronize: false
      })
      console.log('entity', process.env.DB_HOST)
    }

    return Database.instance
  }
}

export const myDataSource = Database.getInstance()
