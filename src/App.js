import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const defaultCurrencies = ['RUB', 'USD', 'EUR', 'GBP'];
  const [fromCurrency, SetFromCurrency] = React.useState('RUB');
  const [toCurrency, SetToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);

  // const [rates, setRates] = React.useState({});
  const ratesRef = React.useRef({});

  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then((res) => res.json())
      .then((json) => {
        // setRates(json.rates);
        ratesRef.current = json.rates;
        onChangeToPrice(1)
        console.log(json.rates);
      }).catch((err) => {
        console.warn(err);
        alert('Не удалось получить информацию');
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  }

  const onChangeToPrice = (value) => {
    const price = value / ratesRef.current[toCurrency];
    const result = price * ratesRef.current[fromCurrency];
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  }

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);


  return (
    <div className="App">
      <Block
        value={fromPrice}
        defaultCurrencies={defaultCurrencies}
        currency={fromCurrency}
        onChangeCurrency={SetFromCurrency}
        onChangeValue={onChangeFromPrice}
      />

      <Block
        value={toPrice}
        defaultCurrencies={defaultCurrencies}
        currency={toCurrency}
        onChangeCurrency={SetToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
