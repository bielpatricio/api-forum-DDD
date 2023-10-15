import { UseCaseError } from '@/core/erros/use-case-error'

export class ResourceNorFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found')
  }
}
