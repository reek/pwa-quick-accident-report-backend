import { describe, it } from 'mocha';
import * as dotenv from 'dotenv';
import { checkToken } from '../auth';
import * as jwt from 'jsonwebtoken';
import * as chai from 'chai';
const expect = chai.expect;

dotenv.config();

const TOKEN_CONTENT = {name: 'toto'}
const VALID_TOKEN = jwt.sign(TOKEN_CONTENT, process.env.JWT_SECRET)
const INVALID_TOKEN = 'kjadshladfshgfskjhgkj';
const EMTPY_TOKEN = '';


describe('Token check test suite', () => {

  it('Should detect empty token', () => {
    expect(checkToken(EMTPY_TOKEN)).equals(null);
  });

  it('Should detect invalid token', () => {
    expect(checkToken(INVALID_TOKEN)).equals(false);
  });

  it('Should detect valid token', () => {
    expect(checkToken(VALID_TOKEN)).has.haveOwnProperty('name').and.equal('toto');
  });

});

