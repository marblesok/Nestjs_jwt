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
    },
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expiration_time: process.env.JWT_ACCESS_EXPIRATION_TIME,

    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expiration_time: process.env.JWT_REFRESH_EXPIRATION_TIME,

    redis_host: process.env.REDIS_HOST,
    redis_port: process.env.REDIS_PORT,
})