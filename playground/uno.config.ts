import { defineConfig, presetMini, transformerDirectives } from 'unocss'
import { presetColorsRGB } from '../src/index'

export default defineConfig({
  presets: [
    presetMini(),
    presetColorsRGB(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
