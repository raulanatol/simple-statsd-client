export function formatTags(tags = {}) {
  const values = [];
  for (const key of Object.keys(tags)) {
    values.push(`${key}=${tags[key]}`);
  }
  return values.length > 0 ? `,${values.join(',')}` : '';
}
