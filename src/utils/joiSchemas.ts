import * as Joi from 'joi';

const emptyFieldMessage = 'All fields must be filled';

const carSchema = Joi.object({
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
      'number.integer': 'Invalid Buy Value',
      'number.base': 'Invalid Buy Value',
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

export default carSchema;