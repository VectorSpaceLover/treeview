import React from "react";
import FolderIcon from '@material-ui/icons/Folder';
import ImageIcon from "@material-ui/icons/Image";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import DescriptionIcon from "@material-ui/icons/Description";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { childMenu } from "../../constant";

export const TypeIcon = (props) => {
  let iconColor;
  if(props.currentId === 1){
    return <MeetingRoomIcon/>
  }
  childMenu.forEach(val => {
    if(val.name === props.colorType)
    {
      iconColor = val.color;
      return;
    }
  });

  if (props.droppable) {
    return <FolderIcon style={{ color: iconColor }}/>;
  }

  switch (props.fileType) {
    case 'MP3':
    case 'MP4':
    case 'AVI':
      return <PlayCircleFilledIcon style = {{color: iconColor}}/>
    case "HTML":
      return <ChromeReaderModeIcon style = {{color: iconColor}}/>;
    case "IMAGE":
      return <ImageIcon style = {{color: iconColor}}/>;
    case "PDF":
      return <PictureAsPdfIcon style = {{color: iconColor}}/>;
    case "TEXT":
      return <DescriptionIcon style = {{color: iconColor}}/>;
    default:
      return null;
  }
};
