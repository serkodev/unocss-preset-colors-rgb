# unocss-preset-colors-rgb

This [UnoCSS](https://unocss.dev/) preset converts your theme colors to RGB CSS variables for increased flexibility and control over your styles.

## Installation

```sh
npm i -D unocss-preset-colors-rgb
yarn i -D unocss-preset-colors-rgb
pnpm i -D unocss-preset-colors-rgb
```

## Why

If you have multiple themes controlled by CSS variables and you want to use the default color preset of UnoCSS, you might encounter issues with opacity modifier syntax.

```css
:root {
  --theme-content: theme('colors.black');
}
.dark {
  --theme-content: theme('colors.white');
}
```

You can use something like `text-$theme-content` successfully, but you cannot use an [opacity modifier syntax](https://tailwindcss.com/docs/text-color#changing-the-opacity) like `text-$theme-content/50`. To resolve this issue, you should declare it inside `theme.color` first.

```ts
// Warning: this is incorrect code.

defineConfig({
  theme: {
    colors: {
      content: 'rgba(var(--theme-content), <alpha-value>)'
    }
  }
})
```

However, this won't work because you can only use RGB values (e.g., `255, 255, 255`) for the `--theme-content` CSS variable.

## Usage

This preset must work with [`theme()`](https://unocss.dev/transformers/directives#theme) from the default UnoCSS `transformerDirectives` transformer.

```ts
import { defineConfig, transformerDirectives } from 'unocss'
import presetColorsRGB from 'unocss-preset-colors-rgb'

export default defineConfig({
  presets: [
    presetColorsRGB(),
  ],
  transformers: [
    transformerDirectives(),
  ]
})
```

This preset helps you convert all of the theme colors (including all default preset colors) into RGB values (`theme.rgbs`). So, you can declare the CSS variable as `theme('rgbs.<color>')` to make it work.

```css
/* style.css */

:root {
  --theme-base: theme('rgbs.blue-100');
  --theme-content: theme('rgbs.black');
}

.dark {
  --theme-base: theme('rgbs.blue-900');
  --theme-content: theme('rgbs.white');
}
```

```js
// uno.config.ts

defineConfig({
  theme: {
    colors: {
      base: 'rgba(var(--theme-base), <alpha-value>)',
      content: 'rgba(var(--theme-content), <alpha-value>)'
    }
  }
})
```

```html
<div class="bg-base/75 text-content">
  Hello <span class="bg-base text-content/50">World</span>
</div>
```

## License

MIT License
