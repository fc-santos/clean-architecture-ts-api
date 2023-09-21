import { type Authentication } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'
import { type EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator, private readonly authentication: Authentication) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        return await new Promise(resolve => { resolve(badRequest(new MissingParamError('email'))) })
      }

      if (!password) {
        return await new Promise(resolve => { resolve(badRequest(new MissingParamError('password'))) })
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return await new Promise(resolve => { resolve(badRequest(new InvalidParamError('email'))) })
      }

      await this.authentication.auth(email, password)

      return ok('')
    } catch (error) {
      return serverError(error)
    }
  }
}
