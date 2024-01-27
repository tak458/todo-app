import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { TaskAddDialog } from "./TaskAddDialog";

const MockStore = ({ children }: { children: ReactNode }) => (
  <Provider
    store={configureStore({
      reducer: () => {},
    })}
  >
    {children}
  </Provider>
);

const meta: Meta<typeof TaskAddDialog> = {
  title: "global/TaskAddDialog",
  component: TaskAddDialog,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof TaskAddDialog>;

export const Main: Story = {
  decorators: [
    (story) => {
      return <MockStore>{story()}</MockStore>;
    },
  ],
};
