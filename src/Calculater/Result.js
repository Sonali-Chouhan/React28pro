import React from 'react'

const Result = (props) => {
  let {data}=props;
  console.log(123,props);
  return (
    <div>
        <p>{data}</p>
    </div>
  )
}

export default Result
