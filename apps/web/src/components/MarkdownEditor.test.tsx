import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useState } from "react";
import { vi } from "vitest";

import { MarkdownEditor } from "@/components/MarkdownEditor";

vi.mock("shiki/bundle/web", () => ({
  codeToHtml: vi.fn<(code: string) => Promise<string>>(async (code) => `<pre class="shiki"><code>${code}</code></pre>`),
}));

function ControlledMarkdownEditor() {
  const [value, setValue] = useState("");
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
});
