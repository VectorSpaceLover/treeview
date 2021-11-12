import React, { useState } from "react";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";
import { Tree } from "@minoru/react-dnd-treeview";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import { theme } from "./theme";
import styles from "./TreeRoot.module.css";
import SampleData from "./sample_data.json";

function TreeRoot() {
  const [treeData, setTreeData] = useState(SampleData);
  const handleDrop = (newTree) => setTreeData(newTree);

  const handleEdit = (nodeId, nodeValue) => {
    console.log('edit', nodeId, nodeValue);
    const newTree = treeData.map((node) => {
      if (node.id === nodeId) {
        return { ...node, text: nodeValue };
      } else {
        return node;
      }
    });
    setTreeData(newTree);
  }

  const handleDelete = (nodeId) => {
    const newTree = treeData.filter((node) => {
      if (node.id !== nodeId) {
        return node;
      }
    });
    setTreeData(newTree);
  }

  return (
    <div className="App">
      <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseLine />
        <div className={styles.app}>
          <Tree
            tree={treeData}
            rootId={0}
            render={(node, { depth, isOpen, onToggle }) => (
              <CustomNode
                node={node}
                depth={depth}
                isOpen={isOpen}
                onToggle={onToggle}
                handleEdit = {handleEdit}
                handleDelete = {handleDelete}
              />
            )}
            dragPreviewRender={(monitorProps) => (
              <CustomDragPreview monitorProps={monitorProps} />
            )}
            onDrop={handleDrop}
            classes={{
              root: styles.treeRoot,
              draggingSource: styles.draggingSource,
              dropTarget: styles.dropTarget
            }}
          />
        </div>
      </ThemeProvider>
    </StylesProvider>
    </div>
  );
}

export default TreeRoot;
