import type { Meta, StoryObj } from "@storybook/nextjs";

import { DeleteButton } from "./DeleteButton";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof DeleteButton> = {
  title: "buttons/DeleteButton",
  component: DeleteButton,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DeleteButton>;

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
