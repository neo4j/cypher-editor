export class ReferencesProvider {
  queries = [];
  index = {};

  constructor(queries, index) {
    const { names, namesByQuery, referencesByName, referencesByQueryAndName } =
      index;
    this.queries = queries;
    this.index = {
      names: Object.keys(names),
      namesByQuery: namesByQuery.map((q) => Object.keys(q)),
      referencesByName,
      referencesByQueryAndName
    };
  }

  getReferences(name, query = null) {
    if (query == null) {
      return this.index.referencesByName[name];
    }
    const pos = this.queries.indexOf(query);
    return (this.index.referencesByQueryAndName[pos] || {})[name];
  }

  getNames(query = null) {
    if (query == null) {
      return this.index.names;
    }
    const pos = this.queries.indexOf(query);
    return this.index.namesByQuery[pos] || [];
  }
}
