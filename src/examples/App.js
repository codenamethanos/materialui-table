import React from "react"; 
import ThanosTable from "../lib";

function App() {

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
  ];

  // key is mandatory. It should match row keys for normal row values, and can be anything for custom values.
  // If there are multiple defaultSort, last one takes preference.
  // In customSort: Return numerical value if you want sorted numerically.
  // In customSort: Return string if you want sorted alphabetically.
  // totalRowCellName and totalRow cannot be together. If it happens, totalRowCellName takes preference.
  const columns = [
    { key: 'name', title: 'Dessert (100g serving)', totalRowCellName: 'Total' },
    { key: 'calories', title: 'Calories', defaultSort: 'asc', totalRow: true },
    { key: 'fat', title: 'Fat', totalRow: true },
    { key: 'carbs', title: 'Carbs', totalRow: true },
    { key: 'protein', title: 'Protein', totalRow: true },
    { key: 'weight', 
      title: 'Weight', 
      totalRow: true,
      customValue: function(row) { 
        return (row.fat + row.carbs + row.protein).toFixed(2); 
      },
      customSort: function(row) { 
        return (row.fat + row.carbs + row.protein); 
      }
    }
  ];

  const options = {
    title: 'Test Table',
    defaultPage: 0,
    defaultRowsPerPage: 5,
    pageOptions: [5, 10, 25, 50],
    showEmptyRows: false
  };

  return( 
    <div>
      <ThanosTable rows={rows} columns={columns} options={options} />
    </div>
  );
}

export default App;