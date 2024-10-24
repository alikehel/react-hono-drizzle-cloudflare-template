# React Hono AuthJS Drizzle Cloudflare Template

## Technology Stack

-   [React](https://reactjs.org/)
-   [HonoJS](https://hono.io/)
-   [AuthJS](https://authjs.dev/)
-   [DrizzleORM](https://orm.drizzle.team/)
-   [Cloudflare](https://www.cloudflare.com/)

## Getting Started

### Prerequisites

- Cloudflare Account
- Cloudflare D1 database
- Cloudflare keys in your repo secrets (Account ID, API Token, DB ID)
- `.dev.vars` file in the root of your project

### Installation Steps

1. Clone the repository

```bash
git clone https://github.com/alikehel/react-hono-authjs-drizzle-cloudflare-template
```

2. Install dependencies

```bash
corepack enable && pnpm install
```

3. Start the development server

```bash
pnpm run dev
```

## Development Roadmap

- [ ] Better Readme
- [ ] Integrate with Cloudflare R2
- [ ] Add vitest for testing
- [ ] RBAC, PBAC, ABAC or CBAC? (CASL or accesscontrol)
- [ ] A script for setting up everything
- [ ] Better structure (modules/users/routes)
    - [ ] Move types to lib
    - [ ] Make common schemas file
- [ ] Parse ENV with ZOD (dotenv, expand, dotenvx)
- [ ] Drizzle Pagination
- [ ] Better responses
- [ ] Better error handling
- [ ] Better logging (Request Body, Response Body, Query, Params)
- [ ] Better security
- [ ] API Versioning

## Contributing

Hey, thanks for your interest in contributing! We appreciate your help and taking your time to contribute.

### Non-substantive changes

For any minor updates to the curriculum, such as fixing broken URLs, correcting spelling or syntax errors, and other non-substantive issues, we welcome you to submit a pull request. You can do this by following the guidelines in [pull request guide](https://www.freecodecamp.org/news/how-to-make-your-first-pull-request-on-github-3/).

### Substantive changes

If you have specific and substantial feedback or concerns about the content, we encourage you to open an issue. Please refer to [open an issue](https://help.github.com/articles/creating-an-issue/) for assistance.

## License

This project is licensed under the [MIT License](LICENSE).
