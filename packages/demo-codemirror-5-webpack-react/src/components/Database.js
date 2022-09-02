import React, { useState } from 'react';
import neo4j from 'neo4j-driver';
import CypherEditor from 'react-codemirror5-cypher';
import { neo4jSchema, defaultQuery } from 'demo-base';

const driver = neo4j.driver("neo4j://localhost:7687",
  neo4j.auth.basic("neo4j", "asdfgh")
);

const Database = () => {
  const [cypher, setCypher] = useState(defaultQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [theme, setTheme] = useState('cypher');

  const send = () => {
		const session = driver.session();
    setLoading(true);
		session.run(cypher)
      .then(results => {
        setResults(results);
        setLoading(false);
        setError(null);
      }, error => {
        setResults(null);
        setLoading(false);
        setError(error);
      });
	};

  const onValueChange = (value, change) => {
		setCypher(value);
  };

	const lightTheme = () => {
		setTheme('cypher');
	};

	const darkTheme = () => {
		setTheme('cypher cypher-dark');
	};

  let content = '';
  if (loading) {
    content = (<p>...waiting</p>);
  } else if (error) {
    content = (<p style="color: red">{error.message}</p>);
  } else if (results) {
    content = results.records.map((record, i) => (<pre key={i}>{JSON.stringify(record)}</pre>))
  }

  return (
    <main>
      <CypherEditor onValueChange={onValueChange} autoCompleteSchema={neo4jSchema} cypher={cypher} theme={theme} />
      <button onClick={lightTheme}>Light theme</button>
      <button onClick={darkTheme}>Dark theme</button>
      <button onClick={send}>
        Run
      </button>

      <div>
        <h3>Results</h3>
        {content}
      </div>
    </main>
  );
};

export default Database;
