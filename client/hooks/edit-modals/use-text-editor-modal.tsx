import { Button, Dialog, DialogTitle, Stack, TextField } from "@mui/material";
import { FC, useState } from "react";

type UseUpdateModalProps = {
  question: string;
  placeholder: string;
  afterSubmit: (value: string) => void;
};

const ModalBody: FC<{ open: boolean; close: () => void } & UseUpdateModalProps> = ({ open, question, placeholder, afterSubmit, close }) => {
  const [input, setInput] = useState<string>("");

  return (
    <Dialog open={open}>
      <DialogTitle style={{ paddingBottom: 0 }}>{question}</DialogTitle>
      <Stack sx={{ p: 2 }}>
        <TextField variant="outlined" onChange={(e) => setInput(e.target.value)} value={input} placeholder={placeholder} />
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => close()}>
            취소
          </Button>
          <Button disabled={!input} variant="contained" onClick={() => afterSubmit(input)}>
            확인
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export const useTextEditorModal = ({ question, placeholder, afterSubmit }: UseUpdateModalProps): [() => JSX.Element, () => void, boolean] => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const open = () => {
    setIsOpened(true);
  };

  const dialog = () => (
    <ModalBody
      open={isOpened}
      question={question}
      placeholder={placeholder}
      afterSubmit={(val) => {
        setIsOpened(false);
        afterSubmit(val);
        setIsUpdated(true);
      }}
      close={() => setIsOpened(false)}
    />
  );

  return [dialog, open, isUpdated];
};
