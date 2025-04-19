import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const CreditCard = () => {

  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

  return (
    <div>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form>
        <input
          type="number"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
     
        />
        <input
          type="text" // שדה התאריך
          name="expiry"
          placeholder="MM/YY"
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          maxLength={4}
        />
        <input
          type="text" // שדה CVC
          name="cvc"
          placeholder="CVC"
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          maxLength={3} // הגבלת אורך
        />
      </form>
      <style jsx>{`
        input {
          display: block;
          margin: 10px 0;
          padding: 10px;
          font-size: 16px;
          width: 100%;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export default CreditCard;
