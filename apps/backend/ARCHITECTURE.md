# 🏗️ ARCHITECTURE — REDATANDO (Backend)

Este documento descreve a arquitetura do backend do sistema web de
**correção de redações da Redatando**.

A arquitetura foi projetada para crescer de forma incremental,
seguindo rigorosamente o roadmap definido, mantendo segurança,
clareza e padrão profissional desde o primeiro commit.

---

## 🎯 ESCOPO ATUAL

Esta arquitetura cobre oficialmente:

- 🧱 FASE 0 — Preparação
- 🔐 FASE 1 — Segurança estrutural
- 🧩 FASE 2 — Base da API (Contrato)

Funcionalidades como banco de dados, upload de imagens e autenticação
completa **não fazem parte deste documento ainda** e serão adicionadas
nas próximas fases sem quebra estrutural.

---

## 🧱 VISÃO GERAL DA ARQUITETURA

Fluxo padrão de uma requisição HTTP:

Client
↓
Middlewares globais
↓
Controller
↓
Service
↓
Response padronizada


Princípios:
- Controllers não contêm regra de negócio
- Services concentram a lógica da aplicação
- Middlewares cuidam de segurança, validação e erros
- A API sempre responde no mesmo formato

---

## 📦 ESTRUTURA DE PASTAS (ATUAL)

redatando/
├── src/
│ ├── app.ts
│ ├── server.ts
│ │
│ ├── config/
│ │ ├── env.ts
│ │ ├── cors.ts
│ │ ├── helmet.ts
│ │ └── logger.ts
│ │
│ ├── shared/
│ │ ├── errors/
│ │ │ └── AppError.ts
│ │ │
│ │ ├── middlewares/
│ │ │ ├── error.middleware.ts
│ │ │ ├── rateLimit.middleware.ts
│ │ │ └── validation.middleware.ts
│ │ │
│ │ ├── http/
│ │ │ └── response.ts
│ │ │
│ │ └── utils/
│ │ └── sanitize.ts
│ │
│ ├── modules/
│ │ ├── health/
│ │ │ ├── HealthController.ts
│ │ │ └── routes.ts
│ │ │
│ │ └── content/
│ │ │  └── repositories/    --> feacture futura
│ │ │  └── entities/        --> feacture futura
│ │ │
│ │ ├── controllers/
│ │ │ └── ContentController.ts
│ │ │
│ │ ├── services/
│ │ │ └── ContentService.ts
│ │ │
│ │ ├── dtos/
│ │ │ └── CreateContentDTO.ts
│ │ │
│ │ └── routes.ts
│ │
│ └── routes/
│ └── index.ts
│
├── tests/
│ ├── unit/
│ └── integration/
│
├── .env.example
├── tsconfig.json
├── jest.config.ts
└── package.json


---

## 🧩 RESPONSABILIDADES DAS CAMADAS

### `app.ts`
- Inicializa o Express
- Aplica middlewares globais
- Registra as rotas

---

### `server.ts`
- Responsável apenas por subir o servidor
- Separado para facilitar testes automatizados

---

### `config/`
Configurações isoladas da aplicação:
- `env.ts` → carregamento e validação de variáveis de ambiente
- `cors.ts` → política de CORS
- `helmet.ts` → headers de segurança
- `logger.ts` → logging básico

---

### `shared/errors`
- Classe base `AppError`
- Centraliza mensagens e status HTTP
- Evita exposição de stack trace ao cliente

---

### `shared/middlewares`

- `error.middleware.ts`
  - Tratamento centralizado de erros
- `rateLimit.middleware.ts`
  - Proteção contra abuso de requisições
- `validation.middleware.ts`
  - Bloqueia payload inválido antes do controller

---

### `shared/http/response.ts`

Todas as respostas da API seguem o mesmo padrão:

```json
{
  "success": true,
  "data": {},
  "error": null
}

Ou, em caso de erro:

{
  "success": false,
  "data": null,
  "error": {
    "message": "Mensagem clara para o cliente",
    "code": "ERROR_CODE"
  }
}

|---modules/


Cada módulo representa um domínio isolado da aplicação.

Regras:

Um módulo não acessa diretamente outro módulo

Toda lógica fica concentrada no service

Controllers apenas orquestram a entrada e saída HTTP


|---controllers/


Recebem req e res

Chamam os services

Nunca contêm regra de negócio


|---services/


Implementam as regras da aplicação

Orquestram fluxos

Centralizam decisões


|---dtos/


Definem contratos de entrada

Garantem validação e previsibilidade da API

routes.ts

Apenas mapeamento de rotas

Nenhuma lógica de negócio


🔐 SEGURANÇA (FASE 1)

Segurança aplicada desde o início:

Helmet para headers seguros

CORS configurado

Rate limit global

Sanitização de input

Middleware centralizado de erro

Logger básico


🧪 TESTES (ESTRUTURA PREPARADA)

A estrutura já suporta:

Testes unitários de services

Testes de integração de rotas

Evolução sem refatoração estrutural


🚀 EVOLUÇÃO PLANEJADA

Esta arquitetura evoluirá de forma incremental para suportar:

Persistência em banco de dados (FASE 3)

Upload e gestão de imagens (FASE 4)

Autenticação e roles (FASE 6)

Sem quebra de contratos nem retrabalho.


✅ PRINCÍPIOS ADOTADOS

Simplicidade acima de complexidade

Segurança antes de feature

Contrato de API como base

Código explicável em entrevista

Crescimento faseado e consciente