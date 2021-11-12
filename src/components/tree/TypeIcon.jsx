import React from "react";
import FolderIcon from "@material-ui/icons/Folder";
import ImageIcon from "@material-ui/icons/Image";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import DescriptionIcon from "@material-ui/icons/Description";

export const TypeIcon = (props) => {
  if (props.droppable) {
    return <FolderIcon />;
  }

  switch (props.fileType) {
    case "image":
      return <ImageIcon />;
    case "csv":
      return <PictureAsPdfIcon />;
    case "text":
      return <DescriptionIcon />;
    default:
      return null;
  }
};
