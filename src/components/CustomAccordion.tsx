import { Accordion, AccordionSummary, withStyles } from "@material-ui/core";

export const CustomAccordion = withStyles({
  root: { borderBottom: "solid 1px #ccc" },
})(Accordion);

export const CustomAccordionSummary = withStyles({
  root: {
    "&.Mui-expanded": {
      minHeight: "unset",
      borderBottom: "dotted 1px #ccc",
    },
  },
  content: {
    "&.Mui-expanded": {
      margin: "unset",
    },
  },
})(AccordionSummary);
