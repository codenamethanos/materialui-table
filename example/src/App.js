import React from 'react';
import FirstComponent, { SecondComponent } from 'materialui-table';

const App = () => { 
  return <>
          <FirstComponent 
            text="Create React Library Example 😄" 
            color="green"
          />
          <SecondComponent 
            text="Create Second Library Example 😄" 
            color="red"
          />
        </>
}

export default App
