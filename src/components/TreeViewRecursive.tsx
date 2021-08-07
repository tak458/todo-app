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

export interface TreeViewRecursiveProps<T extends RenderTree> {
  treeNode: T | T[];
  selected?: string | null;
  onSelected?: (event: React.ChangeEvent, nodeId: string) => void;
  renderLabel?: (node: T) => ReactNode;
}

export function TreeViewRecursive<T extends RenderTree>(props: TreeViewRecursiveProps<T>) {
  return (
    <>
      {(Array.isArray(props.treeNode) ? props.treeNode : [props.treeNode]).map((taskTree) => {
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