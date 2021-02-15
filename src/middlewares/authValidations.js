import { check, body, validationResult } from 'express-validator';

export const signupValidation = [
  check('names', 'names are required')
    .exists()
    .notEmpty()
    .isLength({ min: 2, max: 30 })
    .withMessage('names must have 2 or more characters')
    .isString()
    .withMessage('Only characters are allowed as names')
    .trim()
    .escape(),
  check('email', 'email is required')
    .notEmpty()
    .isEmail()
    .withMessage('email is invalid')
    .normalizeEmail()
    .trim(),
  check('password', 'Password is required')
    .exists()
    .isLength({ min: 6, max: 30 })
    .withMessage('Password must be at least 6 characters')
    .not()
    .isAlphanumeric()
    .withMessage(
      'Password should at least have one letter, one number and one special character'
    )
    .trim()
    .not()
    .equals('password')
    .withMessage('Password cannot be password')
    .escape(),
  check('confirmPassword')
    .isLength({ min: 6, max: 30 })
    .withMessage('Password must be at least 6 characters')
    .exists()
    .withMessage('Password is required')
    .not()
    .isAlphanumeric()
    .withMessage(
      'Password should at least have one letter, one number and one special character'
    )
    .trim()
    .not()
    .equals('password')
    .withMessage('Password cannot be password')
    .escape(),
  check('apartmentId', 'apartmentId are required').exists().notEmpty().trim(),
  check('isClient', 'User category is required')
    .notEmpty()
    .isBoolean()
    .trim()
    .withMessage(
      'Category can only be a boolean value between client and developer'
    ),
  body('notifyOnReply').toBoolean(),
];

export const loginValidation = [
  check('email', 'Email is required')
    .exists()
    .trim()
    .isEmail()
    .withMessage('email is invalid')
    .normalizeEmail(),
  check('password', 'Invalid user credentials')
    .notEmpty()
    .isLength({ min: 6, max: 30 }),
  body('notifyOnReply').toBoolean(),
];

export const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ status: 422, error: errors.array() });
  }
  next();
};