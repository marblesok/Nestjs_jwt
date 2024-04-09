import * as Joi from "joi";

export const validationSchema = Joi.object({
    MYSQL_HOST: Joi.string().required(),
    MYSQL_USERNAME: Joi.string().required(),
    MYSQL_PASSWORD: Joi.string().required(),
    MYSQL_DATABASE: Joi.string().required(),
    MYSQL_PORT: Joi.number().required(),
}); 