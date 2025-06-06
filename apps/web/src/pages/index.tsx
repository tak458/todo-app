import { AddButton } from "@/components/buttons/AddButton";
import { DeleteButton } from "@/components/buttons/DeleteButton";
import { EditButton } from "@/components/buttons/EditButton";
import { DataExport } from "@/components/DataExport";
import { DataImport } from "@/components/DataImport";
import { Layout } from "@/components/globals/Layout";
import { TaskAddDialog } from "@/components/TaskAddDialog";
import { TaskDeleteDialog } from "@/components/TaskDeleteDialog";
import { TaskEditDialog } from "@/components/TaskEditDialog";
import { TreeViewRecursive } from "@/components/TreeViewRecursive";
import { useAppSelector } from "@/hooks/toolkit";
import { DateTimePattern } from "@/models/constants";
import { fromDurationFormat } from "@/models/DurationFormat";
import { Task } from "@/models/Task";
import * as StoreTasks from "@/store/modules/tasks";
import { getTaskTree } from "@/store/modules/tasks";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import Markdown from "markdown-to-jsx";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  const [id, setId] = useState("root");
  const [model, setModel] = useState<Task | undefined>({} as Task);
  const [visibleCompleted, setVisibleCompleted] = useState(false);

  const { children: tasks } = useAppSelector((state) => getTaskTree(state, visibleCompleted));
  const ids = useAppSelector((state) => state.tasks.ids);

  const [openAdd, setOpenAdd] = useState(false);
  const onOpenAdd = useCallback(
    (node?: Task) => () => {
      setOpenAdd(true);
      setId(node?.id ?? "root");
    },
    [],
  );

  const [openEdit, setOpenEdit] = useState(false);
  const onOpenEdit = useCallback(
    (node: Task) => () => {
      setOpenEdit(true);
      setModel(node);
    },
    [],
  );

  const [openDelete, setOpenDelete] = useState(false);
  const onOpenDelete = useCallback(
    (node: Task) => () => {
      setOpenDelete(true);
      setModel(node);
    },
    [],
  );

  return (
    <Layout>
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: (theme) => theme.spacing(4),
          paddingBottom: (theme) => theme.spacing(4),
        }}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <Card>
              <CardHeader
                title="タスクツリー"
                action={
                  <>
                    <FormControlLabel
                      label="完了タスクを非表示"
                      control={
                        <Switch value={visibleCompleted} onChange={(_, checked) => setVisibleCompleted(checked)} />
                      }
                    />
                    <DataImport />
                    <DataExport />
                    <AddButton onClick={onOpenAdd()} />
                  </>
                }
              />
              <CardContent>
                <TreeViewRecursive
                  treeNode={tasks}
                  defaultExpanded={ids}
                  renderLabel={(node) => (
                    <Accordion square={true} elevation={0}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        onClick={(e) => e.stopPropagation()}
                        onFocus={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={!!node.completedAt}
                          onClick={(e) => {
                            const completedAt = node.completedAt ? undefined : new Date().getTime();
                            dispatch(StoreTasks.tasks.actions.update({ ...node, completedAt }));
                            e.stopPropagation();
                          }}
                          onFocus={(e) => {
                            e.stopPropagation();
                          }}
                          sx={{
                            padding: 0,
                            paddingRight: (theme) => theme.spacing(1),
                          }}
                        />
                        <Typography
                          sx={{
                            fontWeight: "inherit",
                            flexGrow: 1,
                          }}
                        >
                          {node.name}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails onClick={(e) => e.stopPropagation()} onFocus={(e) => e.stopPropagation()}>
                        <Grid container>
                          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            開始日:{node.startedAt ? format(node.startedAt, DateTimePattern) : "---"}
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            終了日:{node.finishedAt ? format(node.finishedAt, DateTimePattern) : "---"}
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            見積時間:{node.estimatedTime ? fromDurationFormat(node.estimatedTime) : "---"}
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            実績時間:{node.actualTime ? fromDurationFormat(node.actualTime) : "---"}
                          </Grid>
                          <Grid size={12}>
                            <Markdown>{node.note ?? ""}</Markdown>
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
            {openEdit && model && <TaskEditDialog open={openEdit} setOpen={setOpenEdit} model={model} />}
            {openDelete && model && <TaskDeleteDialog open={openDelete} setOpen={setOpenDelete} model={model} />}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
