import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Modal from '@material-ui/core/Modal';
import Toolbar from '@material-ui/core/Toolbar'; 
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    title: {
      flex: '1 1 100%',
    },
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      overflow: 'scroll',
      maxHeight: '80%'
    };
}
  
function ThanosTableToolbar({ title, columns, visibleColumns, onColumnChange }) {
    const classes = useToolbarStyles();
    const [viewListOpen, setViewListOpen] = useState(false); 
    const [modalStyle] = useState(getModalStyle);
    const [checked, setChecked] = useState(visibleColumns);

    const handleViewList = () => {
        setViewListOpen(true);
    };

    const handleViewListClose = () => {
        setViewListOpen(false);
    };

    const handleToggle = value => () => {
        let allChecked = [...columns];
        let newChecked = [...checked];
        let currentIndex = checked.indexOf(value);
        let difference;
        let diffIndex;
        if (currentIndex === -1) {
            newChecked.push(value);
            difference = allChecked.filter(x => !newChecked.includes(x));
            for(let i=0; i<difference.length; i++) {
                diffIndex = allChecked.indexOf(difference[i]);
                allChecked.splice(diffIndex, 1);
            }   
            setChecked(allChecked);
        } else {
          newChecked.splice(currentIndex, 1);
          setChecked(newChecked);
        }
    };

    useEffect(() => { // Need to use useEffect as setState is async
        onColumnChange(checked);
    }, [checked]);

    return (
        <Toolbar
            className={clsx(classes.root)}
        > 
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                { title }
            </Typography>
            <Tooltip title="Add Or Remove Columns">
                <IconButton aria-label="add or remove columns" onClick={handleViewList}>
                    <ViewColumnIcon />
                </IconButton>
            </Tooltip>
            <Modal
                open={viewListOpen} 
                onClose={handleViewListClose} 
            >
                <div style={modalStyle} className={classes.modal}>
                    <Typography style={{fontWeight: 'bold'}} align="center">Add Or Remove Columns</Typography> 
                    <List className={classes.root}> 
                        {columns.map(column => {
                            const labelId = `checkbox-list-label-${column.key}`;
                            return (
                              <ListItem key={column.key} role={undefined} dense button onClick={handleToggle(column)}>
                                <ListItemIcon>
                                  <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(column) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                  />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={column.title} />
                              </ListItem>
                            );
                          })}     
                    </List> 
                </div>
            </Modal>
        </Toolbar>
    );
}

export default ThanosTableToolbar;