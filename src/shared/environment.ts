export function isProductionEnvironnement() {
  return process.env['NODE_ENV'] === 'production';
}
