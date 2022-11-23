import neo4j, { type Driver, type QueryResult } from "neo4j-driver";

export const schemaQuery = `
CALL db.labels() YIELD label
WITH collect(label) AS labels
CALL db.relationshipTypes() YIELD relationshipType
WITH labels, collect(relationshipType) AS relationshipTypes
RETURN labels, relationshipTypes
`;

export function runQuery(driver: Driver, q: string): Promise<QueryResult> {
  return new Promise(async (resolve, reject) => {
    if (!driver) {
      reject(new Error("Driver not connected"));
      return;
    }
    const session = driver.session();
    try {
      const res = await session.run(q);
      resolve(res);
    } catch (e) {
      reject(e);
    }
    session.close();
  });
}

export async function connect({
  connectURL,
  username,
  password
}): Promise<Driver> {
  const newDriver = neo4j.driver(
    connectURL,
    neo4j.auth.basic(username, password)
  );
  await newDriver.verifyConnectivity();
  return newDriver;
}
