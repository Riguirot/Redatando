import { PrismaEssayRepository } from '../infra/database/PrismaEssayRepository'
import { LocalStorageService } from '../infra/storage/LocalStorageService'
import { EssayController } from './controllers/EssayController'

import { SubmitEssayUseCase } from '../application/useCases/SubmitEssayUseCase'
import { GetEssayByIdUseCase } from '../application/useCases/GetEssayByIdUseCase'

import { PrismaCreditRepository } from '../../credits/infra/database/PrismaCreditRepository'
import { CreditPolicyService } from '../../credits/domain/services/CreditPolicyService'
import { CheckUserCreditsUseCase } from '../../credits/application/useCases/CheckUserCreditsUseCase'

import { PrismaTransactionManager } from '../../shared/transactions/PrismaTransactionManager'

import { createEssayRoutes } from './routes'

export function buildEssayModule() {
  // ======================
  // Infra
  // ======================
  const essayRepository = new PrismaEssayRepository()
  const storageService = new LocalStorageService()
  const creditRepository = new PrismaCreditRepository()
  const transactionManager = new PrismaTransactionManager()

  // ======================
  // Domain / Services
  // ======================
  const creditPolicyService = new CreditPolicyService()

  // ======================
  // Application / UseCases
  // ======================
  const checkUserCreditsUseCase = new CheckUserCreditsUseCase(
    creditRepository,
    creditPolicyService
  )

  const submitEssayUseCase = new SubmitEssayUseCase(
    essayRepository,
    storageService,
    creditRepository,
    checkUserCreditsUseCase,
    transactionManager
  )

  const getEssayByIdUseCase = new GetEssayByIdUseCase(
    essayRepository
  )

  // ======================
  // Controller
  // ======================
  const essayController = new EssayController(
    submitEssayUseCase,
    getEssayByIdUseCase
  )

  // ======================
  // Routes
  // ======================
  const routes = createEssayRoutes(essayController)

  return {
    routes,
  }
}
