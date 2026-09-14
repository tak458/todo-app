import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useState } from "react";
import { vi } from "vitest";

import { MarkdownEditor } from "@/components/MarkdownEditor";

vi.mock("@/lib/shiki", () => ({
  highlightMarkdown: vi.fn<(code: string) => Promise<string>>(
    async (code) => `<pre class="shiki"><code>${code}</code></pre>`,
  ),
}));

function ControlledMarkdownEditor({ initialValue = "" }: { initialValue?: string }) {
  const [value, setValue] = useState(initialValue);
  return <MarkdownEditor id="memo" value={value} onChange={setValue} />;
}

describe("MarkdownEditor", () => {
  it("Shiki で Markdown をハイライトする", async () => {
    render(<MarkdownEditor id="memo" value="# 見出し" onChange={vi.fn<() => void>()} />);

    await waitFor(() => {
      expect(document.querySelector(".shiki")).not.toBeNull();
    });

    expect(document.querySelector(".shiki")?.textContent).toContain("# 見出し");
  });

  it("入力内容の変更を通知する", async () => {
    const user = userEvent.setup();
    render(<ControlledMarkdownEditor />);

    await user.type(screen.getByRole("textbox"), "メモ");

    expect((screen.getByRole("textbox") as HTMLTextAreaElement).value).toBe("メモ");
  });

  it("Tab で4文字のインデントを挿入する", async () => {
    const user = userEvent.setup();
    render(<ControlledMarkdownEditor initialValue="value" />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    textarea.focus();
    textarea.setSelectionRange(0, 0);
    await user.keyboard("{Tab}");

    expect(textarea.value).toBe("    value");
  });

  it("textarea のスクロール位置をハイライト表示へ同期する", async () => {
    render(<MarkdownEditor id="memo" value="長い Markdown" onChange={vi.fn<() => void>()} />);

    await waitFor(() => {
      expect(document.querySelector(".shiki")).not.toBeNull();
    });

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    const output = document.querySelector(".MarkdownEditor-codeOutput") as HTMLDivElement;
    textarea.scrollTop = 48;
    textarea.scrollLeft = 12;

    fireEvent.scroll(textarea);

    expect(output.scrollTop).toBe(48);
    expect(output.scrollLeft).toBe(12);
  });
});
