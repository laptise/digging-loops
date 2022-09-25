import { Autocomplete, Button, Dialog, DialogTitle, Stack, TextField } from "@mui/material";
import { useSearchTag } from "gqls";
import { FC, useState } from "react";

type UseTagEditModalProps = {
  afterSubmit: (value: string) => void;
};

const ModalBody: FC<{ open: boolean; close: () => void } & UseTagEditModalProps> = ({ open, afterSubmit, close }) => {
  const [input, setInput] = useState<string>("");
  const { data, loading } = useSearchTag({ name: input });
  const arr = data?.searchTag || [];
  return (
    <Dialog open={open}>
      <DialogTitle style={{ paddingBottom: 0 }}>{"태그선택"}</DialogTitle>
      <Stack sx={{ p: 2 }}>
        <Autocomplete
          options={arr.map((x) => ({ label: x.name, id: x.id }))}
          renderInput={(params) => <TextField onChange={(e) => setInput(e.target.value)} {...params} label="Movie" />}
        />
        {/* <TextField variant="outlined" onChange={(e) => setInput(e.target.value)} value={input} /> */}
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

export const useTagEditorModal = ({ afterSubmit }: UseTagEditModalProps): [() => JSX.Element, () => void, boolean] => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const open = () => {
    setIsOpened(true);
  };

  const dialog = () => (
    <ModalBody
      open={isOpened}
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
