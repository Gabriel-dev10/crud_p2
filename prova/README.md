# Frontend - Aplicação de Gerenciamento

## Tecnologias

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Bun
- Docker
- Docker Compose

## Como rodar

Para testar somente o frontend localmente:

```bash
bun install
bun run dev
```

Depois acesse:

```text
http://localhost:5173
```

Para rodar a aplicação completa com Docker:

Na raiz do projeto, execute:

```bash
docker-compose up --build
```

Se sua versão do Docker usar o comando novo:

```bash
docker compose up --build
```

Acesse:

```text
http://localhost:5173
```

## Configuração

O frontend usa `/api` para acessar o backend. No Docker, o Nginx encaminha essas requisições para o serviço `backend`.

Arquivo `.env.example`:

```env
VITE_API_URL=/api
```

## Funcionalidades

- Login com JWT
- Armazenamento do token
- Rotas protegidas
- Navegação entre páginas
- CRUD de usuários
- CRUD de carros
- CRUD de motos
- CRUD de marcas de roupa
- Mensagens de sucesso e erro
- Layout responsivo

## Rotas usadas

- `POST /auth/login`
- `GET /users`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`
- `GET /carros`
- `POST /carros`
- `PUT /carros/:id`
- `DELETE /carros/:id`
- `GET /motos`
- `POST /motos`
- `PUT /motos/:id`
- `DELETE /motos/:id`
- `GET /marcas`
- `POST /marcas`
- `PUT /marcas/:id`
- `DELETE /marcas/:id`

## Credenciais de teste

```text
Email: admin@email.com
Senha: senha123
```
