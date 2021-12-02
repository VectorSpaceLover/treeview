import {useEffect} from 'react';
import NavBar from '../components/layout/navbar';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from '@material-ui/core/styles';
import TreeRoot from '../components/tree/TreeRoot';
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '50px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  treeContainer:{
    marginTop: '30px',
  },
  tree:{
    padding: '30px',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function FileManagement() {
  const classes = useStyles();
  
  useEffect(() => {
    // Update the document title using the browser API
  });
    return (
      <>
        <NavBar/>
        <Grid container className = {classes.container}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<PublishIcon />}
          >
            Publish
          </Button>
          <Grid container className = {classes.treeContainer}>
            <b>Please add files by dragging them into folders.</b>
          <Grid container className = {classes.tree}>
              <TreeRoot isMenuLock = {true} isLock = {true} isFileDrop = {true}/>
            </Grid>
          </Grid>
        </Grid>
        
      </>
    );
  }
  
  export default FileManagement;
  