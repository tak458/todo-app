import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import markdown from "@shikijs/langs/markdown";
import githubLight from "@shikijs/themes/github-light";

const highlighterPromise = createHighlighterCore({
  engine: createJavaScriptRegexEngine(),
  langs: [markdown],
  themes: [githubLight],
});

export const highlightMarkdown = async (code: string) =>
  (await highlighterPromise).codeToHtml(code, {
    lang: "markdown",
    theme: "github-light",
  });
