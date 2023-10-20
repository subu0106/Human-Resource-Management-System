import React from 'react';

const Input = ({name,label,error,...rest}) => {

    //object destructuring
    // component interface for input fields
    return (
        <div className="input-box">
            <input
                {...rest}       // rest operator, rest of the properties (type={type}, value={value}, onChange={onChange}})
                name={name}
                id={name}
                placeholder={label}
                autoFocus       //can type in the input field without clicking on it
                autoComplete="off"
                className="input-field"
            />

            {error && <div className="alert alert-danger">{error}</div>}        {/*if error is truthy, the div will be rendered*/}
        </div>
    );

    
}
export default Input;