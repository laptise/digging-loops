import { FC, useState } from "react";
import styles from "../styles/Components.module.scss";

const Key: FC<{ keyName?: string; isSharp?: boolean; setPicked?: (val: string) => void }> = ({ keyName, isSharp, setPicked }) => {
  return (
    <div
      onMouseDown={() => setPicked?.(keyName || "")}
      onTouchStart={() => setPicked?.(keyName || "")}
      className={styles.keySelectorKey}
      data-ghost-key={!keyName}
      data-is-sharp={isSharp}
    >
      {keyName}
    </div>
  );
};

export const KeySelector: FC<{}> = ({}) => {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState("");
  return (
    <div id={styles.keySelectorWrapper}>
      <input readOnly value={picked} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} />
      <div id={styles.keySelector} data-onview={open}>
        <div className={styles.keySelectorRow}>
          <Key keyName="C#/Bb" isSharp={true} setPicked={setPicked} />
          <Key keyName="D#/Eb" isSharp={true} setPicked={setPicked} />
          <Key />
          <Key keyName="F#/Gb" isSharp={true} setPicked={setPicked} />
          <Key keyName="G#/Ab" isSharp={true} setPicked={setPicked} />
          <Key keyName="A#/Bb" isSharp={true} setPicked={setPicked} />
        </div>
        <div className={styles.keySelectorRow}>
          <Key keyName="C" isSharp={false} setPicked={setPicked} />
          <Key keyName="D" isSharp={false} setPicked={setPicked} />
          <Key keyName="E" isSharp={false} setPicked={setPicked} />
          <Key keyName="F" isSharp={false} setPicked={setPicked} />
          <Key keyName="G" isSharp={false} setPicked={setPicked} />
          <Key keyName="A" isSharp={false} setPicked={setPicked} />
          <Key keyName="B" isSharp={false} setPicked={setPicked} />
        </div>
      </div>
    </div>
  );
};
