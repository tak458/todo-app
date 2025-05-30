import { SimpleTreeView, SimpleTreeViewProps, TreeItem } from "@mui/x-tree-view";
import type { ReactNode } from "react";

type RenderTree<T> = {
  id: string | number;
  name: ReactNode;
  children: RenderTree<T>[];
} & T;

function renderTree<T>(node: RenderTree<T>, renderLabel: (node: RenderTree<T>) => ReactNode = (node) => node.name) {
  return (
    <TreeItem key={node.id} itemId={String(node.id)} label={renderLabel(node)}>
      {Array.isArray(node.children) ? node.children.map((node) => renderTree(node, renderLabel)) : null}
    </TreeItem>
  );
}

export interface TreeViewRecursiveProps<T> {
  treeNode: RenderTree<T> | RenderTree<T>[];
  selected?: string;
  onSelected?: SimpleTreeViewProps<false>["onItemSelectionToggle"];
  renderLabel?: (node: RenderTree<T>) => ReactNode;
  defaultExpanded?: SimpleTreeViewProps<false>["defaultExpandedItems"];
}

export function TreeViewRecursive<T>(props: TreeViewRecursiveProps<T>) {
  return (
    <>
      {(Array.isArray(props.treeNode) ? props.treeNode : [props.treeNode]).map((treeNode) => {
        return (
          <SimpleTreeView
            key={treeNode.id}
            defaultExpandedItems={props.defaultExpanded}
            onItemSelectionToggle={props.onSelected}
            selectedItems={props.selected}
          >
            {renderTree(treeNode, props.renderLabel)}
          </SimpleTreeView>
        );
      })}
    </>
  );
}
