import { definePreset } from '@unocss/core'

function convertColorsToRgb(colors: Record<string, any>): Record<string, any> {
  if (typeof colors !== 'object')
    return {}

  const convertedColors: Record<string, any> = {}
  for (const key in colors) {
    if (typeof colors[key] === 'string') {
      const rgb = hexToRgb(colors[key])
      if (rgb)
        convertedColors[key] = rgb
    } else if (typeof colors[key] === 'object') {
      convertedColors[key] = convertColorsToRgb(colors[key])
    }
  }
  return convertedColors
}

function hexToRgb(hex: string): string | undefined {
  // Remove the hash character if it exists
  hex = hex.replace('#', '')

  if (hex.length !== 3 && hex.length !== 6)
    return

  // Expand short form (3 digits) to long form (6 digits)
  hex = hex.length === 3
    ? hex.split('').map(digit => digit + digit).join('')
    : hex

  // Convert the hex string to a number
  const num = parseInt(hex, 16)
  if (isNaN(num))
    return

  // Extract the red, green, and blue components
  const red = (num >> 16) & 255
  const green = (num >> 8) & 255
  const blue = num & 255

  // Return the RGB value as a string
  return `${red}, ${green}, ${blue}`
}

export const presetColorsRGB = definePreset((colors?: Record<string, any>) => {
  return {
    name: 'unocss-preset-colors-rgb',
    extendTheme: (theme: Record<string, any>) => {
      theme.rgbs = colors ?? convertColorsToRgb(theme.colors)
      return theme
    },
  }
})

export default presetColorsRGB
