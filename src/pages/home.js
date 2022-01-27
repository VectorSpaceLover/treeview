import React, { useEffect, useState, useContext } from 'react';
import TreeRoot from "../components/tree/TreeRoot";
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SettingsIcon from '@material-ui/icons/Settings';
// import MultiSelect from '../components/mutiselect/MultiSelect';
import NavBar from '../components/layout/navbar'
import { ParticipantContext } from '../contexts/participant';
import { AuditorsContext } from '../contexts/auditors';
import Select from 'react-dropdown-select';
import { doPost, createIssueFix, checkIssueFix, checkPost, createPost } from '../actions';
import { Loading } from '../components/Spinner'
import { TreeDataContext } from '../contexts/treedata';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '50px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
  treeContainer:{
    marginTop: '30px',
  },
  tree:{
    padding: '30px',
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  line: {
    padding: '10px',
  },
  bold: {
    fontWeight: 'bold',
  }
}));

function Home() {
  const classes = useStyles();
  const [participant, setParticipant] = useContext(ParticipantContext);
  const [auditors, setAuditors] = useContext(AuditorsContext);
  const [treeData, setTreeData] = useContext(TreeDataContext);
  const [isLock, setLock] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const getCurrentTime = () => {
    let currentTime = new Date().toLocaleTimeString('en-italy', { hour12: false, 
      hour: "numeric", 
      minute: "numeric"});
    let tm = currentTime.split(":");
    currentTime = tm[0] + ':' + tm[1];
    return currentTime;
  }

  const getCurrentDate = () => {
    let today = new Date().toISOString().slice(0, 10)
    return today;
  }

  const [meetingDate, setMeetingDate] = useState(getCurrentDate());
  const [meetingTime, setMeetingTime] = useState(getCurrentTime());
  const [invitationDate, setInvitationDate] = useState(getCurrentDate());
  const [presidentName, setPresident] = useState('');

  useEffect(() => {
    setLoading(true);
    // async function checkData(){
    //   let operationParams = checkIssueFix(meetingDate);
    //   console.log(operationParams);
    //   let response = await checkPost(operationParams);
    //   return response.result;
    // }
    // let isExits = checkData();
    // if(isExits){

    // }
    // else{

    // }

    async function createIssue() {
      let operationParams = createIssueFix(meetingDate, invitationDate, meetingTime,
        presidentName, participant, auditors, {
          "id": 1,
          "parent": 0,
          "droppable": true,
          "text": "Seduta del " + meetingDate,
          "data": {
            "fileSize": "Standard"
          }
        });
      console.log(operationParams);
      let response = await createPost(operationParams);
      let result = response['result'];
      if((result['dirTree']).length === 0){
        setTreeData([
          {
            "id": 1,
            "parent": 0,
            "droppable": true,
            "text": response['result']['issueName'],
            "data": {
              "fileSize": "Standard"
            }
          }
        ]);
      }
      else{
        setTreeData(response['result']['dirTree']);
      }
    }
    createIssue();
    setLoading(false);
  }, [meetingDate])

  return (
    <>
    {!isLoading?(
      <>
        <NavBar />
        <Grid container className = {classes.container}>
          <Grid container
            className = {classes.line}
            alignItems = 'center'
          >
            <Grid item lg={3} md={6} sm={6} xs={12}>
                <p className = {classes.bold}>Metting date</p> 
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12} className = {classes.right}>
                <TextField
                  id="date"
                  label="Metting date"
                  type="date"
                  defaultValue={getCurrentDate()}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange = {(e) => {setMeetingDate(e.target.value)}}
                />
            </Grid>
          </Grid>
          <Grid container
            className = {classes.line}
            alignItems = 'center'
          >
            <Grid item lg={3} md={6} sm={6} xs={12}>
                <p className = {classes.bold}>Metting time</p> 
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12} className = {classes.right}>
              <TextField
                id="time"
                label="Metting time"
                type="time"
                defaultValue={getCurrentTime()}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }} 
                onChange = {(e) => {setMeetingTime(e.target.value)}}
              />
            </Grid>
          </Grid>
          <Grid container
            className = {classes.line}
            alignItems = 'center'
          >
            <Grid item lg={3} md={6} sm={6} xs={12}>
                <p className = {classes.bold}>Invitation date</p> 
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12} className = {classes.right}>
                <TextField
                  id="date"
                  label="Invitation date"
                  type="date"
                  defaultValue={getCurrentDate()}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange = {(e) => {setInvitationDate(e.target.value)}}
                />
            </Grid>
          </Grid>
          <Grid container
            className = {classes.line}
            alignItems = 'center'
          >
            <Grid item lg={3} md={6} sm={6} xs={12}>
                <p className = {classes.bold}>President name</p> 
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <TextField style = {{padding: '10px'}} id="standard-basic" label="President name" />
            </Grid>
          </Grid>

          <Grid
            container
            className = {classes.line}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item lg = {3} md = {6} sm = {12} xs = {12}><p className = {classes.bold}>Edit the list of meeting participant</p></Grid>
            <Grid item lg = {3} md = {6} sm = {12} xs = {12}>
              <Select
                multi
                create = {false}
                options={participant}
                // onChange={(val) => setParticipant([...participant, {value: participant.length, label: val[val.length - 1]['value']}])}
                onChange={(val) => console.log(val)}
              />
            </Grid>
          </Grid>
          
          <Grid
            container
            className = {classes.line}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item lg = {3} md = {6} sm = {12} xs = {12}><p className = {classes.bold}>Edit the list of meeting auditors</p></Grid>
            <Grid item lg = {3} md = {6} sm = {12} xs = {12}>
              <Select
                multi
                create = {true}
                options={auditors}
                onChange={(val) => setAuditors([...auditors, {value: auditors.length, label: val[val.length - 1]['value']}])}
              />
            </Grid>
          </Grid>

          <Grid 
            container
            className = {classes.line}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={isLock?<LockIcon />:<LockOpenIcon/>}
              onClick = {isLock? () => setLock(false): () => setLock(true)}
            >
              Lock Structure
            </Button>
            {/* <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<PublishIcon />}
            >
              Publish
            </Button> */}
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<SettingsIcon />}
              href="/filemanage"
            >
              File Management
            </Button>
          </Grid>
          
          <Grid container className = {classes.treeContainer}>
            <b className = {classes.bold}>Edit the structure of the document moving and creating folders</b>
            <Grid container className = {classes.tree}>
                <TreeRoot isMenuLock = {false} isLock = {isLock} isFileDrop = {false}/>
            </Grid>
          </Grid>
        </Grid>
      </>
    ):(
      <Loading />
    )
    }
    </>
  );
}

export default Home;
