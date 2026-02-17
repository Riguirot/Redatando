import { EssayController } from '../presentation/controllers/EssayController'

// use cases
import { SubmitEssayUseCase } from '../application/useCases/SubmitEssayUseCase'
import { GetEssayByIdUseCase } from '../application/useCases/GetEssayByIdUseCase'

// essays infra
import { essayRepository } from './database'
import { storageService } from './storage'

// credits
import { creditRepository } from '../../credits/infra/database'
import { checkUserCreditsUseCase } from '../../credits/infra/checkUserCreditsUseCase.factory'

// shared
import { transactionManager } from '../../shared/transactions'

// --- use cases ---
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

// --- controller ---
export const essayController = new EssayController(
  submitEssayUseCase,
  getEssayByIdUseCase
)
