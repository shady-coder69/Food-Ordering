import React from 'react';
import './Input.css';

const Input = React.forwardRef((props, ref) => {
    return (<div className='input'>
        <label htmlFor={props.id}>{props.label}</label>
        <input type={props.type} ref={ref} id={props.id} min={props.min} max={props.max} step={props.step} defaultValue={props.default}></input>
    </div>)
});

export default Input;