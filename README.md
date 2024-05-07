# Sell point monorepo

**Cuidado proyecto en construcción**

**Warning project under construction**

## Description

Este monorepo incluye 3 apis las cuales manejan la autenticación utilizando el flujo de autorización PKCE (Proof Key for Code Exchange)

Estas aplicaciones fueron diseñadas siguiendo la arquitectura de Diseño guiado por el dominio (DDD)

---

This monorepo comprises 3 APIs, each of which manages authentication using the PKCE (Proof Key for Code Exchange) authorization flow, alongside a library dedicated to log management.

These applications have been meticulously crafted following the principles of Domain-Driven Design (DDD) architecture.

[Nest](https://github.com/nestjs/nest) framework TypeScript

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Docker Installation

Primero sobreescriba docker-compose.override.yml con las variables que desee. Luego ejecuta docker-compose up

---

First override docker-compose.override.yml with the variables you want. Then run docker-compose up

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
