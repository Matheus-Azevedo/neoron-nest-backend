# NEORON Flight Management System - Backend

## Descrição

Este repositório contém a API backend do sistema de gerenciamento de voos da empresa de aviação, desenvolvido como parte do desafio técnico da NEORON. A API segue o padrão REST e foi construída usando **Nest.js** e **PostgreSQL** como banco de dados relacional. Ela é responsável por fornecer todos os dados necessários ao frontend, incluindo operações de cadastro, edição e listagem de voos, bem como a aplicação das regras de negócio estabelecidas.

## Tecnologias

- **Nest.js**: Framework para Node.js utilizado para a construção da API.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar as informações dos voos.

## Requisitos do Sistema

- **Node.js** (v14 ou superior)
- **PostgreSQL** (v12 ou superior)
- **npm** (v6 ou superior)

## Instalação e Configuração

1.  Clone este repositório:

        `git clone https://github.com/Matheus-Azevedo/neoron-nest-backend.git

    `cd backend`

2.  Instale as dependências:

    `npm install`

3.  Configure as variáveis de ambiente: Crie um arquivo `.env` na raiz do projeto e configure as seguintes variáveis:

    ```
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB"
    ```

4.  Rode as migrações do banco de dados:

    `npm run migrate`

5.  Inicie o servidor:

    `npm run start`

## Endpoints Principais

### 1. Cadastrar Voo

**POST** `/flights`

- Request Body:

  ```
  {
  "originCep": "12345-678",
  "originCountry": "Brazil",
  "originCity": "São Paulo",
  "originState": "SP",
  "destinationCep": "98765-432",
  "destinationCountry": "USA",
  "destinationCity": "New York",
  "destinationState": "NY",
  "date": "2024-09-12T14:30:00Z"
  }
  ```

### 2. Editar Voo

**PUT** `/flights/{id}`

- Request Body:

  ```
  {
  "originCep": "12345-678",
  "destinationCep": "98765-432",
  "data": "2023-09-12T16:30:00"
  }
  ```

### 3. Listar Voos

**GET** `/flights`

### 4. Excluir Voo

**DELETE** `/flights/{id}`

## Regras de Negócio

1.  Cada voo deve ter pelo menos 30 minutos de diferença em relação ao próximo.
2.  Não pode haver dois voos para o mesmo destino no mesmo dia.

## Boas Práticas Implementadas

- **Clean Code**: Código claro e bem estruturado.
- **Modularização**: Cada módulo da aplicação foi separado adequadamente.
- **Validação de Dados**: Regras de negócio são verificadas antes da criação/edição dos voos.

## Deploy

- **Backend**: [Backend with Render](https://neoron-nest-backend.onrender.com/)
- **Database**: [Postgres With Render](https://dashboard.render.com/d/dpg-crguost6l47c73c08lb0-a)

## Documentação

<img src="./docs/peek_2.jpg" alt="ER Diagram" width="500"/>

- **Diagrama ER**: [ER Link](https://lucid.app/lucidchart/02158731-84dd-4fb3-b79a-d05b7e350cf8/edit?viewport_loc=-539%2C-11%2C2219%2C1095%2C0_0&invitationId=inv_60fcf413-6780-4024-b803-31d8ab82934e)

<img src="./docs/peek_1.jpg" alt="Swagger" width="500"/>

- **Swagger**: [Swagger Link](https://neoron-nest-backend.onrender.com/api)
