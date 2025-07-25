import type { Preview } from "@storybook/nextjs";
import { withMuiTheme } from "./with-mui-theme.decorator";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
      hideNoControlsWarning: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      title: "Theme",
      description: "Theme for your components",
      defaultValue: "light",
      toolbar: {
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          { value: "light", left: "☀️", title: "Light mode" },
          { value: "dark", left: "🌙", title: "Dark mode" },
        ],
      },
    },
  },
  decorators: [withMuiTheme],
};

export default preview;
