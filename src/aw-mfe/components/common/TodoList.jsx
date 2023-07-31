
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { AccessAlarm, AddCircleOutlined, Delete, NextWeekRounded, PlaylistAdd } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import BaseApisWrap from '../../BaseApisWrap';
import { getNotificationEventFromServer } from '../../store/fakeserver';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid',
    width: '100%',
    marginTop: '20px',
    backgroundColor: theme.palette.background.paper,
    overflow: 'scroll',
    height: 'calc(100vh - 312px)',
  },
}));

export default function TodoList() {
  const classes = useStyles();
  const todolist = useSelector((state) => state.todoApp.todos || []);

  return (
    <List className={classes.root}>
      {Object.keys(todolist).map((id) => (<TodoListItem
        key={id}
        item={todolist[id]}
      />))}
    </List>
  );
}


function TodoListItem({
  item
}) {
    const dispatch = useDispatch();
    const { id, inRecentList, title, deadline, notificationCount }  = item;
    const value = `main_ul_li_${id}`;

    const onClickAddToRecent = () => {
      if (inRecentList) return;
      dispatch({ type: 'UPDATE_TODO', payload: { id, changes: { inRecentList: true } }});
      BaseApisWrap.addItemToConnectRecent(id);
    }

    const onClickDelete = () => {
      dispatch({ type: 'DELETE_TODO', payload: { id }});
      BaseApisWrap.removeItemInConnectRecent(id);
    }

    const onClickNotifyDeadLine = () => {
      getNotificationEventFromServer(id, 6000);
    }

    return (
      <ListItem key={value} role={undefined} dense button divider >
        <ListItemIcon>
           <PlaylistAdd />
        </ListItemIcon>
        <ListItemText primary={`${title}`} />
        <ListItemText  primary={`${new Date(deadline).toLocaleString()}`} />
        <ListItemIcon>
            <Tooltip title="Add To Recent" aria-label="add">
                <IconButton edge="end" aria-label="comments">
                    <AddCircleOutlined 
                      color={inRecentList ? 'primary' : ''}
                      onClick={onClickAddToRecent}
                    />
                </IconButton>
            </Tooltip>
        </ListItemIcon>
        <ListItemIcon>
            <Tooltip title="notify in a minute" aria-label="add">
                <IconButton edge="end" aria-label="comments">
                    <AccessAlarm
                       color={ notificationCount ? 'primary' : ''}
                       onClick={onClickNotifyDeadLine}
                    />
                </IconButton>
            </Tooltip>
        </ListItemIcon>
        <ListItemIcon>
            <Tooltip title="Delete" aria-label="add">
                <IconButton edge="end" aria-label="comments">
                    <Delete  onClick={onClickDelete} />
                </IconButton>
            </Tooltip>
        </ListItemIcon>
      </ListItem>
    );
}