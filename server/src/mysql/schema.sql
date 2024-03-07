CREATE DATABASE IF NOT EXISTS voiceArchives;
USE voiceArchives;

CREATE TABLE IF NOT EXISTS users (
  id              INT           PRIMARY KEY AUTO_INCREMENT,
  name            VARCHAR(50)   NOT NULL,
  gender          VARCHAR(10),
  age             INT,
  email           VARCHAR(50)   NOT NULL,
  password        VARCHAR(50)   NOT NULL,
  passwordConfirm VARCHAR(50)   NOT NULL,
  createdAt       TIMESTAMP     DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt       DATETIME
);

