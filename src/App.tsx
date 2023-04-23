import { SyntheticEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import Keyboard from "./components/keyboard";

const getKeyValue = (key: string) => {
  switch (key) {
    case "{space}":
      return " ";
    default:
      return key;
  }
};

function App() {
  const [layout, setLayout] = useState("default");
  const [caret, setCaret] = useState(0);
  const [focusedInput, setFocusedInput] = useState<string>("name");
  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyPressed = (key: string) => {
    if (inputRef && inputRef.current) {
      const input = inputRef.current;
      const keyValue = getKeyValue(key);

      if (keyValue === "{bksp}") {
        const value = input.value;
        const newValue =
          value.substr(0, caret - 1) + value.substr(caret, value.length);
        inputRef.current.value = newValue;
        setCaret(caret - 1 < 0 ? 0 : caret - 1);
      } else {
        const value = input.value;
        const newValue =
          value.substr(0, caret) + keyValue + value.substr(caret, value.length);
        inputRef.current.value = newValue;
        setCaret(caret + 1);
      }
    }
  };

  useEffect(() => {
    console.log("caret", caret);
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.selectionStart = caret;
      inputRef.current.selectionEnd = caret;
    }
  }, [caret]);

  const handleOnFocus = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    console.log("Focused on " + target.id);
    setTimeout(() => {
      console.log("Caret", target.selectionStart, target.selectionEnd);
      setCaret(target.selectionStart || 0);
    }, 0);
  };

  return (
    <>
      <h1>The app</h1>
      <input
        id="name"
        type="text"
        defaultValue={inputRef.current?.value || ""}
        ref={inputRef}
        onClick={handleOnFocus}
      />
      <Keyboard layout={layout} onKeyPressed={onKeyPressed} />
    </>
  );
}

export default App;
