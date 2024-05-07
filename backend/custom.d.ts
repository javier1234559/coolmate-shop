import * as express from 'express'
import UserPayload from '../dto/UserPayload'

declare global {
  declare namespace Express {
    export interface Request {
      user?: UserPayload
    }
  }
}