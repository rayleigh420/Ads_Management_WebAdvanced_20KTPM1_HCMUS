import { DataSource } from 'typeorm'

class Database {
  private static instance: DataSource

  private constructor() {}

  static getInstance(): DataSource {
    if (!Database.instance) {
      Database.instance = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'pass',
        database: 'ads_management',
        entities: ['src/orm/entities/*{.ts,.js}'],
        migrations: ['src/migrations/*.ts', 'dist/migrations/*{.ts,.js}'],
        synchronize: true
      })
      console.log('entity', Database.getInstance().options.entities)
    }

    return Database.instance
  }
}

export const myDataSource = Database.getInstance()
