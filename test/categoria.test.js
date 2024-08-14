const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const secretKey = 'cleitinhoseguranca';
const categoria = require('../src/models/tabelaCategoria');
