import { defineConfig, presetUno, transformerDirectives } from 'unocss'
import { presetColorsRGB } from '../src/index'

export default defineConfig({
  presets: [
    presetUno(),
    presetColorsRGB(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
