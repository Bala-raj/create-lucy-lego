import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import BaseApisWrap from '../../BaseApisWrap';
import useTranslationDefault from '../hooks/useTranslationDefault';


const INITIAL_NULL = {};

/**
 * stores value (prop or state) in useRef to avoid stale values binding in callbacks
 * @param {*} value : simply an value or function that returns a value
 * @param {*} isProp : whether the value is a prop or a general value that doesnt require render
 * @returns [ ref: reference to the value passed (.current), setValue: method to set the value]
 */
function useAsyncReference(value, isProp = false) {
  const ref = useRef(INITIAL_NULL);
  if (ref.current === INITIAL_NULL) {
    // https://github.com/facebook/react/issues/14490
    ref.current = (typeof value === 'function') ? value() : value;
  }
  const [, forceRender] = useState(false);

  function updateState(newState) {
    ref.current = newState;
    forceRender((s) => !s);
  }

  if (isProp) {
    ref.current = value;
    return ref;
  }
  return [ref, updateState];
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    border: '1px solid',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  column66: {
    flexBasis: '66.66%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    }
  },
}));

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


export default function CreateTodo() {
  const classes = useStyles();
  const titleInput = useRef(null);
  const notesInput = useRef(null);
  const { t } = useTranslationDefault();
  // const dateTimeInput = useRef(null);
  const [dateTimeValue, setDateTimeValue] = useAsyncReference(new Date());
  const dispatch = useDispatch();

  const clearTextFields = () => {
    titleInput.current.value = '';
    notesInput.current.value = '';
    setDateTimeValue(new Date());
  }

  const getValues = () => {
    return {
      title: titleInput.current.value,
      notes: notesInput.current.value,
      deadline: dateTimeValue.current?.getTime(),
    }
  }

  const onClickAdd = () => {
    const { title, notes, deadline } = getValues();
    if (!title) return;
    const currentTime = Date.now()
    const todo = {
      id: uuidv4(),
      title,
      notes,
      createdAt: currentTime,
      modifiedAt: currentTime,
      deadline,
      notify: false,
      notificationCount: 0,
      inRecentList: false,
    }
    clearTextFields();
    dispatch({ type: 'ADD_TODO', payload: { todo } });
  }

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{t("todomicro.maintab.createtodo.addtodo")}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}></Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} >
            <TextField
              id="add-todo-title-textfield"
              label="title"
              variant="outlined"
              inputRef={titleInput}
              />
          </div>
          
          <div className={classes.column}>
            <TextField
                id="add-todo-notes-textfield"
                label="notes"
                multiline
                variant="outlined"
                inputRef={notesInput}
            />
          </div>
          <div className={classes.column}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                label="completion time"
                inputVariant="outlined"
                value={dateTimeValue.current}
                onChange={setDateTimeValue}
                minDate={new Date()}
                format="yyyy/MM/dd hh:mm a"
              />
            </MuiPickersUtilsProvider>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button onClick={clearTextFields} size="small">
          {t("todomicro.maintab.createtodo.cancel")}
          </Button>
          <Button onClick={onClickAdd} size="small" color="primary">
          {t("todomicro.maintab.createtodo.add")}
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
