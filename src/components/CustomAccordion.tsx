import { Accordion, AccordionSummary } from "@mui/material";

import withStyles from '@mui/styles/withStyles';

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
