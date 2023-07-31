import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Link, Redirect, Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import CONSTANTS from '../../constants';
import wrapStore from '../../store/wrapStore';
import CreateAndListView from '../common/CreateAndListView';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    transform: 'scale(1)',
    width: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    height: '100vh',
  },
}));

function TabView() {
  const classes = useStyles();
  const todolist = useSelector((state) => state.todoApp.todos || []);
  const { path, url } = useRouteMatch();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Todos Mifro Frontend app
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
          <List>
          <Link
             to={`/${CONSTANTS.MODULE_NAME}/${CONSTANTS.MAIN_TAB_ID}`}
            >
              <ListItem 
                button
                key={'Create todo'}
                selected={window.location.pathname.includes(CONSTANTS.MAIN_TAB_ID)}
              >
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary={'Create Todo'} />
              </ListItem>
          </Link>

          </List>

        <Divider />
        <List>
          {Object.values(todolist).filter(item => item.inRecentList).map((item) => (
            <Link to={`/${CONSTANTS.MODULE_NAME}/todos/${item.id}`} >
              <ListItem
                 button
                 key={item.id}
                 selected={window.location.pathname.includes(item.id)}
              >
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            </Link>
            ))
          }
        </List>
      </Drawer>
      <main className={classes.content}>
            <div style={{ height: '100%', width: '100%' , position: 'relative' }}>
              <div style={{ display: 'flex', flexGrow: 1, height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                <Switch>
                    <Route path={`${path}/todos/:id`}>
                      <DetailedView/>
                    </Route>
                    <Route path={`${path}/${CONSTANTS.MAIN_TAB_ID}`}>
                      <CreateAndListView/> :
                    </Route>
                    <Route exact path={path}>
                      <Redirect to={`${path}/${CONSTANTS.MAIN_TAB_ID}`} />
                    </Route>
                  </Switch>
                </div>
              </div>
            </div>
      </main>
    </div>
  );
}

function DetailedView() {
  const { id } = useParams();
  const todo = useSelector((state) => state.todoApp.todos[id] || {});
  return (<div>
    <h1>{todo.title}</h1>
    <Divider/>
    <p>{todo.notes}</p>
  </div>)
}


/**
// for testing routes
function AllComponent(props) {
  return (
    <>
        <h1>
          AllComponent 
        </h1>
    </>
  );
}

function CampaignLayout(props){
  return (
    <>
        <h1>
          CampaignLayout : campaign: 
        </h1>
        <Redirect to={`${path}/all`} />
       <Route path= {`${path}/:type`} component={CampaignDashboard} />
        <Route path={`${path}/all`} component={AllComponent} />
    </>
  );
}

function CampaignDashboard(props){
  const { type } = useParams();
  return (
    <>
        <h1>
        ":type": CampaignDashboard {type}
        </h1>
    </>
  );
}


function NewCampaignLayout(props) {
  return (
    <>
        <h1>
          NewCampaignLayout
        </h1>
        {props.children}

    </>
  );
}

function CampaignDesign(props) {
  const { campaignId } = useParams();
  return (
    <>
        <h1>
        design/:campaignId : CampaignDesign : {campaignId}
        </h1>
    </>
  );
}
function CampaignPreview() {
  const { campaignId } = useParams();
  return (
    <>
        <h1>
        preview/:campaignId : CampaignPreview : { campaignId }
        </h1>
    </>
  );
}

       <Route path="campaign" component={CampaignLayout}>
                <IndexRedirect to="all" />
                <Route path=":type" component={CampaignDashboard} />
       </Route>
        <Route path="campaign" component={NewCampaignLayout}>
          <Route path="design/:campaignId" component={CampaignDesign} />
          <Route path="preview/:campaignId" component={CampaignPreview} />
          <Route path="publish/:campaignId" component={PublishCampaign} />
          <Route path=":campaignId/:stats/:type" component={DetailedCampaignStats}/>
        </Route>

        /campaing/:type/
        /campaign/design/:campaignId
*/



export default wrapStore(TabView);