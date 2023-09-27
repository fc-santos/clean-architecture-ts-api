import { type Validation } from './validation'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) { }

  validate (input: any): Error | null {
    for (const v of this.validations) {
      const error = v.validate(input)
      if (error) return error
    }
    return null
  }
}
