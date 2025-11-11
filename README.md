# Blog LEE HYUNSOO

## Setup

Make sure to install the dependencies:

```bash
npm install
pnpm install
yarn install
bun install
```

### pnpm native build

over pnpm v10, we need to approve the build scripts.

```sh
# approve native build scripts and install ~
pnpm approve-builds
# ....
# check if the better-sqlite3 node file exists
find node_modules/.pnpm/better-sqlite3@* -name better_sqlite3.node
node_modules/.pnpm/better-sqlite3@12.4.1/node_modules/better-sqlite3/build/Release/better_sqlite3.node
```

