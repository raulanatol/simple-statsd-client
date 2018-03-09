import { formatTags } from '../lib/utils';

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
