/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose';

const objectId = (variable: any): boolean =>
  variable && mongoose.isValidObjectId(variable);

const number = (variable: any): boolean => !isNaN(variable);

const string = (variable: any): boolean =>
  typeof variable === 'string' || variable instanceof String;

const array = (variable: any): boolean => Array.isArray(variable);

export default {
  objectId,
  number,
  string,
  array,
};
