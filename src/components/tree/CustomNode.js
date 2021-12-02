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
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { childMenu, menu } from '../../constant'

const inputState = [
  'none',
  'doubleclick',
  'rename',
]

export const CustomNode = ({ isMenuLock, isLock, isFileDrop, node, isOpen, onToggle, depth, handleEdit, handleDelete, handleCreate, handleIconType }) => {
  const { id, data, droppable} = node;
  const [editable, setEditable] = React.useState(inputState[0]);
  const [anchorElParent, setAnchorElParent] = React.useState(null);
  const [anchorElChild, setAnchorElChild] = React.useState(null);
  const [value, setValue] = React.useState(node.text);
  const dragOverProps = useDragOver(id, isOpen, onToggle);

  const indent = depth * 24;

  const ShowParentMenu = (e) => {
    e.preventDefault();
    if(editable === inputState[0])
      setAnchorElParent(e.target);
  }

  const ShowChildMenu = (e) => {
    e.preventDefault();
    if(editable === inputState[0])
      setAnchorElChild(e.target);
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
    setAnchorElParent(null);
    setAnchorElChild(null);
  };

  const handleDrop = (e) => {
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      e.preventDefault()
      e.stopPropagation()
      let fileList = [];
      for (var i = 0; i < e.dataTransfer.files.length; i++) {
        if (!e.dataTransfer.files[i].name) return
        fileList.push(e.dataTransfer.files[i].name)
      }
      handleCreate(node, fileList);
      e.dataTransfer.clearData()
    }
  }

  const handleMenuClick = (name, bFlag) => {
    if(bFlag)
      return;

    switch (name)
    {
      case menu[0]['name']:
        handleCreate(node, undefined);
        break;
      case menu[1]['name']:
        setEditable(inputState[2]);
        break;
      case menu[2]['name']:
        break;
      
      case menu[3]['name']:
        handleDelete(id);
        break;

      case childMenu[0]['name']:
      case childMenu[1]['name']:
      case childMenu[2]['name']:
      case childMenu[3]['name']:
      case childMenu[4]['name']:
      case childMenu[5]['name']:
      case childMenu[6]['name']:
      case childMenu[7]['name']:
      case childMenu[8]['name']:
        handleIconType(id, name);
        break;

      default:
        break;
    }
    if(name !== menu[2]['name'])
      setAnchorElParent(null);

    childMenu.forEach(val => {
      if(name === val.name)
      {
        setAnchorElParent(null);
        setAnchorElChild(null);
      }
    });
  }

  const childMenuList = (
    <StyledMenu
        id="child-menu"
        anchorEl={anchorElChild}
        keepMounted
        open={Boolean(anchorElChild)}
        onClose={handleMenuClose}
      >
      {childMenu.map((val, index) => {
        return (
          <div  key = {index} onClick = {() => {handleMenuClick(val.name)}}>
            <StyledMenuItem>
              <ListItemIcon >
                <FiberManualRecordIcon style={{ color: val.color }}/>
              </ListItemIcon>
              <ListItemText primary={val.name}/>
            </StyledMenuItem>
          </div>
        ) 
      })}
    </StyledMenu>
  )

  const menuList = (
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorElParent}
        keepMounted
        open={Boolean(anchorElParent)}
        onClose={handleMenuClose}
      >
      {menu.map((val, index) => {
        return (
          <div  key = {index} onClick = {() => handleMenuClick(val.name, (node.id === 1)?((val.name !== menu[0]['name'])):false)}>
            <StyledMenuItem style={{width: '100%'}} disabled = {(node.id === 1)?((val.name !== menu[0]['name'])):false}>
              {(val.name === menu[2]['name'])?(
                  <>
                    <ListItemIcon>
                      {val.icon}
                    </ListItemIcon>
                    <ListItemText primary={val.name} onClick={ShowChildMenu}/>
                  </>):(
                    <>
                      <ListItemIcon>
                        {val.icon}
                      </ListItemIcon>
                      <ListItemText primary={val.name}/>
                    </>
              )}
              
            </StyledMenuItem>
          </div>
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
    
  }, [editable, handleEdit, node, value, droppable, id])

  return (
    <div
      className={`tree-node ${styles.root}`}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
      aria-controls="customized-menu"
      aria-haspopup="true"
      droppable = {isFileDrop?'false':'true'}
      onDrop = {(isFileDrop)?handleDrop:null}
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
        <TypeIcon currentId = {id} colorType = {node.data['fileSize']} droppable={droppable} fileType={data?.fileType} />
      </div>
      <div 
        className={styles.labelGridItem} 
        ref = {refCallback} 
        onContextMenu={(isLock)?null:ShowParentMenu} 
      >
        {(editable === inputState[0]) ? (
          <Typography aria-haspopup="true" variant="body2">{node.text}</Typography>
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
      {(editable === inputState[0] && !isLock && !isMenuLock)?menuList:(<></>)}
      {((isMenuLock || isLock) && (id !== 1))?<></>:childMenuList}
    </div>
  );
};
