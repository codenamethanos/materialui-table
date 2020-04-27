import React from "react"; 
import ThanosTable, { TextInput } from "../lib";

function App() {

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return(
    <div>
      <ThanosTable rows={rows} />
    </div>
  );
}

// const App = () => (
//   <div style={{ width: 640, margin: "15px auto" }}>
//     <h1>Hello React</h1>
//     <TextInput label="Email Address" placeholder="name@example.com" />
//   </div>
// );

export default App;