🔹 TASK 0 — Preparação mínima (já praticamente feita)


📌 Objetivo: base estável

Arquivos

shared/errors/*.ts

shared/transactions/TransactionManager.ts

Repositórios Prisma (estrutura, mesmo vazios)

Estado

Use cases ainda vazios

Projeto compila

Testes rodam (mesmo falhando)

✅ SEM TESTE obrigatório aqui
(é setup)




🔹 TASK 1 — Domínio de Créditos (isolado)


📌 Objetivo: garantir regra de monetização

Implementar

credits/domain/entities/CreditTransaction.ts

credits/domain/services/CreditPolicyService.ts

Regra mínima

crédito infinito

saldo suficiente / insuficiente

Teste obrigatório

📄 tests/unit/credits/AddCreditsUseCase.spec.ts

👉 Mesmo sem use case completo, você já testa o serviço de domínio.




🔹 TASK 2 — Use case de créditos (admin)


📌 Objetivo: entrada administrativa

Implementar

AddCreditsUseCase.ts

RemoveCreditsUseCase.ts

ToggleInfiniteCreditsUseCase.ts

Teste obrigatório

📄 tests/unit/credits/AddCreditsUseCase.spec.ts
(agora completo, com mocks)

👉 Se isso falhar, nada mais importa ainda.




🔹 TASK 3 — Domínio de Redação (essays)


📌 Objetivo: regra pura

Implementar

essays/domain/entities/Essay.ts

essays/domain/valueObjects/EssayStatus.ts

essays/domain/services/WeeklyLimitService.ts

Teste obrigatório

📄 tests/unit/essays/SubmitEssayUseCase.spec.ts
(só testando limite semanal, sem infra)




🔹 TASK 4 — Storage abstrato


📌 Objetivo: não acoplar infra

Implementar

ports/StorageService.ts

infra/storage/LocalStorageService.ts

⚠️ Sem lógica de negócio aqui

Teste obrigatório

📄 Teste unitário simples do LocalStorage (opcional)
(pode até pular no MVP)



🔹 TASK 5 — SubmitEssayUseCase (núcleo do sistema)


📌 Objetivo: coração do produto

Implementar (ordem interna)

Valida limite semanal

Valida crédito

Upload do PDF

Transação:

salvar redação

debitar crédito

Rollback compensatório se falhar

Arquivos

SubmitEssayUseCase.ts

EssayRepository.ts

StorageService.ts

Teste obrigatório (CRÍTICO)

📄 tests/unit/essays/SubmitEssayUseCase.spec.ts

👉 Esse teste precisa cobrir:

sucesso

sem crédito

limite semanal estourado

falha no storage

rollback funcionando



🔹 TASK 6 — Controllers + Middlewares

📌 Objetivo: entrada HTTP segura

Implementar

EssayController.ts

validateSubmitEssay.middleware.ts

idempotency.middleware.ts

Teste obrigatório

📄 tests/integration/essays.routes.spec.ts

👉 Aqui você valida:

status HTTP correto

erro amigável

duplicação bloqueada



🔹 TASK 7 — Rotas + Health


📌 Objetivo: API utilizável

Implementar

routes.ts

routes/index.ts

Health já existe (ok)

Teste obrigatório

📄 Health endpoint (simples)



🔹 TASK 8 — Integração de Créditos


📌 Objetivo: admin real

Implementar

CreditAdminController.ts

rotas protegidas

Teste obrigatório

📄 tests/integration/credits.routes.spec.ts



🔹 TASK 9 — Refinos finais


📌 Objetivo: produto apresentável

Mensagens de erro

Logs

DTO de resposta

README técnico

✅ Testes já cobrem tudo aqui