import { SyntheticEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import Keyboard from "./components/keyboard";
import { formatIncompletePhoneNumber } from "libphonenumber-js";

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
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const [inputs] = useState<Record<string, any>>({
    name: nameInputRef,
    surname: surnameInputRef,
    phone: phoneInputRef,
  });

  const onKeyPressed = (key: string) => {
    if (inputs[focusedInput] && inputs[focusedInput].current) {
      const input = inputs[focusedInput].current;
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
        if (focusedInput === "phone") {
          const formattedValue = formatIncompletePhoneNumber(newValue, "NO");
          inputs[focusedInput].current.value = formattedValue;
          setCaret(caret + 1 + (formattedValue.length - newValue.length || 0));
        } else {
          inputs[focusedInput].current.value = newValue;
          setCaret(caret + 1);
        }
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

  const handleOnFocus = (event: SyntheticEvent, layout?: string) => {
    const target = event.target as HTMLInputElement;
    console.log("Focused on " + target.id);
    setTimeout(() => {
      console.log("Caret", target.selectionStart, target.selectionEnd);
      setFocusedInput(target.id);
      setCaret(target.selectionStart || 0);
      if (layout) {
        setLayout(layout);
      }
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
        onClick={(e) => handleOnFocus(e, "default")}
      />

      <br />

      <input
        id="surname"
        type="text"
        placeholder="Surname"
        defaultValue={surnameInputRef.current?.value || ""}
        ref={surnameInputRef}
        onClick={(e) => handleOnFocus(e, "default")}
      />
      <br />

      <input
        id="phone"
        type="tel"
        placeholder="Phone"
        defaultValue={phoneInputRef.current?.value || ""}
        ref={phoneInputRef}
        onClick={(e) => handleOnFocus(e, "phone")}
      />

      <Keyboard layout={layout} onKeyPressed={onKeyPressed} />
    </>
  );
}

export default App;
