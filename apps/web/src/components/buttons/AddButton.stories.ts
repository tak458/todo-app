import type { Meta, StoryObj } from "@storybook/nextjs";

import { AddButton } from "./AddButton";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AddButton> = {
  title: "buttons/AddButton",
  component: AddButton,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AddButton>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    color: "primary",
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Secondary: Story = {
  args: {
    color: "secondary",
  },
};
