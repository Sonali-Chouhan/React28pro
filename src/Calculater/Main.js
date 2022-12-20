import React, { useState } from 'react'
import KeyWord from './KeyWord'
import Result from './Result'

const Main = () => {
  const [data,setData]=useState("");
  const onClick = button => {
    if(button === "=") {
      calculate();
    }

    else if(button === "C") {
      reset();
    }

    else if(button === "CE") {
      backspace();
    }

    else {
      setData(
      data + button
      )
    }
  };

  const calculate = () => {
    var checkResult = ''
    if(data.includes('--')) {
      checkResult = data.replace('--', '+')
    } else {
      checkResult = data;
    }

    try {
      setData({
        data: (eval(checkResult) || "") + ""
      })
    } catch(e) {
      setData({
        data: "error"
      })
    }
  };

  const reset = () => {
    setData("")
  };

  const backspace = () => {
   setData(data.slice(0, -1)
    )
  };
 
  return (
    <div>
      <Result data={data}/>
      <KeyWord onClick={onClick}/>
    </div>
  )
}

export default Main
