import { Card, CardContent, CardHeader, Container, Grid, makeStyles, Typography } from "@material-ui/core";
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
import { getTaskTree, Task } from "../store/modules/tasks";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    width: 18,
    height: 18,
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
}));

export default function Home() {
  const classes = useStyles();

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
                    <div className={classes.labelRoot}>
                      <Typography variant="body2" className={classes.labelText}>
                        {node.name}({format(node.startedAt, DateTimePattern)}→{format(node.finishedAt, DateTimePattern)}
                        )
                      </Typography>
                      <AddButton size="small" onClick={onOpenAdd(node)} />
                      <EditButton size="small" onClick={onOpenEdit(node)} />
                      <DeleteButton size="small" onClick={onOpenDelete(node)} />
                    </div>
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
