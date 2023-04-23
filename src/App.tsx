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
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const surnameInputRef = useRef<HTMLInputElement | null>(null);
  const [inputs] = useState<Record<string, any>>({
    name: nameInputRef,
    surname: surnameInputRef,
  });

  const onKeyPressed = (key: string) => {
    if (inputs[focusedInput] && inputs[focusedInput].current) {
      const input = inputs[focusedInput].current;
      console.log(input);
      const keyValue = getKeyValue(key);

      if (keyValue === "{bksp}") {
        const value = input.value;
        const newValue =
          value.substr(0, caret - 1) + value.substr(caret, value.length);
        inputs[focusedInput].current.value = newValue;
        setCaret(caret - 1 < 0 ? 0 : caret - 1);
      } else {
        const value = input.value;
        const newValue =
          value.substr(0, caret) + keyValue + value.substr(caret, value.length);
        inputs[focusedInput].current.value = newValue;
        setCaret(caret + 1);
      }
    }
  };

  useEffect(() => {
    console.log("caret", caret);
    if (inputs[focusedInput] && inputs[focusedInput].current) {
      inputs[focusedInput].current.focus();
      inputs[focusedInput].current.selectionStart = caret;
      inputs[focusedInput].current.selectionEnd = caret;
    }
  }, [caret, focusedInput, inputs]);

  const handleOnFocus = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    console.log("Focused on " + target.id);
    setTimeout(() => {
      console.log("Caret", target.selectionStart, target.selectionEnd);
      setFocusedInput(target.id);
      setCaret(target.selectionStart || 0);
    }, 0);
  };

  return (
    <>
      <h1>The app</h1>
      <input
        id="name"
        type="text"
        placeholder="Name"
        defaultValue={nameInputRef.current?.value || ""}
        ref={nameInputRef}
        onClick={handleOnFocus}
      />

      <br />

      <input
        id="surname"
        type="text"
        placeholder="Surname"
        defaultValue={surnameInputRef.current?.value || ""}
        ref={surnameInputRef}
        onClick={handleOnFocus}
      />
      <Keyboard layout={layout} onKeyPressed={onKeyPressed} />
    </>
  );
}

export default App;
