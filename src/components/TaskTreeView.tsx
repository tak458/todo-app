import { TreeItem, TreeView } from "@material-ui/lab";
import React, { ReactNode } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

interface RenderTree {
  id: string;
  name: ReactNode;
  children: RenderTree[];
}

function renderTree<T extends RenderTree>(node: T, renderLabel: (node: T) => ReactNode = (node) => node.name) {
  return (
    <TreeItem key={node.id} nodeId={String(node.id)} label={renderLabel(node)}>
      {Array.isArray(node.children) ? node.children.map((node) => renderTree(node, renderLabel)) : null}
    </TreeItem>
  );
}

export interface TaskTreeViewProps<T extends RenderTree> {
  taskTree: T | T[];
  selected?: string | null;
  onSelected?: (event: React.ChangeEvent, nodeId: string) => void;
  renderLabel?: (node: T) => ReactNode;
}

export function TaskTreeView<T extends RenderTree>(props: TaskTreeViewProps<T>) {
  return (
    <>
      {(Array.isArray(props.taskTree) ? props.taskTree : [props.taskTree]).map((taskTree) => {
        return (
          <TreeView
            key={taskTree.id}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={[]}
            defaultExpandIcon={<ChevronRightIcon />}
            onNodeSelect={props.onSelected}
            selected={props.selected}
          >
            {renderTree(taskTree, props.renderLabel)}
          </TreeView>
        );
      })}
    </>
  );
}
