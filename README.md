### cypher-editor

This repository is a monorepo, and all packages are located in the `packages` directory.

To install the dependencies for the monorepo, run the following the base directory:

```
npm install
```

Optionally to build all library packages for release preparation, run the following in the base directory:

```
npm run build:libs
```

### Demos

Once you have install the dependencies, you can run any of the demos that are in `demo-` prefixed packages, using commands like the following:

```
cd packages/demo-codemirror-6-vite-svelte
npm run start
```

### Tests

Some e2e tests are setup. You can run them indivudually in each package:

```bash
cd packages/<demo-package-name>

# for dev
npm run start
npm run e2e

# for prod
npm run build
npm run serve
npm run e2e
npm run unserve
```

Or all packages together:

```bash
# in project root

# for prod
npm run start:e2e
npm run stop:e2e
```

# Contribution process

Contributions are very much appreciated and here's an outline of the process.

- Work in your own fork of the repo
- Open a PR against the main branch
- Follow the instructions in the pull request template
