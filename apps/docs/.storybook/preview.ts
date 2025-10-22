import type { Preview } from "@storybook/react";
import "@lyra/ui/styles";
import "./utilities.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
