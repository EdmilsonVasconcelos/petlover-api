# Petlover: Rede Social para Animais de Estimação

Petlover é uma rede social para amantes de animais de estimação. 

A plataforma permite que usuários:

* **Criem perfis para seus animais de estimação**
* **Compartilhem fotos e vídeos**
* **Conectem-se com outros donos de animais**
* **Participem de grupos e comunidades**
* **Encontrem eventos e serviços para seus pets**

# Tecnologias:

* NestJS
* Docker
* PostgreSQL

# Requisitos:

* Node.js v20
* Docker instalado
* PostgreSQL instalado e configurado

## Instalação:

* Clone o repositório:
* cd petlover
* npm install

## Para iniciar o banco de dados
Você pode usar o comando `docker compose-up` na raíz do projeto. Este comando irá criar um container com uma imagem docker do Postgres e o seu banco de dados estará online. Ao iniciar a aplicação o `banco` e as `tabelas` são criadas `automaticamente`.

## Inicie o servidor:
`npm run start:dev`

Acesse a aplicação no navegador:
`http://localhost:3000`
