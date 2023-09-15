import { MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'
import { type EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body

    if (!email) {
      return await new Promise(resolve => { resolve(badRequest(new MissingParamError('email'))) })
    }

    if (!password) {
      return await new Promise(resolve => { resolve(badRequest(new MissingParamError('password'))) })
    }

    this.emailValidator.isValid(email)

    return ok('')
  }
}
