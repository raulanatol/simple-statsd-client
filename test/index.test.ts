import { formatTags, SimpleStatsdClient } from '../lib';

describe('index', () => {
  describe.skip('Sent message', () => {
    test('Should send a simple message', done => {
      const client = new SimpleStatsdClient('localhost', 8125, true);
      client.increment('test-increment', 8, { name: 'a', count: 'b', asd: 123 }).then(() => {
        done();
      }).catch(err => done(err));
    });
  });

  describe('Utils', () => {
    describe('formatTags', () => {
      test('Should return empty string with no tags', () => {
        expect(formatTags()).toHaveLength(0);
      });

      test('Should return empty string with undefined tags', () => {
        expect(formatTags(undefined)).toHaveLength(0);
      });

      test('Should return a valid tags string with valid tags', () => {
        expect(formatTags({ name: 'nameValue', count: 'countValue' })).toBe(',name=nameValue,count=countValue');
      });
    });
  });
});
