import type { Meta, StoryObj } from "@storybook/nextjs";
import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "global/Footer",
  component: Footer,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Main: Story = {};
