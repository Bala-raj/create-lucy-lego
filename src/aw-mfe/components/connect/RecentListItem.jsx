import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, ListItemAvatar, ListItemText } from '@material-ui/core';
import { PlaylistAdd, CollectionsBookmark, Mail } from '@material-ui/icons';
import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';
import CONSTANTS from '../../constants';
import wrapStore from '../../store/wrapStore';
import useTranslationDefault from '../hooks/useTranslationDefault';


const EmptyObject = {};

function RecentElement({ itemId }) {
    if (itemId === CONSTANTS.MAIN_TAB_ID) {
        return <RecentMainTabItem />
    } else {
        return <RecentElementTodo itemId={itemId} />
    }
}

function RecentMainTabItem(){
    const { t } = useTranslationDefault();

    return (<div style={{ height: '42px', flexGrow:1, display:'flex', fontSize:'15px'}}>
        <ListItemAvatar>
          <Avatar>
          <CollectionsBookmark />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={t("todomicro.recentitem.maintabitem.name")} secondary={''} />
    </div>);
}

function RecentElementTodo({ itemId }) {
    const todo = useSelector((state) => state.todoApp.todos[itemId] || EmptyObject);
    const { title = 'no todo found', notes='no notes', deadline, notificationCount } = todo;
    return (<div style={{
        height: '42px',
        minWidth: 0,
        flexGrow:1,
        display:'flex',
        fontSize:'15px',
       }}>
        <ListItemAvatar>
          <Avatar>
             <PlaylistAdd />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
            style={{
                textOverflow: 'ellipsis',
                width: '80px',
                overflow: 'hidden',
            }}
            primary={title}
            secondary={''}
        />
        {
            (notificationCount > 0) && (
            <Badge color="secondary" badgeContent={notificationCount}>
              <MailIcon fontSize="small" />
            </Badge>
          )
        }
    </div>);
}

export default wrapStore(RecentElement);