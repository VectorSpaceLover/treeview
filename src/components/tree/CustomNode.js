import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useDragOver } from "@minoru/react-dnd-treeview";
import { TypeIcon } from "./TypeIcon";
import styles from "./CustomNode.module.css";
import Input from '@material-ui/core/Input';
import useDoubleClick from '../../hooks/useDoubleClick';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import { StyledMenu, StyledMenuItem } from "../StyledMenu";

import { menu } from '../../constant'

const inputState = [
  'none',
  'doubleclick',
  'rename',
]

export const CustomNode = ({ droppable, node, isOpen, onToggle, depth, handleEdit, handleDelete }) => {
  const { id, data } = node;
  const [editable, setEditable] = React.useState(inputState[0]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(node.text);

  const dragOverProps = useDragOver(id, isOpen, onToggle);

  const indent = depth * 24;

  const handleClick = (e) => {
    e.preventDefault();
    if(editable === inputState[0])
      setAnchorEl(e.target);
  }

  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle(id);
  };
  // Get double click event in input tag
  const changebackgroundColor = () => {
    // elem.style.backgroundColor = 'red';
    setEditable(inputState[1]);
  }
  const [refCallback] = useDoubleClick(changebackgroundColor);

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      setEditable(inputState[0]);
    }
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // End
  const handleMenuClick = (name) => {
    switch (name)
    {
      case menu[0]['name']:
        console.log(name);
        break;
      case menu[1]['name']:
        setEditable(inputState[2]);
        break;
      case menu[2]['name']:
        console.log(name);
        break;
      
      case menu[3]['name']:
        handleDelete(id);
        break; 
      
      default:
        break;
    }
    setAnchorEl(null);
  }
  
  const menuList = (
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
      {menu.map((val, index) => {
        return (
          <StyledMenuItem key = {index}>
            <ListItemIcon>
              {val.icon}
            </ListItemIcon>
            <ListItemText primary={val.name} onClick = {() => handleMenuClick(val.name)}/>
          </StyledMenuItem>
        ) 
      })}
      </StyledMenu>
    );
    
  useEffect(() => {
    if (editable !== inputState[0]) {
      if (node.text !== value) {
        handleEdit(id, value);
      }
    }
  }, [editable, handleEdit, node, value, id])

  const open = Boolean(anchorEl);

  return (
    <div
      className={`tree-node ${styles.root}`}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
      aria-controls="customized-menu"
      aria-haspopup="true"
    >
      <div
        className={`${styles.expandIconWrapper} ${
          isOpen ? styles.isOpen : ""
        }`}

      >
        {node.droppable && (
          <div onClick={handleToggle}>
            <ArrowRightIcon />
          </div>
        )}
      </div>
      <div>
        <TypeIcon droppable={droppable} fileType={data?.fileType} />
      </div>
      <div className={styles.labelGridItem} ref = {refCallback} onContextMenu={handleClick}>
        {(editable === inputState[0]) ? (
          <Typography
        aria-haspopup="true" variant="body2" aria-owns={open ? 'mouse-over-popover' : undefined}>{node.text}</Typography>
        ): (
          <Input
            type="text" autoFocus
            onBlur= {() => {
              setEditable(inputState[0]);
            }}
            value = {value}
            onChange = {(e) => setValue(e.target.value)}
            onKeyPress = {handleKeyPress}
          />
        )}
      </div>
      {(editable === inputState[0])?menuList:(<></>)}
    </div>
  );
};
