export const load = () => ({
    database: {
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USERNAME,
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_PASSWORD,  
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true
    }
})