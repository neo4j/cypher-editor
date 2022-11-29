/*
 * Copyright (c) "Neo4j"
 * Neo4j Sweden AB [http://neo4j.com]
 *
 * This file is part of Neo4j.
 *
 * Neo4j is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
