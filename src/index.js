import React from 'react';

const FirstComponent = ({ text, color }) => {
  return <h1 style={{color}}>Example Component: {text}</h1>
}

export default FirstComponent;
 
export const SecondComponent = ({ text, color }) => {
  return <h1 style={{color}}>Example Component: {text}</h1>
}