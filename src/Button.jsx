import React from "react";
import './index.scss'

const Buttons = React.memo(({ onPlus, onMinus, count }) => {
    console.log('Button rerender');
    return (
        <div>
            <button className="btn" onClick={onPlus}>+</button>
            <button className="btn" onClick={onMinus}>-</button>
        </div>
    )
});

export default Buttons

