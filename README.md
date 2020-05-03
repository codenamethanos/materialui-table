# Thanos Datatable
A library of React components for a light React Datatable using materialui.
Run the following command: `npm install thanos-datatable`

## Options
| Key                           | Value Type (Default)          | Description                   |
| ----------------------------- | ----------------------------- | ----------------------------- |
| title                         | String                        | 'My Table'                    |
| defaultPage                   | String                        | 'My Table'                    |
| defaultRowsPerPage            | String                        | 'My Table'                    |
| pageOptions                   | String                        | 'My Table'                    |
| stickyHeader                  | String                        | 'My Table'                    |
| stickyFooter                  | String                        | 'My Table'                    |
| stickyColumn                  | String                        | 'My Table'                    |
| showEmptyRows                 | String                        | 'My Table'                    |
| totalRow                      | String                        | 'My Table'                    |
| maxTableHeight                | String                        | 'My Table'                    |
| minCellWidth                  | String                        | 'My Table'                    |
| headerCellStyle               | String                        | 'My Table'                    |
| rowCellStyle                  | String                        | 'My Table'                    |
| footerCellStyle               | String                        | 'My Table'                    |

## Columns
| Key                           | Value Type (Default)          | Description                   |
| ----------------------------- | ----------------------------- | ----------------------------- |
| key                           | String                        | 'My Table'                    |
| title                         | String                        | 'My Table'                    |
| defaultSort                   | String                        | 'My Table'                    |
| totalRowCellName              | String                        | 'My Table'                    |
| minColWidth                   | String                        | 'My Table'                    |
| totalRow                      | String                        | 'My Table'                    |
| footerStylePriority           | String                        | 'My Table'                    |
| customElement                 | String                        | 'My Table'                    |
| customSort                    | String                        | 'My Table'                    |
| columnCellStyle               | String                        | 'My Table'                    |

## Example Code

```
import React from "react"; 
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'; 
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ThanosTable from "../lib";

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100%'
  }
}));

function App() {

  const classes = useStyles();
  function createData(name, calories, fat, carbs, protein, calories2, fat2, carbs2, protein2, calories3, fat3, carbs3, protein3) {
    return { name, calories, fat, carbs, protein, calories2, fat2, carbs2, protein2, calories3, fat3, carbs3, protein3 };
  }
  
  const rows = [ 
    createData('Cupcake', 305, 3.7, 67, 4.3, 305, 3.7, 67, 4.3, 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9, 452, 25.0, 51, 4.9, 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0, 262, 16.0, 24, 6.0, 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 356, 16.0, 49, 3.9, 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5, 408, 3.2, 87, 6.5, 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 237, 9.0, 37, 4.3, 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0, 375, 0.0, 94, 0.0, 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0, 518, 26.0, 65, 7.0, 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0, 392, 0.2, 98, 0.0, 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0, 318, 0, 81, 2.0, 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0, 360, 19.0, 9, 37.0, 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0, 437, 18.0, 63, 4.0, 437, 18.0, 63, 4.0),
  ];

  // SOME INFO
  // key is mandatory. Each key should be unique. 
  // It should match row keys for normal row values, and can be anything for custom values.
  // title is not mandatory. It is used to name column headers.So it is recommended. 
  // If there are multiple defaultSort, last one takes preference.
  // In customSort: Return numerical value if you want sorted numerically.
  // In customSort: Return string if you want sorted alphabetically.
  // totalRowCellName and totalRow cant be displayed together. If it happens, totalRowCellName takes preference.
  // totalRow of customElement is also computed by the same equation returned in customElement.
  // columnCellStyle can be made to have lower/higher priority than footerCellStyle using footerStylePriority. Default is higher. 
  // If actionElement exist, then the column is treated as an action. Also customElement and title wont work.
  // minColWidth has higher priority than minCellWidth

  // COLUMNS DEFAULT VALUES
  // key - Compulsary. No default value
  // title - No default value
  // totalRow - Default value is false
  // totalRowCellName - No default value
  // actionElement - No default value
  // customElement - No default value
  // columnCellStyle - - No default value
  // footerStylePriority - Default value is false
  // defaultSort - No default value
  // customSort - No default value

  const columns = [
    { key: 'action1', 
      title: 'Action 1',
      actionElement: function(row) {
        return({
          icon: <AddIcon />,
          toolTip: 'Add Item',
          disabled: false,
          color: 'primary',
          onClick: function(row, event) {
            alert("Added " + row.name);
          }
        });
      },
      columnCellStyle: function(row) {
        return { backgroundColor: '#03DAC5', color: '#000' };
      },
      footerStylePriority: true
    },
    { key: 'action2', 
      title: 'Action 2',
      actionElement: function(row) {
        return({
          icon: <RemoveIcon />,
          toolTip: 'Remove Item',
          disabled: false,
          color: 'secondary',
          onClick: function(row, event) {
            alert("Removed " + row.name);
          }
        });
      },
      columnCellStyle: function(row) {
        return { backgroundColor: '#03DAC5', color: '#000' };
      },
      footerStylePriority: true
    },
    { key: 'name', 
      title: 'Dessert (100g serving)', 
      totalRow: true,
      totalRowCellName: 'Total', 
      // minColWidth: 300,
      columnCellStyle: function(row) {
          return { backgroundColor: '#03DAC5', color: '#000' };
      },
      footerStylePriority: true
    }, 
    { key: 'calories', title: 'Calories', defaultSort: 'asc', totalRow: true },
    { key: 'fat', title: 'Fat', totalRow: true },
    { key: 'carbs', title: 'Carbs', totalRow: true },
    { key: 'protein', title: 'Protein', totalRow: true },
    { key: 'button',  
      title: 'Button',
      // minColWidth: 300,
      customElement: function(row) {
        return(
          <Button className={classes.root} variant="contained" size="small" fullWidth={true} >
            {row.name}
          </Button>
        );
      },
      columnCellStyle: function(row) { 
        return { backgroundColor: '#F6F6F6', color: '#000' };
      },
      footerStylePriority: true
    }, 
    { key: 'img', 
      title: 'Image',
      // minColWidth: 300,
      customElement: function(row) {
        return(
          <img alt='bannera' src={'https://allpiki.ru/wp-content/uploads/2020/01/1579269254_korzik_net_u-1-300x210.jpg'} style={{ width: 50, borderRadius: '10%' }} />
        );
      }
    }, 
    { key: 'weight', 
      title: 'Weight', 
      totalRow: true,
      customElement: function(row) { 
        return <div>{(row.fat + row.carbs + row.protein).toFixed(2)}</div>; 
      },
      customSort: function(row) { 
        return (row.fat + row.carbs + row.protein); 
      },
      columnCellStyle: function(row) {
        if(row.fat + row.carbs + row.protein > 50) 
          return { backgroundColor: '#006B1E', color: '#FFF' };
        else 
          return { backgroundColor: '#B00020', color: '#FFF' };;
      },
      footerStylePriority: false 
    },
    { key: 'calories2', title: 'Calories 2', totalRow: true },
    { key: 'fat2', title: 'Fat 2', totalRow: true },
    { key: 'carbs2', title: 'Carbs 2', totalRow: true },
    { key: 'protein2', title: 'Protein 2', totalRow: true },
    { key: 'calories3', title: 'Calories 3', totalRow: true },
    { key: 'fat3', title: 'Fat 3', totalRow: true },
    { key: 'carbs3', title: 'Carbs 3', totalRow: true },
    { key: 'protein3', title: 'Protein 3', totalRow: true },
  ];
  
  const options = {
    title: 'Thanos Table', // Default is ''
    defaultPage: 0, // Default is 0
    defaultRowsPerPage: 5, // Default is 5
    pageOptions: [5, 10, 25, 50], // Default is [5, 10, 25]
    stickyHeader: true, // Default is false
    stickyFooter: true, // Default is false
    stickyColumn: true, // Default is false. If true, leftmost column that is not an action will be stickied.
    showEmptyRows: false, // Default is false
    totalRow: true, // Default is true
    maxTableHeight: 640, // No default value
    // minCellWidth: 200, // No default value
    headerCellStyle: { fontWeight: '600', backgroundColor: '#FFF', color: '#000' }, // Default is { fontWeight: 'bold', backgroundColor: '#fff' }
    rowCellStyle: {  backgroundColor: '#F6F6F6' }, // Default is { backgroundColor: '#fff' }
    footerCellStyle: { backgroundColor: '#3F51B5', color: '#FFF' }, // Default is { backgroundColor: '#fff' }
    showColumns: [] // Default value is null or [] which means all columns are visible. 
                    // Usage example: ['action1', 'action2', 'name', 'calories', 'fat', 'carbs', 'protein', 'button', 'img',
                    // 'weight', 'calories2', 'fat2', 'carbs2', 'protein2', 'calories3', 'fat3', 'carbs3', 'protein3'] 
  };

  return( 
    <div>
      <ThanosTable rows={rows} columns={columns} options={options} />
    </div>
  );
}

export default App;
```