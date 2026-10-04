module.exports = {
  presets: [require('@iqra/config/tailwind-preset')],
  content: {
    relative: true,
    files: ['./app/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  },
}
