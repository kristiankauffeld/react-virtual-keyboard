import { SyntheticEvent, useState } from "react";
import "./keyboard.css";

const KeyboardLayout: Record<string, string[]> = {
  default: [
    "1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "{tab} q w e r t y u i o p [ ] \\",
    "{lock} a s d f g h j k l ; ' {enter}",
    "{shift} z x c v b n m , . / {shift}",
    ".com @ {space}",
  ],
  phone: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 {enter}"],
};

type KeyboardProps = {
  layout: string;
  onKeyPressed: (key: string) => void;
};

export default function Keyboard(props: KeyboardProps) {
  const { layout, onKeyPressed } = props;

  const keys = KeyboardLayout[layout].map((row: string, rowIdx: number) => {
    const key = row.split(" ");

    const handleKeyPressed = (event: SyntheticEvent) => {
      const key = (event?.target as HTMLButtonElement).id;
      onKeyPressed(key);
    };

    return (
      <div className="keyboard__row" key={"keyboard-row--" + rowIdx}>
        {key.map((key: string, keyIdx: number) => {
          return (
            <button
              id={key}
              className="keyboard__key"
              key={key + "-" + keyIdx}
              onClick={handleKeyPressed}
            >
              {key}
            </button>
          );
        })}
      </div>
    );
  });

  return (
    <div className="keyboard">
      <div className="keyboard__keys">{keys}</div>
    </div>
  );
}
