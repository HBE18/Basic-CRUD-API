const { supertest } = require('supertest');

test('should output abc', () => {
const text = 'abc';
expect(text).toBe('abc');
})