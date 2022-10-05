<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Clonar repositorio

```bash
$ git clone https://github.com/edgardoll4/apinest-shop.git
```

## Ir al directorio donde se clono el repositorio

```bash
$ cd apinest-shop
```
## Installacion de dependencias

```bash
$ npm install
```
## Configurar variables de entorno

```bash
# Dupilcar el archivo
  .env.templete
```
```bash
# Renombrar el archivo y configurar losvalores
  .env
```
## Levantar la base de datos en Docker

```bash
$ docker-compose up -d
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Cargar datos de prueba a la DataBase

```bash
$ http://localhost:300/api/seed
```

Nest is [MIT licensed](LICENSE).
