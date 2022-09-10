import React, { useState } from "react";
import neo4j from "neo4j-driver";
// import CypherEditor from "react-codemirror-cypher";
import { neo4jSchema, defaultQuery, defaultOptions, initialPosition, host, user, pass } from "demo-base";

const initialValue = defaultQuery;
const initialOptions = defaultOptions;

const driver = neo4j.driver(
  host,
  neo4j.auth.basic(user, pass)
);

const Database = ({ CypherEditor }) => {
  const [cypher, setCypher] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [theme, setTheme] = useState("light");
  const [position, setPosition] = useState(initialPosition);
  const [focused, setFocused] = useState(true);
  const [editor, setEditor] = useState(null);
  const [lineNumbers, setLineNumbers] = useState(initialOptions.lineNumbers || true);
  const [readOnly, setReadOnly] = useState(initialOptions.readOnly || false);

  const send = () => {
    const session = driver.session();
    setLoading(true);
    session.run(cypher).then(
      (results) => {
        setResults(results);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setResults(null);
        setLoading(false);
        setError(error);
      }
    );
  };

  const onValueChange = (value, change) => {
    setCypher(value);
  };

  const onPositionChange = (positionObject) => {
    setPosition(positionObject);
  }

  const onFocusChange = (focused) => {
    setFocused(focused);
  }

  const onEditorCreate = (editor) => {
    setEditor(editor);
  };

  const lightTheme = () => {
    setTheme("light");
  };

  const darkTheme = () => {
    setTheme("dark");
  };

  let content = "";
  if (loading) {
    content = <p>...waiting</p>;
  } else if (error) {
    content = <p style={{ color: "red" }}>{error.message}</p>;
  } else if (results) {
    content = results.records.map((record, i) => (
      <pre key={i}>{JSON.stringify(record)}</pre>
    ));
  }

  const cypherLength = cypher.length;
  const positionString = position ? JSON.stringify(position) : "";
  
  const toggleLineNumbers = () => {
    setLineNumbers(!lineNumbers);
    editor && editor.setLineNumbers(!lineNumbers);
  };

  const toggleReadOnly = () => {
    let newReadOnly;
    if (readOnly === false) {
      newReadOnly = true;
    } else if (readOnly === true) {
      newReadOnly = "nocursor";
    } else if (readOnly === "nocursor") {
      newReadOnly = false;
    }
    setReadOnly(newReadOnly);
    editor && editor.setReadOnly(newReadOnly);
  }

  return (
    <main>
      <CypherEditor
        onValueChange={onValueChange}
        onPositionChange={onPositionChange}
        onFocusChange={onFocusChange}
        onEditorCreate={onEditorCreate}
        initialPosition={initialPosition}
        initialSchema={neo4jSchema}
        initialValue={initialValue}
        initialOptions={initialOptions}
        theme={theme}
      />
      <button onClick={lightTheme}>Light theme</button>
      <button onClick={darkTheme}>Dark theme</button>
      <button onClick={toggleLineNumbers}>Line Numbers</button>
      <button onClick={toggleReadOnly}>Readonly</button>
      <div>Length: {cypherLength}</div>
      <div>Position: {positionString}</div>
      <div>Focused: {focused + ''}</div>
      <button onClick={send}>Run</button>

      <div>
        <h3>Results</h3>
        {content}
      </div>
    </main>
  );
};

export default Database;
