import { SyntheticEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import Keyboard from "./components/keyboard";
import {
  CountryCode,
  formatIncompletePhoneNumber,
  getCountries,
} from "libphonenumber-js";

const getKeyValue = (key: string) => {
  switch (key) {
    case "{space}":
      return " ";
    default:
      return key;
  }
};

const countries = getCountries();

function App() {
  const [layout, setLayout] = useState("default");
  const [caret, setCaret] = useState(0);
  const [focusedInput, setFocusedInput] = useState<string>("name");
  const [countryCode, setCountryCode] = useState<CountryCode>("NO");
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
      if (key === "{bksp}") {
        if (caret === 0) {
          return;
        }
        const newValue =
          input.value.slice(0, caret - 1 < 0 ? 0 : caret - 1) +
          input.value.slice(caret);
        if (layout === "phone") {
          input.value = formatIncompletePhoneNumber(newValue, countryCode);
        } else {
          input.value = newValue;
        }
        const newCaret = caret - 1;
        setCaret(newCaret < 0 ? 0 : newCaret);
      } else {
        const newValue =
          input.value.slice(0, caret) + keyValue + input.value.slice(caret);

        if (layout === "phone") {
          const formattedValue = formatIncompletePhoneNumber(
            newValue,
            countryCode
          );
          input.value = formattedValue;

          const nextChar = newValue[caret];
          const nextFormattedChar = formattedValue[caret];
          console.log("nextChar", nextChar);
          console.log("nextFormattedChar", nextFormattedChar);
          if (nextChar !== nextFormattedChar) {
            setCaret(caret + 2);
            return;
          } else {
            setCaret(caret + 1);
          }
        } else {
          input.value = newValue;
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

      <select
        value={countryCode}
        onChange={(e) =>
          setCountryCode((e.target as HTMLSelectElement).value as CountryCode)
        }
      >
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

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
