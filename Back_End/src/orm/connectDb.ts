import { DataSource } from 'typeorm'
import { envConfig } from '../constants/config'
class Database {
  private static instance: DataSource

  private constructor() {}

  static getInstance(): DataSource {
    if (!Database.instance) {
      Database.instance = new DataSource({
        type: process.env.DB_TYPE as any,
        host: envConfig.dbHost,
        port: 25060,
        username: envConfig.dbUsername,
        password: envConfig.dbPassword,
        database: envConfig.dbName,
        entities: ['src/orm/entities/*{.ts,.js}'],
        migrations: ['src/migrations/*.ts', 'dist/migrations/*{.ts,.js}'],
        synchronize: false
      })
      console.log('entity', envConfig.dbHost)

      return Database.instance
    }
  }
}

export const myDataSource = Database.getInstance()
