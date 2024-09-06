# Steps to reproduce

- run `nvm use`
- run `corepack enable`
- run `pnpm install`
- run `pnpm test`

You should see the test fail because redirects are not being followed when redirect handling is done via MSW handlers.
