import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  let list;

  const transition = (value, replace = false) => {
    setMode(value);
    list = history;
    if (replace) list.pop();
    list.push(value);
    setHistory(list)
  };

  const back = () => {
    list = history;
    if (list.length <= 1) setMode(list[0])
    else {
      list.pop();
      setHistory(list);
      setMode(history[(history.length)-1]);
    }
  } 

  return { mode, transition, back };
}

