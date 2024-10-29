# React Hono AuthJS Drizzle Cloudflare Template

## Technology Stack

-   [React](https://reactjs.org/)
-   [HonoJS](https://hono.io/)
-   [AuthJS](https://authjs.dev/)
-   [DrizzleORM](https://orm.drizzle.team/)
-   [Cloudflare](https://www.cloudflare.com/)

## Rules

- Files and folders should be named in lowercase and use hyphens as separators.
- URL paths should be in lowercase and use hyphens as separators.
- URL dynamic paths should be in camelCase.
- URL Query parameters should be in lowercase and use underscores as separators.
Example: `https://example.com/user-profile/orders/:orderId/details?sort_by=date&show_archived=true`

## Issues

- createRoute function has issues with the hono client
- In order for the hono client to work, routes must be in a specific form

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

### Important

- [x] API Versioning
- [ ] Better responses for data and errors (error handeling) (Response Example -> `{success: true, data: {users: []}}`)
- [ ] Drizzle Pagination (https://orm.drizzle.team/docs/guides/limit-offset-pagination, https://planetscale.com/blog/mysql-pagination#cursor-based-pagination-performance, https://x.com/KaraBharat/status/1848378675953377616)
- [ ] Drizzle Migrations & Seeding (https://www.youtube.com/watch?v=vLze97zZKsU)
- [ ] Move to Turso because D1 has 10 GB limit (Maybe also move to neon for postgres)
- [ ] Password is in the response even if it's not in the zod schema

### Less Important

- [ ] Use oslojs
- [ ] Better Readme
- [ ] Add vitest for testing
- [ ] A script for setting up everything
- [ ] Better structure (modules/users/routes)
    - [ ] Move types to lib
    - [ ] Make common schemas file
- [ ] Better security
- [ ] Integrate with Cloudflare R2
- [ ] RBAC, PBAC, ABAC or CBAC? (CASL or accesscontrol)
- [ ] ESLint (https://github.com/antfu/eslint-config)
- [ ] Serve React App from Hono API
- [ ] Better logging (Request Body, Response Body, Query, Params)
- [ ] Parse ENV with ZOD (dotenv, expand, dotenvx)

## Contributing

Hey, thanks for your interest in contributing! We appreciate your help and taking your time to contribute.

### Non-substantive changes

For any minor updates to the curriculum, such as fixing broken URLs, correcting spelling or syntax errors, and other non-substantive issues, we welcome you to submit a pull request. You can do this by following the guidelines in [pull request guide](https://www.freecodecamp.org/news/how-to-make-your-first-pull-request-on-github-3/).

### Substantive changes

If you have specific and substantial feedback or concerns about the content, we encourage you to open an issue. Please refer to [open an issue](https://help.github.com/articles/creating-an-issue/) for assistance.

## License

This project is licensed under the [MIT License](LICENSE).
