# Sistema de Controle de Utilização de Automóveis

Este sistema web foi desenvolvido para fornecer um controle eficiente da utilização dos automóveis de uma empresa. Ele oferece uma série de funcionalidades para cadastrar automóveis, motoristas e registrar a utilização dos veículos.

## Funcionalidades

- **Cadastro de Automóveis:**
  - Cadastrar um novo automóvel
  - Atualizar um automóvel cadastrado
  - Excluir um automóvel cadastrado
  - Recuperar um automóvel cadastrado pelo seu identificador único
  - Listar os automóveis cadastrados, com filtragem por cor e marca

- **Cadastro de Motoristas:**
  - Cadastrar um novo motorista
  - Atualizar um motorista cadastrado
  - Excluir um motorista cadastrado
  - Recuperar um motorista cadastrado pelo seu identificador único
  - Listar os motoristas cadastrados, com filtragem por nome

- **Utilização de Automóveis:**
  - Registrar a utilização de um automóvel por um motorista, com data de início e motivo de utilização
  - Finalizar a utilização de um automóvel por um motorista, registrando a data de término
  - Listar os registros de utilização cadastrados, exibindo o nome do motorista e as informações do automóvel utilizado

## Requisitos

- Node.js
- npm (Node Package Manager)

## Instalação e Execução

1. Clone o repositório para o seu ambiente local:

git clone <link-do-repositorio>

2. Instale as dependências do projeto:

npm install


3. Execute a aplicação:

npm start


A aplicação estará disponível em `http://localhost:3000`.

## Testes

Para executar os testes de unidade, utilize o seguinte comando:

npm test

## Utilização no Postman

Para utilizar a API no Postman, siga os passos abaixo:

1. Acesse a URL `http://localhost:3000/`.
2. Leia todos os passos e configurações necessarias informadas na pagina web.
3. Utilize como preferir.


## Estrutura do Projeto

- `app.js`: Arquivo principal da aplicação
- `test.js`: Arquivo de testes de unidade
- `/public`: pasta que armazena html responavel pela instrução no postman
- `/public/index.html`: html responavel pela instrução no postman
- `package.json`: Arquivo de manifesto do projeto Node.js

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).
