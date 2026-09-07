import { site } from '../config/site';
export function absoluteUrl(path: string): string {
  const url = new URL(path, site.url);
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Metadata URLs must use HTTP(S).');
  return url.href;
}
export function serializeSchema(value: Record<string, unknown>): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
export function xml(value: string): string {
  return value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!);
}
