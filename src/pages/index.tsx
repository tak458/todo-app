import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { format } from "date-fns";
import React, { useCallback, useState } from "react";
import { AddButton } from "../components/buttons/AddButton";
import { DeleteButton } from "../components/buttons/DeleteButton";
import { EditButton } from "../components/buttons/EditButton";
import { Layout } from "../components/globals/Layout";
import { TaskAddDialog } from "../components/TaskAddDialog";
import { TaskDeleteDialog } from "../components/TaskDeleteDialog";
import { TaskEditDialog } from "../components/TaskEditDialog";
import { TreeViewRecursive } from "../components/TreeViewRecursive";
import { useAppSelector } from "../hooks/toolkit";
import { DateTimePattern } from "../models/constants";
import { getTaskTree } from "../store/modules/tasks";
import { Task } from "../models/Task";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useDispatch } from "react-redux";
import * as StoreTasks from "../store/modules/tasks";
import Markdown from "markdown-to-jsx";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  labelIcon: {
    width: 18,
    height: 18,
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
  finishedCheckbox: {
    padding: 0,
    paddingRight: theme.spacing(1),
  },
}));

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { children: tasks } = useAppSelector(getTaskTree);

  const [id, setId] = useState("root");
  const [model, setModel] = useState<Task | undefined>({} as Task);

  const [openAdd, setOpenAdd] = useState(false);
  const onOpenAdd = useCallback(
    (node?: Task) => () => {
      setOpenAdd(true);
      setId(node?.id ?? "root");
    },
    []
  );

  const [openEdit, setOpenEdit] = useState(false);
  const onOpenEdit = useCallback(
    (node: Task) => () => {
      setOpenEdit(true);
      setModel(node);
    },
    []
  );

  const [openDelete, setOpenDelete] = useState(false);
  const onOpenDelete = useCallback(
    (node: Task) => () => {
      setOpenDelete(true);
      setModel(node);
    },
    []
  );

  return (
    <Layout>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="タスクツリー" action={<AddButton onClick={onOpenAdd()} />} />
              <CardContent>
                <TreeViewRecursive
                  treeNode={tasks}
                  renderLabel={(node) => (
                    <Accordion square={true}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        onClick={(e) => e.stopPropagation()}
                        onFocus={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          className={classes.finishedCheckbox}
                          checked={!!node.completedAt}
                          onClick={(e) => {
                            const completedAt = node.completedAt ? undefined : new Date().getTime();
                            dispatch(StoreTasks.tasks.actions.update({ ...node, completedAt }));
                            e.stopPropagation();
                          }}
                          onFocus={(e) => {
                            e.stopPropagation();
                          }}
                        />
                        <Typography className={classes.labelText}>{node.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails onClick={(e) => e.stopPropagation()} onFocus={(e) => e.stopPropagation()}>
                        <Grid container>
                          <Grid item xs={12} sm={6}>
                            開始日:{node.startedAt ? format(node.startedAt, DateTimePattern) : "---"}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            終了日:{node.finishedAt ? format(node.finishedAt, DateTimePattern) : "---"}
                          </Grid>
                          <Grid item xs={12}>
                            <Markdown>{node.note}</Markdown>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                      <AccordionActions onClick={(e) => e.stopPropagation()} onFocus={(e) => e.stopPropagation()}>
                        <AddButton size="small" onClick={onOpenAdd(node)} />
                        <EditButton size="small" onClick={onOpenEdit(node)} />
                        <DeleteButton size="small" onClick={onOpenDelete(node)} />
                      </AccordionActions>
                    </Accordion>
                  )}
                />
              </CardContent>
            </Card>
            {openAdd && <TaskAddDialog open={openAdd} setOpen={setOpenAdd} parentId={id} />}
            {openEdit && <TaskEditDialog open={openEdit} setOpen={setOpenEdit} model={model} />}
            {openDelete && <TaskDeleteDialog open={openDelete} setOpen={setOpenDelete} model={model} />}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
