import React from "react"; 
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Link from '@material-ui/core/Link'; 
import Button from '@material-ui/core/Button'; 
import PauseIcon from '@material-ui/icons/Pause'; 
import IconButton from '@material-ui/core/IconButton';
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

  // key is mandatory. Each key should be unique. 
  // It should match row keys for normal row values, and can be anything for custom values.
  // If there are multiple defaultSort, last one takes preference.
  // In customSort: Return numerical value if you want sorted numerically.
  // In customSort: Return string if you want sorted alphabetically.
  // totalRowCellName and totalRow cannot be together. If it happens, totalRowCellName takes preference.
  // totalRow of customElement is also computed by the same equation returned in customElement.
  // columnCellStyle can be made to have lower/higher priority than footerCellStyle. Default is higher. 
  // minColWidth has higher priority than minCellWidth
  const columns = [
    { key: 'action', 
      title: 'Action',
      minColWidth: 30,
      customElement: function(row) {
        return(
          <IconButton size="small" color="primary" aria-label="upload picture" component="span">
            <PauseIcon />
          </IconButton>
        );
      }
    },
    { key: 'name', title: 'Dessert (100g serving)', totalRowCellName: 'Total', 
      // minColWidth: 300,
      columnCellStyle: function(row) {
          return { backgroundColor: '#dedede' };
      },
      footerStylePriority: true
    }, 
    { key: 'calories', title: 'Calories', defaultSort: 'asc', totalRow: true },
    { key: 'fat', title: 'Fat', totalRow: true },
    { key: 'carbs', title: 'Carbs', totalRow: true },
    { key: 'protein', title: 'Protein', totalRow: true },
    // { key: 'link', 
    //   title: 'Link',
    //   totalRow: true,
    //   customElement: function(row) {
    //     return( 
    //       <Link href={"/campaigns/"}>
    //           {(row.fat + row.carbs + row.protein).toFixed(2)}
    //       </Link>
    //     );
    //   }
    // },
    { key: 'button', 
      title: 'Button',
      minColWidth: 300,
      totalRow: false,
      customElement: function(row) {
        return(
          <Button className={classes.root} variant="contained" size="small" fullWidth={true} >
            {row.name}
          </Button>
        );
      },
      columnCellStyle: function(row) {
        return { padding: '0px 0px 0px 0px', verticalAlign: 'top', height: '100%' };
      },
    }, 
    { key: 'img', 
      title: 'Image',
      minColWidth: 300,
      totalRowCellName: 'Yo', // Does not work along with customElement
      totalRow: true,
      customElement: function(row) {
        return(
          <img alt='bannera' src={'https://allpiki.ru/wp-content/uploads/2020/01/1579269254_korzik_net_u-1-300x210.jpg'} style={{ width: 50, borderRadius: '10%' }} />
        );
      }
    }, 
    { key: 'weight', 
      title: 'Weight', 
      totalRow: true,
      // totalRowCellName: 'Yo',
      // minColWidth: 300,
      customElement: function(row) { 
        return <div>{(row.fat + row.carbs + row.protein).toFixed(2)}</div>; 
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
    title: 'Test Table', // Default is ''
    defaultPage: 0, // Default is 0
    defaultRowsPerPage: 5, // Default is 5
    pageOptions: [5, 10, 25, 50], // Default is [5, 10, 25]
    stickyHeader: true, // Default is false
    stickyFooter: true, // Default is false
    stickyColumn: true, // Default is false
    showEmptyRows: false, // Default is false
    totalRow: true, // Default is true
    maxTableHeight: 640, // No default value
    // minCellWidth: 200, // No default value
    headerCellStyle: { fontWeight: '600' }, // Default is { fontWeight: 'bold', backgroundColor: '#fff' }
    rowCellStyle: {  backgroundColor: '#F2EEEE' }, // Default is { backgroundColor: '#fff' }
    footerCellStyle: { backgroundColor: '#3f51b5', color: 'white' }, // Default is { backgroundColor: '#fff' }
    showColumns: ['action', 'name', 'calories', 'fat', 'protein'] // No default value 
  };

  return( 
    <div>
      <ThanosTable rows={rows} columns={columns} options={options} />
    </div>
  );
}

export default App;