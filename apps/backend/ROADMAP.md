# 🗺️ ROADMAP DO BACKEND — REDATANDO (V2 UNIFICADO)

Este roadmap descreve a **evolução real e planejada** do backend do sistema de correção de redações da **Redatando**.

Ele combina:

* ✅ o que **foi efetivamente implementado**
* 🧭 o que **foi planejado estrategicamente**

Tudo alinhado a uma **Clean Architecture pragmática**, sem overengineering.

---

## 🧱 FASE 0 — Preparação & Base do Projeto ✅ CONCLUÍDA

🎯 **Objetivo**
Garantir que o backend suba sem erro e siga um padrão profissional desde o início.

### Atividades

* [x] Inicializar projeto Node.js + TypeScript
* [x] Configurar `tsconfig.json` (Node16)
* [x] Criar `.env` e `.env.example`
* [x] Estrutura inicial de pastas
* [x] Scripts (`dev`, `build`, `start`)
* [x] Endpoint `/health`

---

## 🔐 FASE 1 — Segurança Estrutural Inicial ✅ CONCLUÍDA

🎯 **Objetivo**
Blindar o backend contra falhas básicas desde o dia 1.

### Atividades

* [x] Helmet
* [x] CORS
* [x] Rate limit global
* [x] Middleware centralizado de erro
* [x] Sanitização de input

---

## 🧩 FASE 2 — Arquitetura & Contrato da API ✅ CONCLUÍDA

🎯 **Objetivo**
Separar responsabilidades e definir contratos HTTP claros.

### Atividades

* [x] Clean Architecture enxuta (domain / application / infra)
* [x] Controllers padronizados
* [x] DTOs
* [x] Validação de payload
* [x] Padrão consistente de resposta

---

## 🗄️ FASE 3 — Banco de Dados & Persistência ✅ CONCLUÍDA

🎯 **Objetivo**
Persistir dados sem acoplamento com a camada HTTP.

### Atividades

* [x] Prisma + PostgreSQL
* [x] Migrations versionadas
* [x] Repositories isolados
* [x] Schemas: Essay, Content, CreditTransaction

---

## 💳 FASE 4 — Sistema de Créditos (Ledger) ✅ CONCLUÍDA

🎯 **Objetivo**
Implementar a principal regra de negócio do produto.

### Atividades

* [x] Ledger de créditos (CREDIT / DEBIT)
* [x] Cálculo de saldo por transações
* [x] Bloqueio de ações sem crédito
* [x] Transações auditáveis (sem campo balance)

---

## 📝 FASE 5 — Envio de Redações (Core do Produto) ✅ CONCLUÍDA

🎯 **Objetivo**
Permitir envio de redações com regras de negócio bem definidas.

### Atividades

* [x] Upload multipart
* [x] Validação de campos
* [x] Verificação de crédito pré-upload
* [x] Transação atômica (essay + debit)

---

## 📂 FASE 6 — Consulta & Gestão de Redações ✅ CONCLUÍDA

🎯 **Objetivo**
Permitir visualizar redações enviadas.

### Atividades

* [x] Listagem por aluno
* [x] Busca por ID
* [x] Paginação e filtros

---

## 🔐 FASE 7 — Autenticação Fake para Testes ✅ CONCLUÍDA

🎯 **Objetivo**
Viabilizar testes protegidos sem auth real.

### Atividades

* [x] Middleware de auth fake
* [x] Proteção de rotas
* [x] Correção de erros 401 em testes

📌 *Observação:* Fase concluída após a Fase 8 por decisão técnica.

---

## 🧪 FASE 8 — Estabilização & Testes de Fluxo ✅ CONCLUÍDA

🎯 **Objetivo**
Garantir estabilidade funcional do backend.

### Atividades

* [x] Testes de integração
* [x] Validação de fluxos completos
* [x] Ajuste de contratos
* [x] Silenciamento consciente de E2E

---

## 🔒 FASE 9 — Congelamento do Backend 🚧 ATUAL

🎯 **Objetivo**
Travar o núcleo do sistema para início do frontend.

### Atividades

* [ ] Congelar regras de negócio
* [ ] Congelar contratos da API
* [ ] Revisão final do Swagger
* [ ] README técnico consolidado

---

## 🔐 FASE 10 — Autenticação & Autorização Real (Planejada)

🎯 **Objetivo**
Preparar o sistema para múltiplos perfis.

### Atividades

* [ ] JWT
* [ ] Perfis (student / admin)
* [ ] Proteção de rotas
* [ ] Permissões

---

## 🛡️ FASE 11 — Segurança Avançada & Hardening (Planejada)

🎯 **Objetivo**
Proteções adicionais contra abuso.

### Atividades

* [ ] Rate limit avançado
* [ ] Anti brute force
* [ ] Logs estruturados

---

## 🏁 STATUS GERAL

🟢 Core do produto estável e validado
🟡 Backend congelando para início do frontend
🧭 Segurança real planejada com clareza
