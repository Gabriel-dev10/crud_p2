## Tecnologias Utilizadas

- **Node.js & Express**: Ambiente de execução e framework web.
- **MongoDB & Mongoose**: Banco NoSQL para Carros, Motos e Marcas.
- **PostgreSQL & Sequelize**: Banco SQL para Usuários.
- **JWT (JSON Web Token)**: Autenticação e Autorização.
- **Docker & Docker Compose**: Conteinerização e orquestração.
- **Jest & Supertest**: Testes de integração.
- **Swagger (swagger-ui-express)**: Documentação automática da API.
- **Segurança**: Helmet, CORS, bcryptjs e express-rate-limit.

## Como Executar o Projeto

O projeto foi configurado para ser executado exclusivamente via Docker.

### Pré-requisitos
- Docker instalado.
- Docker Compose instalado.

### Passo a Passo

1.  **Clone o repositório**:
    ```bash
    git clone <link-do-repositorio>
    cd trabalho-p2
    ```

2.  **Configuração de Variáveis de Ambiente**:
    O arquivo `.env` já está configurado para o ambiente Docker. Caso precise alterar, edite o arquivo na raiz do projeto.

3.  **Subir os Containers**:
    Execute o comando abaixo para construir as imagens e iniciar os serviços (Node, MongoDB e PostgreSQL):
    ```bash
    docker-compose up --build
    ```

4.  **Acessar a Aplicação**:
    A API estará disponível em `http://localhost:3000`.

## Documentação da API (Swagger)

Com a aplicação rodando, acesse a documentação interativa através do link:
`http://localhost:3000/api-docs`

## Testes de Integração

Para executar os testes de integração, você pode rodar localmente (necessário ter as dependências instaladas):
```bash
npm test
```
*Nota: Os testes utilizam `mongodb-memory-server` e `sqlite3` em memória para não depender de instâncias externas durante a execução.*

## Estrutura do Projeto

- `src/config`: Configurações de banco de dados e Swagger.
- `src/controllers`: Lógica de negócio para cada recurso.
- `src/middlewares`: Middlewares de autenticação e segurança.
- `src/models`: Definição dos esquemas (SQL e NoSQL).
- `src/routes`: Definição dos endpoints da API.
- `tests`: Testes de integração de todos os módulos.
