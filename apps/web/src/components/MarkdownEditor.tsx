import { styled } from "@mui/material/styles";
import clsx from "clsx";
import Prism from "prismjs";
import {
  ChangeEventHandler,
  createRef,
  forwardRef,
  KeyboardEventHandler,
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import "prismjs/components/prism-markdown";
import "prismjs/themes/prism.css";

const PREFIX = "MarkdownEditor";

const classes = {
  codeEditContainer: `${PREFIX}-codeEditContainer`,
  codeInOutBase: `${PREFIX}-codeInOutBase`,
  codeInput: `${PREFIX}-codeInput`,
  codeOutput: `${PREFIX}-codeOutput`,
  languageMarkdown: `${PREFIX}-languageMarkdown`,
};

const Root = styled("div")(({ theme }) => {
  const editorFont = {
    fontSize: "1em",
    fontFamily: "monospace",
    lineHeight: "1.2em",
  };
  const editorHeight = 150;
  const editorPadding = 5;

  return {
    [`&.${classes.codeEditContainer}`]: {
      position: "relative",
      marginTop: theme.spacing(2),
      height: editorHeight,
      "& code[class*='language-']": {
        ...editorFont,
      },
      "& pre[class*='language-']": {
        margin: 0,
        padding: editorPadding,
        ...editorFont,
      },
    },
    [`& .${classes.codeInOutBase}`]: {
      position: "absolute",
      margin: 0,
      padding: editorPadding,
      top: 0,
      left: 0,
      width: "100%",
      height: editorHeight,
      border: 0,
      overflow: "auto",
      whiteSpace: "nowrap",
    },
    [`& .${classes.codeInput}`]: {
      zIndex: 1,
      color: "transparent",
      background: "transparent",
      caretColor: "black",
      resize: "none",
      ...editorFont,
    },
    [`& .${classes.codeOutput}`]: {
      zIndex: 0,
      ...editorFont,
    },
    [`& .${classes.languageMarkdown}`]: {
      margin: 0,
      padding: 0,
      ...editorFont,
    },
  };
});

export interface MarkdownEditorProps {
  id: string;
  value?: string;
  onChange: (value: string) => void;
}

export const MarkdownEditor = forwardRef<HTMLTextAreaElement, MarkdownEditorProps>(function MarkdownEditor(
  props: MarkdownEditorProps,
  ref,
) {
  const [text, setText] = useState(props.value ?? "");

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      const text = event.target.value;
      props.onChange(text);
      setText(text);
    },
    [props],
  );

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (evt) => {
      let value = props.value;
      const selStartPos = evt.currentTarget.selectionStart;

      // handle 4-space indent on
      if (evt.key === "Tab") {
        value = (value?.substring(0, selStartPos) ?? "") + "    " + (value?.substring(selStartPos, value.length) ?? "");
        evt.currentTarget.selectionStart = selStartPos + 3;
        evt.currentTarget.selectionEnd = selStartPos + 4;
        evt.preventDefault();

        props.onChange(value);
      }
    },
    [props],
  );

  const preRef = createRef<HTMLPreElement>();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const setRef: LegacyRef<HTMLTextAreaElement> = useCallback(
    (node: HTMLTextAreaElement) => {
      textareaRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  const handleScroll = useCallback(() => {
    const editing = textareaRef.current;
    const highlighting = preRef.current;
    if (highlighting && editing) {
      highlighting.scrollTop = editing.scrollTop;
      highlighting.scrollLeft = editing.scrollLeft;
    }
  }, [preRef, textareaRef]);

  const displayText = text.endsWith("\n") ? `${text} ` : text;

  useEffect(() => {
    Prism.highlightAll();
  }, [displayText]);

  return (
    <Root className={classes.codeEditContainer}>
      <textarea
        id={props.id}
        value={props.value}
        className={clsx(classes.codeInOutBase, classes.codeInput)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        ref={setRef}
      />
      <pre className={clsx(classes.codeInOutBase, classes.codeOutput)} aria-hidden="true" ref={preRef}>
        <code className={clsx("language-markdown", classes.languageMarkdown)}>{displayText}</code>
      </pre>
    </Root>
  );
});
