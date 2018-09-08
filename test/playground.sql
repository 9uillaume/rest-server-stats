DROP DATABASE IF EXISTS playground;
CREATE DATABASE playground;

\c playground;

CREATE TABLE locations (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO locations (name)
  VALUES ('Lyon');

INSERT INTO locations (name)
  VALUES ('Marseille');

INSERT INTO locations (name)
  VALUES ('Bordeaux');