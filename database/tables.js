import pool from './db';
import dotenv from 'dotenv';

dotenv.config();

const dates = "2020-10-06";
const initUserTable = () => {
  let queryText = '';
  queryText += `
  CREATE TABLE IF NOT EXISTS users (
  id SERIAL,
  email VARCHAR(100) NOT NULL,
  createdon DATE NOT NULL,
  username VARCHAR(100) NOT NULL,
  question VARCHAR(100) NOT NULL,
  answer VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (email)
  );

  CREATE TABLE IF NOT EXISTS data (
    id SERIAL,
    username VARCHAR(100) NOT NULL,
    createdon DATE NOT NULL,
    firstdata INT NOT NULL,
    seconddata INT NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    PRIMARY KEY (id)
    );
    `;

  pool.query(queryText)
  .then((res) => {
    console.log('done');
    pool.end();
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  })
};

const populate = `
INSERT INTO data (username, firstdata, seconddata, longitude, latitude, createdon) VALUES ('osa','30','103','1.003','5.005','${dates}');
INSERT INTO data (username, firstdata, seconddata, longitude, latitude, createdon) VALUES ('osa','340','1053','1.005','0.229','${dates}');
INSERT INTO data (username, firstdata, seconddata, longitude, latitude, createdon) VALUES ('osa','30','10','1.005','0.229','${dates}');
`;


const seedDatabase = async () => {
  await pool.query(populate).then(() => {
    console.log('tables Successfully populated');
    process.exit()
  });
};
initUserTable();
seedDatabase();
export default initUserTable;