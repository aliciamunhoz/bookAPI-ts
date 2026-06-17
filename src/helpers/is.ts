/* eslint-disable @typescript-eslint/no-explicit-any */

const number = (variable: any): boolean => !isNaN(variable)

const string = (variable: any): boolean =>
  typeof variable === 'string' || variable instanceof String

export default {
  number,
  string,
}
