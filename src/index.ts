import { definePreset } from '@unocss/core'

interface PresetColorsRGBOptions {
  rgbs?: Record<string, any>
  separator: 'comma' | 'space'
}

function convertColorsToRgb(colors: Record<string, any>, separator: PresetColorsRGBOptions['separator']): Record<string, any> {
  if (typeof colors !== 'object')
    return {}

  const convertedColors: Record<string, any> = {}
  for (const key in colors) {
    if (typeof colors[key] === 'string') {
      const rgb = hexToRgb(colors[key])
      if (rgb)
        convertedColors[key] = rgb.join(separator === 'comma' ? ', ' : ' ')
    } else if (typeof colors[key] === 'object') {
      convertedColors[key] = convertColorsToRgb(colors[key], separator)
    }
  }
  return convertedColors
}

function hexToRgb(hex: string) {
  // Remove the hash character if it exists
  hex = hex.replace('#', '')

  if (hex.length !== 3 && hex.length !== 6)
    return

  // Expand short form (3 digits) to long form (6 digits)
  hex = hex.length === 3
    ? hex.split('').map(digit => digit + digit).join('')
    : hex

  // Convert the hex string to a number
  const num = Number.parseInt(hex, 16)
  if (Number.isNaN(num))
    return

  // Return the RGB value
  return [
    (num >> 16) & 255,
    (num >> 8) & 255,
    num & 255,
  ]
}

export const presetColorsRGB = definePreset((
  { rgbs, separator = 'space' }: Partial<PresetColorsRGBOptions> = {},
) => {
  return {
    name: 'unocss-preset-colors-rgb',
    extendTheme: (theme: Record<string, any>) => {
      theme.rgbs = rgbs ?? convertColorsToRgb(theme.colors, separator)
      return theme
    },
  }
})

export default presetColorsRGB
