require('dotenv').config();

const _test = process.env.NODE_ENV === 'test';

const NODE_ENV = process.env.NODE_ENV;

const PORT = process.env.PORT;

const DB_USERNAME = _test
  ? process.env.DB_USERNAME_TEST
  : process.env.DB_USERNAME;

const DB_PASSWORD = _test
  ? process.env.DB_PASSWORD_TEST
  : process.env.DB_PASSWORD;

const DB_CLUSTER = _test
  ? process.env.DB_CLUSTER_TEST
  : process.env.DB_CLUSTER;

const DB_USER = _test
  ? process.env.DB_USER_TEST
  : process.env.DB_USER;

const DB_CHAT = _test
  ? process.env.DB_CHAT_TEST
  : process.env.DB_CHAT;

const DB_MESSAGE = _test
  ? process.env.DB_MESSAGE_TEST
  : process.env.DB_MESSAGE;

const DB_TOPIC = _test
  ? process.env.DB_TOPIC_TEST
  : process.env.DB_TOPIC;

const DB_POST = _test
  ? process.env.DB_POST_TEST
  : process.env.DB_POST;

const DB_COMMENTS = _test
  ? process.env.DB_COMMENTS_TEST
  : process.env.DB_COMMENTS;

const DB_PASSWORD_RECOVERY = _test
  ? process.env.DB_PASSWORD_RECOVERY_TEST
  : process.env.DB_PASSWORD_RECOVERY;

const JWT_SECRET = process.env.JWT_SECRET;

const GOOGLE_ACCOUNT = process.env.GOOGLE_ACCOUNT;

const GOOGLE_PASSWORD = process.env.GOOGLE_PASSWORD;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

module.exports = {
  NODE_ENV,
  PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_CLUSTER,
  DB_USER,
  DB_CHAT,
  DB_MESSAGE,
  DB_TOPIC,
  DB_POST,
  DB_COMMENTS,
  DB_PASSWORD_RECOVERY,
  JWT_SECRET,
  GOOGLE_ACCOUNT,
  GOOGLE_PASSWORD,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
};