### cypher-editor

### How to use

Go to the relevant docs in the [docs/generated](./docs/generated) folder to read the docs on the package you're about to use.

Shortcuts:  
[React](https://github.com/neo4j/cypher-editor/blob/main/docs/generated/neo4j-cypher_react-codemirror.md)

```bash
npm install @neo4j-cypher/react-codemirror
```

[Svelte](https://github.com/neo4j/cypher-editor/blob/main/docs/generated/neo4j-cypher_svelte-codemirror.md)

```bash
npm install @neo4j-cypher/svelte-codemirror
```

### Styling the view components

To make the view components framework agnostic, the CSS are separate since importing CSS isn't a thing in many tools.
If your build tool supports importing CSS, you can import like this:

```js
import "@neo4j-cypher/codemirror/css/cypher-codemirror.css";
```

If not, you can load the styles from a CDN in yout HTML like:

```html
<link
  href="https://unpkg.com/@neo4j-cypher/codemirror/css/cypher-codemirror.css"
  rel="stylesheet"
/>
```

### Cloning

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
- Follow the instructions in the pull request template (run `npx changeset`)
