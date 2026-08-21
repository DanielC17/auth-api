# auth-api

API de autenticação construída com **NestJS**, **Prisma** e **PostgreSQL**.

Ela expõe endpoints para cadastro, login e consulta do perfil autenticado via JWT.

## Funcionalidades

- cadastro de usuário com senha criptografada com bcrypt
- login com geração de `accessToken`
- rota protegida para obter o perfil do usuário autenticado
- persistência em PostgreSQL com Prisma
- validação global de payloads com `class-validator`

## Stack

- NestJS 11
- Prisma 7
- PostgreSQL 17
- JWT
- bcrypt

## Estrutura principal

- `src/main.ts` — bootstrap da aplicação e `ValidationPipe` global
- `src/auth/*` — controller, service, guard e DTOs de autenticação
- `src/prisma/*` — integração do Prisma Client com o banco
- `prisma/schema.prisma` — modelo `User`
- `docker-compose.yml` — container local do PostgreSQL

## Pré-requisitos

- Node.js 18+ recomendado
- npm
- PostgreSQL local ou via Docker

## Instalação

```bash
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com, no mínimo:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME?schema=public"
JWT_SECRET="sua_chave_secreta"
PORT=3000
```

Se estiver usando o `docker-compose.yml`, você também pode definir:

```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=auth_api
```

> Observação: configure um `JWT_SECRET` consistente no `.env`, porque o mesmo segredo é usado para assinar e validar os tokens.

## Subindo o banco com Docker

```bash
docker compose up -d
```

## Prisma

O schema do Prisma está em `prisma/schema.prisma` e o client é gerado em `generated/prisma`.

Comandos úteis:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

## Executando a aplicação

```bash
# desenvolvimento
npm run start:dev

# execução padrão
npm run start

# produção
npm run build
npm run start:prod
```

Por padrão, o servidor sobe em `http://localhost:3000`.

## Scripts disponíveis

```bash
npm run build
npm run format
npm run start
npm run start:dev
npm run start:debug
npm run start:prod
npm run lint
npm run test
npm run test:watch
npm run test:cov
npm run test:debug
npm run test:e2e
```

## Endpoints

### `POST /auth/signup`

Cria um novo usuário.

Payload:

```json
{
  "name": "Daniele",
  "email": "daniele@email.com",
  "password": "123456"
}
```

### `POST /auth/signin`

Autentica o usuário e retorna o token JWT.

Payload:

```json
{
  "email": "daniele@email.com",
  "password": "123456"
}
```

Resposta esperada:

```json
{
  "accessToken": "jwt_token_aqui",
  "user": {
    "id": "...",
    "email": "daniele@email.com",
    "name": "Daniele"
  }
}
```

### `GET /auth/profile`

Rota protegida que retorna o conteúdo do token decodificado.

Header necessário:

```http
Authorization: Bearer <accessToken>
```

## Regras de validação

- `email` deve ser válido
- `password` é obrigatório
- `name` é obrigatório no cadastro

## Modelo de dados

O banco possui a tabela `users` com os campos:

- `id`
- `name`
- `email`
- `password`
- `createdAt`
- `updatedAt`

O campo `email` é único.

## Testes

```bash
npm run test
npm run test:cov
npm run test:e2e
```

> Observação: o teste e2e atual ainda está com um cenário padrão de `GET /` e deve ser atualizado para refletir os endpoints reais de autenticação.

## Licença

UNLICENSED
