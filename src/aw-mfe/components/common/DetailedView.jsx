import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import { useDispatch, useSelector } from 'react-redux';
import { AddBox, IndeterminateCheckBox, PlaylistAdd } from '@material-ui/icons';
import { Avatar, ButtonGroup, InputLabel, ListItemAvatar, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import BaseApisWrap from '../../BaseApisWrap';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const EmptyObject = {};

const useStylesTVT = makeStyles((theme) => ({
  container: {
    marginTop: '2px',
    paddingTop: '4px',
  },
  title: {
    fontWeight: "bold",
    border: "1px solid",
    textAlign: "center",
    padding: "20px",
    height: "60px",
    width: "940px"
  },
  toolbar: {
    border: "1px solid",
    padding: "10px",
    height: "60px",
    width: "940px",
    marginTop: '5px',
  },
  notes: {
    marginTop: "5px",
    border: "1px solid",
    height: "99%",
    textAlign: "justify",
    padding: "15px",
    overflowWrap: "break-word",
    width: '940px'
  }
}));

export default function DetailedView(props) {
  const {itemId} = props;
  const classes = useStylesTVT();
  const todo = useSelector((state) => state.todoApp.todos[itemId] || EmptyObject);
  const dispatch = useDispatch();
  const { title = 'no todo found', notes='no notes', notificationCount } = todo;
  return (
    <React.Fragment>
      <Container className={classes.container}>
        <div className={classes.title}>{title}</div>
        <div className={classes.toolbar}>
          <ButtonGroup>
            <div style={{
              margin: '5px',
              padding: '3px',
              }}
            >
            Notification count</div>
            <Button
              aria-label="increase"
              onClick={() => {
                dispatch({ type: 'INCREAMENT_NOTIFICATION_COUNT', payload: { id: todo.id } });
                BaseApisWrap.updateItemInConnect(todo.id);
              }}
            >
              <AddBox/>
            </Button>
            <Button
              aria-label="decrease"
              onClick={() => {
                dispatch({ type: 'DECREAMENT_NOTIFICATION_COUNT', payload: { id: todo.id } });
                BaseApisWrap.updateItemInConnect(todo.id);
              }}
            >
              <IndeterminateCheckBox/>
            </Button>
          </ButtonGroup>
          
        </div>
        <div my={2} className={classes.notes}>
          {notes}
        </div>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
