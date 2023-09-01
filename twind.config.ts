import { defineConfig, Preset } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind/base";
import presetAutoprefix from "@twind/preset-autoprefix";

// Using @twind/preset-tailwind/base to exclude the default tailwind colors

import darkColor from "@twind/preset-radix-ui/darkColor";

import {
  amber as yellow,
  // emerald as green,
  indigo as blue,
  purple,
  red,
  slate as gray,
} from "@twind/preset-tailwind/colors";

const green = {
  "50": "#ecfdf5",
  "100": "#d1fae5",
  "200": "#a7f3d0",
  "300": "#6ee7b7",
  "400": "#4dd276",
  "500": "#10b981",
  "600": "#059669",
  "700": "#047857",
  "800": "#065f46",
  "900": "#064e3b",
};

export default {
  ...defineConfig({
    presets: [
      presetAutoprefix(),
      presetTailwind({
        colors: {
          yellow,
          green,
          blue,
          red,
          gray,
          purple,
        },
      }) as Preset,
    ],
  }),
  selfURL: import.meta.url,
};
