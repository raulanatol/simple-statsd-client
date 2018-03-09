import { SimpleStatsdClient } from '../lib';

describe('index', () => {
  describe.skip('Sent message', () => {
    test('Should send a simple message', done => {
      const client = new SimpleStatsdClient('localhost', 8125, true);
      client.increment('test-increment', 8, { name: 'a', count: 'b', asd: 123 }).then(() => {
        done();
      }).catch(err => done(err));
    });
  });
});
