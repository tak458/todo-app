import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import Prism from "prismjs";
import React, { createRef, VFC, useEffect, useState } from "react";

import "prismjs/themes/prism.css";
import { useCallback } from "react";

const useStyles = makeStyles((theme) => ({
  codeEditContainer: {
    position: "relative",
    marginTop: theme.spacing(2),
    height: 150,
    "& code[class*='language-']": {
      fontSize: "15pt",
      fontFamily: "monospace",
      lineHeight: "20pt",
    },
    "& pre[class*='language-']": {
      margin: 0,
      padding: 5,
      fontSize: "15pt",
      fontFamily: "monospace",
      lineHeight: "20pt",
    },
  },
  codeInOutBase: {
    position: "absolute",
    margin: 0,
    padding: 5,
    top: 0,
    left: 0,
    width: "100%",
    height: 150,
    border: 0,
    overflow: "auto",
    whiteSpace: "nowrap",
  },
  codeInOutBaseWithInsides: {
    fontSize: "15pt",
    fontFamily: "monospace",
    lineHeight: "20pt",
  },
  codeInput: {
    zIndex: 1,
    color: "transparent",
    background: "transparent",
    caretColor: "black",
    resize: "none",
  },
  codeOutput: {
    zIndex: 0,
  },
  languageMarkdown: {
    margin: 0,
    padding: 0,
  },
}));

export interface MarkdownEditorProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export const MarkdownEditor: VFC<MarkdownEditorProps> = (props) => {
  const classes = useStyles();

  const [text, setText] = useState(props.value);

  const handleChange = useCallback(
    (event) => {
      const text = event.target.value;
      props.onChange(text);
      setText(text);
    },
    [props]
  );

  const handleKeyDown = useCallback(
    (evt) => {
      let value = props.value;
      const selStartPos = evt.currentTarget.selectionStart;

      // handle 4-space indent on
      if (evt.key === "Tab") {
        value = value.substring(0, selStartPos) + "    " + value.substring(selStartPos, value.length);
        evt.currentTarget.selectionStart = selStartPos + 3;
        evt.currentTarget.selectionEnd = selStartPos + 4;
        evt.preventDefault();

        props.onChange(value);
      }
    },
    [props]
  );

  const preRef = createRef<HTMLPreElement>();
  const textareaRef = createRef<HTMLTextAreaElement>();
  const handleScroll = useCallback(() => {
    const editing = textareaRef.current;
    const highlighting = preRef.current;
    highlighting.scrollTop = editing.scrollTop;
    highlighting.scrollLeft = editing.scrollLeft;
  }, [preRef, textareaRef]);

  useEffect(() => {
    // Handle final newlines
    if (text[text.length - 1] === "\n") {
      setText(text + " ");
    }

    Prism.highlightAll();
  }, [text]);

  return (
    <div className={classes.codeEditContainer}>
      <textarea
        id={props.id}
        value={props.value}
        className={clsx(classes.codeInOutBase, classes.codeInOutBaseWithInsides, classes.codeInput)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        ref={textareaRef}
      />
      <pre
        className={clsx(classes.codeInOutBase, classes.codeInOutBaseWithInsides, classes.codeOutput)}
        aria-hidden="true"
        ref={preRef}
      >
        <code className={clsx("language-markdown", classes.codeInOutBaseWithInsides, classes.languageMarkdown)}>
          {text}
        </code>
      </pre>
    </div>
  );
};
