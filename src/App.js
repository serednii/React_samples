import React from 'react';
import Button from './Button'
function App() {
  const [count, setCounter] = React.useState(0);


  const onPlus = React.useCallback(() => setCounter((count) => count < 20 ? count + 1 : count));
  const onMinus = React.useCallback(() => setCounter((count) => count > 0 ? count - 1 : count));

  return (
    <div className='App'>
      <h1>{count}</h1>
      <Button onPlus={onPlus} onMinus={onMinus} count={count} />
    </div>
  );
}

export default App;
