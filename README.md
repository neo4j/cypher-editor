<h1 align="center">
  <b>Cypher Editor</b><br>
</h1>
<p align="center"> Cypher-editor provide feature-rich support of Cypher query language in JavaScript-based editors <br>
    <a href="https://neo4j-contrib.github.io/cypher-editor/">Demo</a><br><br>
    <img src="https://cloud.githubusercontent.com/assets/24562497/26100041/5e01a278-3a35-11e7-97aa-cb80ac90dd09.png" width=700 alt="Screenshot of Example"><br><br>
    <em>The example above is using cypher-editor. Check it out at <a href="https://github.com/neo4j/neo4j-browser">neo4j/neo4j-browser</a>.</em>
</p>

### Key Features

* Syntax highlighting
* Auto-complete for labels, relationship types, properties and variables
* Command auto-complete

### Supported editors

* [CodeMirror](cypher-codemirror/)

### Cypher editor support

[Cypher editor support](cypher-editor-support/) package provides all the core functionality that is needed to power [Cypher](http://www.opencypher.org/) integration in editors.

### Projects using cypher-editor

* [Neo4j-browser](https://github.com/neo4j/neo4j-browser)

### Prerequisites

You may need to install **yarn** via `npm install -g yarn`.

### Project structure

    cypher-editor
    ├── cypher-codemirror     # Cypher Editor Support integration with codemirror
    ├── cypher-editor-support # Provides core functionality for Cypher integration in editors
    └── tools                 # Scripts

### Documentation 

### [Contributing](CONTRIBUTING.md)
If you want to help us take a look at the
[issues](https://github.com/neo4j-contrib/cypher-editor/issues).

### License

This project is licensed under the GNU License - see the [GNU General Public License](LICENSE) file for details.
