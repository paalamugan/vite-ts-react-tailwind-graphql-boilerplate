module.exports = {
  '**/*.ts?(x)': () => 'yarn type-check',
  '*.{js,jsx,ts,tsx}': ['yarn format', 'yarn lint:fix'],
  '*.{json,md,yml}': ['yarn format'],
};
