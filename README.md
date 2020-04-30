# Thanos Datatable
A library of React components for a light React Datatable using materialui
Run the following command:
`npm install thanos-datatable`

## Example Code

```
import React from "react"; 
import ThanosTable from "../lib";

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

  // key is mandatory. It should match row keys for normal row values, and can be anything for custom values.
  // If there are multiple defaultSort, last one takes preference.
  // In customSort: Return numerical value if you want sorted numerically.
  // In customSort: Return string if you want sorted alphabetically.
  // totalRowCellName and totalRow cannot be together. If it happens, totalRowCellName takes preference.
  // totalRow of customValue is also computed by the same equation returned in customValue.
  // columnCellStyle can be made to have lower/higher priority than footerCellStyle. Default is higher. 
  // minColWidth has higher priority than minCellWidth
  const columns = [
    { key: 'name', title: 'Dessert (100g serving)', totalRowCellName: 'Total', minColWidth: 300,
      columnCellStyle: function(row) {
          return { backgroundColor: '#dedede' };
      },
      footerStylePriority: true
    },
    { key: 'calories', title: 'Calories', defaultSort: 'asc', totalRow: true },
    { key: 'fat', title: 'Fat', totalRow: true },
    { key: 'carbs', title: 'Carbs', totalRow: true },
    { key: 'protein', title: 'Protein', totalRow: true },
    { key: 'weight', 
      title: 'Weight', 
      totalRow: true,
      minColWidth: 300,
      customValue: function(row) { 
        return <div>{(row.fat + row.carbs + row.protein).toFixed(2)}</div>; // WOAH THINK ITS POSSIBLE TO RENDER ANYTHING LIKE COMPONENT AND LINKS HERE
      },
      customSort: function(row) { 
        return (row.fat + row.carbs + row.protein); 
      },
      columnCellStyle: function(row) {
        if(row.fat + row.carbs + row.protein > 50) 
          return { backgroundColor: 'green', color: 'white' };
        else 
          return null;
      },
      footerStylePriority: false // false is default value
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
    title: 'Test Table',
    defaultPage: 0,
    defaultRowsPerPage: 5,
    pageOptions: [5, 10, 25, 50],
    stickyHeader: true,
    stickyFooter: true,
    stickyColumn: true,
    showEmptyRows: false,
    maxTableHeight: 640,
    minCellWidth: 100,
    headerCellStyle: { fontWeight: 'bold' },
    rowCellStyle: { backgroundColor: '#F2EEEE' },
    footerCellStyle: { backgroundColor: '#3f51b5', color: 'white' }
  };

  return( 
    <div>
      <ThanosTable rows={rows} columns={columns} options={options} />
    </div>
  );
}

export default App;
```

## Explanation of some Logic
** ThanosTableMain **
stabilizedThis = [[el0, 0], [el1, 1], [el2, 2]]
comparator = getComparator(order, orderBy) .... example getComparator('asc', 'calories')
comparator(a[0], b[0]) = getComparator(order, orderBy)(a[0], b[0])  
= getComparator('asc', 'calories')(a[0], b[0]) = -descendingComparator(a[0], b[0], 'asc')
= -(if (b['calories] < a['calories] ..... ) = - (-1) for example = 1. 
order = 1 .... used to sort stabilizedThis
if order = 0 .....a[1] - b[1] = [0 - 1] = -1 .... used to sort by index if value is same
stabilizedThis.map((el) => el[0]) = [el2, el0, el1] .... sorted array

** ThanosTableMain **
slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
if page=0, rowsPerPage=5 => slice(0, 5) ie (0, 1, 2, 3, 4)
if page=1. rowsPerPage=5 => slice(5, 10) ie (5, 6, 7, 8, 9)