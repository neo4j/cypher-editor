### cypher-editor

This repository is a monorepo, and all packages are located in the `packages` directory.

To install the dependencies for the monorepo, run the following the base directory:

```
yarn install
```

Optionally to build all library packages for release preparation, run the following in the base directory:

```
yarn build
```

### Demos

Once you have install the dependencies, you can run any of the demos that are in `demo-` prefixed packages, using commands like the following:

```
cd packages/demo-codemirror-6-vite-svelte
yarn start
```

### Tests

Some e2e tests are setup. You can run them indivudually in each package:

```bash
cd packages/<demo-package-name>

# for dev
yarn start
yarn e2e

# for prod
yarn build
yarn serve
yarn e2e
yarn unserve
```

Or all packages together:

```bash
# in project root

# for prod
yarn start:e2e
yarn stop:e2e
```
