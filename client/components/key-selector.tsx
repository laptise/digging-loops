import { FC, useState } from "react";
import styles from "../styles/Components.module.scss";

type KeyProps = { keyName?: string; isSharp?: boolean; setPicked?: (picked: { label: string; value: string }) => void; value?: string };
const Key: FC<KeyProps> = ({ keyName, isSharp, setPicked, value }) => {
  return (
    <div
      onMouseDown={() => setPicked?.({ label: keyName || "", value: value || keyName || "" })}
      onTouchStart={() => setPicked?.({ label: keyName || "", value: value || keyName || "" })}
      className={styles.keySelectorKey}
      data-ghost-key={!keyName}
      data-is-sharp={isSharp}
    >
      {keyName}
    </div>
  );
};

export const useKeySelector = () => {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState("");
  const [value, setValue] = useState<string>("");
  const updatedPicked = ({ label, value }: { label: string; value: string }) => {
    setPicked(label);
    setValue(value);
    setOpen(false);
  };
  const component = () => (
    <div id={styles.keySelectorWrapper}>
      <input readOnly value={picked} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} />
      <div id={styles.keySelector} data-onview={open}>
        <div className={styles.keySelectorRow}>
          <Key keyName="C#/Bb" value="C#" isSharp={true} setPicked={updatedPicked} />
          <Key keyName="D#/Eb" value="D#" isSharp={true} setPicked={updatedPicked} />
          <Key />
          <Key keyName="F#/Gb" value="F#" isSharp={true} setPicked={updatedPicked} />
          <Key keyName="G#/Ab" value="G#" isSharp={true} setPicked={updatedPicked} />
          <Key keyName="A#/Bb" value="A#" isSharp={true} setPicked={updatedPicked} />
        </div>
        <div className={styles.keySelectorRow}>
          <Key keyName="C" isSharp={false} setPicked={updatedPicked} />
          <Key keyName="D" isSharp={false} setPicked={updatedPicked} />
          <Key keyName="E" isSharp={false} setPicked={updatedPicked} />
          <Key keyName="F" isSharp={false} setPicked={updatedPicked} />
          <Key keyName="G" isSharp={false} setPicked={updatedPicked} />
          <Key keyName="A" isSharp={false} setPicked={updatedPicked} />
          <Key keyName="B" isSharp={false} setPicked={updatedPicked} />
        </div>
      </div>
    </div>
  );
  return { KeySelector: component, value, picked };
};
