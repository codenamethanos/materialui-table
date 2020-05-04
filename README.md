# Thanos Datatable
A library of React components for a light React Datatable using materialui.
Run the following command: `npm install thanos-datatable`

## Options
| Key                           | Value Type (Default)          | Description                                                     |
| ----------------------------- | ----------------------------- | --------------------------------------------------------------- |
| title                         | String ( '' )                 | Title of table                                                  |
| defaultPage                   | Integer ( 0 )                 | Default page to load during initial render                      |
| defaultRowsPerPage            | Integer ( 5 )                 | Default number of rows per page                                 |
| pageOptions                   | Array ( [5, 10, 25] )         | Page options dropdown                                           |
| stickyHeader                  | Boolean ( false )             | Make header sticky                                              |
| stickyFooter                  | Boolean ( false )             | Make footer sticky                                              |
| stickyColumn                  | Boolean ( false )             | If true, leftmost column that is not an action will be stickied |
| showEmptyRows                 | Boolean ( false )             | Show or hide empty rows on last page                            |
| totalRow                      | Boolean ( true )              | Show or hide total row at the footer                            |
| maxTableHeight                | Integer ( No default value )  | Max height of the table                                         |
| actionCellWidth               | Integer ( 50 )                | Width of action column. This looks better when thin like 50     |
| headerCellStyle               | Style Object                  | Style header cells to your wish. Default style given below      |
| rowCellStyle                  | Style Object                  | Style row cells to your wish. Default style given below         |
| footerCellStyle               | Style Object                  | Style footer cells to your wish. Default style given below      |
| tableStyle                    | Style Object                  | Apply CSS to main table element. Default CSS given below        |
| showColumns                   | Array ( [] )                  | Check below for example                                         |


### headerCellStyle Default Value
```
{ fontWeight: 'bold', backgroundColor: '#fff' }
```
### rowCellStyle Default Value
```
{ backgroundColor: '#fff' }
```
### footerCellStyle Default Value
```
{ backgroundColor: '#fff' }
```
### tableStyle Default Value
```
{ minWidth: 750, borderCollapse: 'collapse', whiteSpace: 'nowrap', tableLayout: 'auto' }
```
### showColumns Example
Default value is null or [] which means all columns are visible. Usage Example: 
```
['action1', 'action2', 'name', 'calories', 'fat', 'carbs', 'protein', 'button', 'img', 'weight', 'carbs3', 'protein3']
```


## Columns
| Key                           | Value Type (Default)          | Description                                            |
| ----------------------------- | ----------------------------- | ------------------------------------------------------ |
| key                           | String ( No default value )   | Mandatory. Should be unique.                           |
| title                         | String ( No default value )   | Title of column.                                       |
| defaultSort                   | 'asc' or 'desc' (No default..)| Default column to sort.                                |
| minColWidth                   | Integer ( No default value )  | Minimum width of column                                |
| totalRow                      | Boolean ( false )             | Make total row visible at the footer.                  |
| totalRowCellName              | String  ( No default value )  | Name total row cell with a string instead of summation.|
| customElement                 | Any React Element ( No defa..)| 'row' is available as parameter. See example below.    |
| customSort                    | String / Number ( No defaul..)| 'row' is available as parameter. See example below.    |
| columnCellStyle               | Style Object ( No default..)  | 'row' is available as parameter. See example below.    |
| actionElement                 | Style Object ( No default..)  | 'row' is available as parameter. See example below.    |
| footerStylePriority           | Object ( No default value )   | 'row' is available as parameter. See example below.    |


### customElement Example 1
```
customElement: function(row) { 
  return <div>{(row.fat + row.carbs + row.protein).toFixed(2)}</div>; 
},
```
### customElement Example 2
```
customElement: function(row) {
  return(
    <Button variant="contained" size="small" fullWidth={true} >
      {row.name}
    </Button>
  );
}
```
### customSort Example
```
customSort: function(row) { 
  return (row.fat + row.carbs + row.protein); 
}
```
### columnCellStyle Example
```
columnCellStyle: function(row) {
  if(row.fat + row.carbs + row.protein > 50) 
    return { backgroundColor: '#006B1E', color: '#FFF' };
  else 
    return { backgroundColor: '#B00020', color: '#FFF' };;
}
```
### actionElement Example
actionElement has row as parameter. Also, it accepts an object with icon, toolTip, disabled, color and onClick values.
onClick has row and event parameter available for you.
```
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
}
```

## Some Info about columns ...
- key is mandatory. Each key should be unique. 
- key should match row keys for normal row values, and can be anything unique for custom values.
- title is not mandatory. It is used to name column headers, so it is recommended. 
- If there are multiple defaultSort, last one takes preference.
- In customSort: Return numerical value if you want column sorted numerically.
- In customSort: Return string if you want column sorted alphabetically.
- totalRowCellName and totalRow cant be displayed together. If both values are given totalRowCellName takes preference.
- totalRow of customElement is also computed by the same equation returned in customElement.
- columnCellStyle can be made to have lower/higher priority than footerCellStyle using footerStylePriority. Default is higher. 
- If actionElement exist, then the column is treated as an action. Also customElement and title wont work.

## Example Code
```
import React from "react"; 
import Button from '@material-ui/core/Button'; 
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ThanosTable from "thanos-datatable";

function App() {

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
      minColWidth: 300,
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
      customElement: function(row) {
        return(
          <Button variant="contained" size="small" fullWidth={true} >
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
    title: 'Thanos Table', 
    defaultPage: 0, 
    defaultRowsPerPage: 5, 
    pageOptions: [5, 10, 25, 50], 
    stickyHeader: true, 
    stickyFooter: true, 
    stickyColumn: true, 
    showEmptyRows: false, 
    totalRow: true, 
    maxTableHeight: 640, 
    actionCellWidth: 60, 
    headerCellStyle: { fontWeight: '600', backgroundColor: '#FFF', color: '#000', textAlign: 'center' },  
    rowCellStyle: {  backgroundColor: '#F6F6F6' },
    footerCellStyle: { backgroundColor: '#3F51B5', color: '#FFF' }, 
    tableStyle: { minWidth: 760 }, 
    showColumns: []   
    // showColumns full list: ['action1', 'action2', 'name', 'calories', 'fat', 'carbs', 'protein', 'button', 'img',
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