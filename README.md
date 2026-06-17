# BookHub

API REST de livros construída com Node.js, TypeScript, Express e MongoDB.

## Visao Geral

Esta API permite:
- Cadastrar livros
- Listar livros com filtros
- Buscar livro por ID
- Atualizar livro por ID
- Remover livro por ID

Base URL local:

```bash
http://localhost:4000/api
```

## Stack

- Node.js
- TypeScript
- Express
- MongoDB + Mongoose
- Jest + Supertest
- ESLint

## Requisitos

- Node.js 18+ (recomendado)
- npm
- Banco MongoDB acessivel (local ou Atlas)

## Configuracao

### 1) Instale as dependencias

```bash
npm install
```

### 2) Crie o arquivo .env

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=mongodb+srv://usuario:senha@cluster.mongodb.net/bookapi
PORT=4000
```

`DATABASE_URL` e obrigatoria para a aplicacao iniciar.

## Scripts

| Script | Descricao |
|---|---|
| `npm run dev` | Sobe a API em modo desenvolvimento com TypeScript |
| `npm run build` | Compila TypeScript para `dist/` |
| `npm start` | Executa a versao compilada (`dist/index.js`) |
| `npm test` | Executa os testes automatizados |
| `npm run lint` | Executa o ESLint no projeto |

## Executando o Projeto

### Desenvolvimento

```bash
npm run dev
```

### Producao local

```bash
npm run build
npm start
```

## Endpoints

### Criar livro

`POST /api/books`

Body:

```json
{
	"title": "Clean Code",
	"author": "Robert C. Martin",
	"publisher": "Prentice Hall",
	"pages": 464
}
```

### Listar livros

`GET /api/books`

Filtros opcionais:
- `title` (string)
- `author` (string)
- `publisher` (string)
- `pages` (number)

Exemplos:

```bash
GET /api/books?author=martin
GET /api/books?pages=464
```

### Buscar por ID

`GET /api/books/:id`

### Atualizar por ID

`PATCH /api/books/:id`

Body parcial (campos opcionais):

```json
{
	"title": "Clean Code 2a Edicao"
}
```

### Deletar por ID

`DELETE /api/books/:id`

## Estrutura do Projeto

```text
src/
	__tests__/
		book-routes.test.ts
	controllers/
		book-controller.ts
	helpers/
		book-rules.ts
		is.ts
	models/
		book-model.ts
	routes/
		book-routes.ts
		router.ts
index.ts
```

## Testes

Os testes cobrem cenarios de sucesso e erro nas rotas principais de livros.

```bash
npm test
```

## Qualidade de Codigo

```bash
npm run lint
```

## Troubleshooting

- Erro `DATABASE_URL nao foi configurada`:
	- Verifique se o arquivo `.env` existe na raiz.
	- Verifique se a variavel `DATABASE_URL` esta definida corretamente.
- Falha de conexao com MongoDB:
	- Confirme usuario/senha, whitelist de IP (Atlas) e nome do cluster.
- Porta em uso:
	- Altere `PORT` no `.env`.

## Referencia de Requisicoes

Para uma colecao pronta no Postman:

[Documentacao no Postman](https://documenter.getpostman.com/view/21992312/2sA3s6E9RB)
