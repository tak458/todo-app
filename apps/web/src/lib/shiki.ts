import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import markdown from "@shikijs/langs/markdown";
import githubDark from "@shikijs/themes/github-dark";
import githubLight from "@shikijs/themes/github-light";

export type MarkdownTheme = "github-light" | "github-dark";

const highlighterPromise = createHighlighterCore({
  engine: createJavaScriptRegexEngine(),
  langs: [markdown],
  themes: [githubLight, githubDark],
});

export const highlightMarkdown = async (code: string, theme: MarkdownTheme) =>
  (await highlighterPromise).codeToHtml(code, {
    lang: "markdown",
    theme,
  });
