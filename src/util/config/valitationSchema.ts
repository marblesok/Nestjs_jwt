import * as Joi from "joi";

export const validationSchema = Joi.object({
    JWT_ACCESS_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRATION_TIME: Joi.string().required(),
    JWT_REFRESH_SECRET: Joi.string().required(),
    JWT_REFRESH_EXPIRATION_TIME: Joi.string().required(),
    MYSQL_HOST: Joi.string().required(),
    MYSQL_USERNAME: Joi.string().required(),
    MYSQL_PASSWORD: Joi.string().required(),
    MYSQL_DATABASE: Joi.string().required(),
    MYSQL_PORT: Joi.number().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
}); 