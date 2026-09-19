import { expect } from 'chai';
import { Validation } from '../src/utils/validators';

describe('Validation Namespace', () => {
  it('isRequired має повертати true для непорожніх рядків', () => {
    expect(Validation.isRequired('Some text')).to.be.true;
    expect(Validation.isRequired('   text   ')).to.be.true;
  });

  it('isRequired має повертати false для порожніх рядків', () => {
    expect(Validation.isRequired('')).to.be.false;
    expect(Validation.isRequired('    ')).to.be.false;
  });

  it('isValidUserId має пропускати лише цифри', () => {
    expect(Validation.isValidUserId('123456')).to.be.true;
    expect(Validation.isValidUserId('123a45')).to.be.false;
    expect(Validation.isValidUserId('user123')).to.be.false;
  });

  it('isValidYear має пропускати реалістичні роки', () => {
    expect(Validation.isValidYear('2024')).to.be.true;
    expect(Validation.isValidYear('1999')).to.be.true;
    expect(Validation.isValidYear('999')).to.be.false;
    expect(Validation.isValidYear('20245')).to.be.false;
    expect(Validation.isValidYear('abcd')).to.be.false;
  });
});