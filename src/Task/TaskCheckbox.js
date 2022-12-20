
import React from "react";
// import { useEffect } from "react";
import { useState } from "react";
import { check } from "./Check";

const TaskCheckbox = () => {
  const [boxes, setboxes] = useState(check);

  const handleCheckBox = (e, id) => {
    var arr = [...boxes];
    arr.forEach((item) => {
      if (id == 1) {
        item.value = e.target.checked;
      } else if (item.id == id) {
        item.value = e.target.checked;
      }
    });
    var newBox = arr.filter((item, i) => item.id != 1 && item.value);
    arr[0].value = newBox.length == boxes.length - 1 ? true : false;
    setboxes(arr);
  };

  return (
    <div>
      <h1>Show Checkboxes</h1>
      <form action="/action_page.php" />

      <br />
      {boxes.map((data, i) => {
        return (
          <div key={i}>
            <input
              type="checkbox"
              name={data.name}
              value="Car"
              checked={data.value}
              onChange={(e) => {
                handleCheckBox(e, data.id);
              }}
            />
            <label for="vehicle2">{data.name}</label>
            <br />
          </div>
        );
      })}

      <form />
    </div>
  );
};

export default TaskCheckbox;
// import { useState } from "react";
// import "./styles.css";

// export default function App() {
//   const [data, setdata] = useState("");
//   const handeldata = (e) => {
//     setdata(data.concat(e.target.name));
//   };
//   return (
//     <div className="App">
//       <input type={"text"} value={data} />
//       <button name="1" onClick={handeldata}>
//         1
//       </button>
//       <button name="2">2</button>
//     </div>
//   );
// }