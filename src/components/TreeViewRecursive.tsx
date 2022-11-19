import { TreeItem, TreeView, TreeViewProps } from "@mui/lab";
import React, { ReactNode } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type RenderTree<T> = {
  id: string;
  name: ReactNode;
  children: RenderTree<T>[];
} & T;

function renderTree<T>(node: RenderTree<T>, renderLabel: (node: RenderTree<T>) => ReactNode = (node) => node.name) {
  return (
    <TreeItem key={node.id} nodeId={String(node.id)} label={renderLabel(node)}>
      {Array.isArray(node.children) ? node.children.map((node) => renderTree(node, renderLabel)) : null}
    </TreeItem>
  );
}

export interface TreeViewRecursiveProps<T> {
  treeNode: RenderTree<T> | RenderTree<T>[];
  selected?: string;
  onSelected?: (event: React.SyntheticEvent, nodeId: string) => void;
  renderLabel?: (node: RenderTree<T>) => ReactNode;
  defaultExpanded?: TreeViewProps["defaultExpanded"];
}

export function TreeViewRecursive<T>(props: TreeViewRecursiveProps<T>) {
  return (
    <>
      {(Array.isArray(props.treeNode) ? props.treeNode : [props.treeNode]).map((taskTree) => {
        return (
          <TreeView
            key={taskTree.id}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={props.defaultExpanded}
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
