import * as Joi from 'joi';

const emptyFieldMessage = 'All fields must be filled';
const invalidBuyValueMessage = 'Invalid buy value';
const invalidEngineCapacityMessage = 'Invalid Engine Capacity';

export const carSchema = Joi.object({
  _id: Joi.string(),
  model: Joi.string().min(3).required().messages({
    'string.min': 'Invalid Model',
    'string.empty': emptyFieldMessage,
    'any.required': emptyFieldMessage,
  }),
  year: Joi.number().greater(1899).less(2023).required()
    .messages({
      'string.min': 'Invalid Year',
      'string.empty': emptyFieldMessage,
      'any.required': emptyFieldMessage,
    }),
  color: Joi.string().min(3).required().messages({
    'string.min': 'Invalid Color',
    'string.empty': emptyFieldMessage,
    'any.required': emptyFieldMessage,
  }),
  status: Joi.boolean().messages({
    'boolean.base': 'Invalid Status',
  }),
  buyValue: Joi.number().integer().min(0).required()
    .messages({
      'number.integer': invalidBuyValueMessage,
      'number.base': invalidBuyValueMessage,
      'number.empty': emptyFieldMessage,
      'any.required': emptyFieldMessage,
    }),
  doorsQty: Joi.number().integer().greater(1).less(5)
    .required()
    .messages({
      'number.integer': 'Invalid Doors Quantity',
      'number.base': 'Invalid Doors Quantity',
      'number.empty': emptyFieldMessage,
      'any.required': emptyFieldMessage,
    }),
  seatsQty: Joi.number().integer().greater(1).less(8)
    .required()
    .messages({
      'number.integer': 'Invalid Seats Quantity',
      'number.base': 'Invalid Seats Quantity',
      'number.empty': emptyFieldMessage,
      'any.required': emptyFieldMessage,
    }),
});

export const motorcycleSchema = Joi.object({
  _id: Joi.string(),
  model: Joi.string().min(3).required().messages({
    'string.min': 'Invalid Model',
    'string.empty': emptyFieldMessage,
    'any.required': emptyFieldMessage,
  }),
  year: Joi.number().greater(1899).less(2023).required()
    .messages({
      'string.min': 'Invalid Year',
      'string.empty': emptyFieldMessage,
      'any.required': emptyFieldMessage,
    }),
  color: Joi.string().min(3).required().messages({
    'string.min': 'Invalid Color',
    'string.empty': emptyFieldMessage,
    'any.required': emptyFieldMessage,
  }),
  status: Joi.boolean().messages({
    'boolean.base': 'Invalid Status',
  }),
  buyValue: Joi.number().integer().min(0).required()
    .messages({
      'number.integer': invalidBuyValueMessage,
      'number.base': invalidBuyValueMessage,
      'number.empty': emptyFieldMessage,
      'any.required': emptyFieldMessage,
    }),
  category: Joi.string().valid('Street', 'Custom', 'Trail')
    .required()
    .messages({
      'string.empty': emptyFieldMessage,
      'any.required': emptyFieldMessage,
      'any.only': 'Invalid Category',
    }),
  engineCapacity: Joi.number().integer().greater(0).less(2501)
    .required()
    .messages({
      'number.less': invalidEngineCapacityMessage,
      'number.greater': invalidEngineCapacityMessage,
      'number.integer': invalidEngineCapacityMessage,
      'number.base': invalidEngineCapacityMessage,
      'number.empty': emptyFieldMessage,
      'any.required': emptyFieldMessage,
    }),
});