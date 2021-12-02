import React, { useContext } from "react";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";
import { Tree } from "@minoru/react-dnd-treeview";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import { theme } from "./theme";
import styles from "./TreeRoot.module.css";
import { TreeDataContext } from '../../contexts/treedata';

function TreeRoot(props) {
  const [treeData, setTreeData] = useContext(TreeDataContext);
  const handleDrop = (newTreeData) => {
    setTreeData(newTreeData);
  };
  
  const handleEdit = (nodeId, nodeValue) => {
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
      return false;
    });
    setTreeData(newTree);
  }

  const handleCreate = (parent, fileList) => {
    let newNode = {};
    if(fileList === undefined){
      newNode = {
        "id": treeData.length + 1,
        "parent": parent.id,
        "droppable": true,
        "text": 'agenda',
        "data": {
          "fileSize": parent.data['fileSize']
        }
      }
      setTreeData(treeData => {return [...treeData, newNode]});
    }
    else{
      fileList.forEach(val => {
        const types = val.split('.');
        newNode = {
          "id": treeData.length + 1,
          "parent": parent.id,
          "droppable": false,
          "text": val,
          "data": {
            "fileType": types[types.length - 1].toUpperCase(),
            "fileSize": parent.data['fileSize']
          },
        }
        setTreeData(treeData => {return [...treeData, newNode]});
      });
    }
  }

  const handleIconType = (nodeId, nodeType) => {
    const newTree = treeData.map((node) => {
      if (node.id === nodeId) {
        return { ...node, data: {'fileType': node.data['fileType'], 'fileSize': nodeType} };
      } else {
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
                isFileDrop = {props.isFileDrop}
                isLock = {props.isLock}
                isMenuLock = {props.isMenuLock}
                node={node}
                depth={depth}
                isOpen={isOpen}
                onToggle={onToggle}
                handleEdit = {handleEdit}
                handleDelete = {handleDelete}
                handleCreate = {handleCreate}
                handleIconType = {handleIconType}
              />
            )}
            dragPreviewRender={(monitorProps) => (
              <CustomDragPreview monitorProps={monitorProps} />
            )}
            onDrop={(props.isLock)?null: handleDrop}
            droppable = {props.isLock?'false':'true'}
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
