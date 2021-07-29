import { Card, CardContent, CardHeader, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Layout } from "../components/globals/Layout";
import { TaskAddDialog } from "../components/TaskAddDialog";
import { TaskDeleteDialog } from "../components/TaskDeleteDialog";
import { TaskEditDialog } from "../components/TaskEditDialog";
import { TaskTreeView } from "../components/TaskTreeView";
import { useAppSelector } from "../hooks/toolkit";
import { getTaskTree } from "../store/modules/tasks";

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

  return (
    <Layout>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="タスク" action={<TaskAddDialog parentId="root" />} />
              <CardContent>
                <TaskTreeView
                  taskTree={tasks}
                  renderLabel={(node) => (
                    <div className={classes.labelRoot}>
                      <Typography variant="body2" className={classes.labelText}>
                        {node.name}
                      </Typography>
                      <TaskAddDialog parentId={node.id} />
                      <TaskEditDialog model={node} />
                      <TaskDeleteDialog model={node} />
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
