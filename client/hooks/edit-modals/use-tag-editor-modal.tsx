import { Tag } from "@entities";
import { Autocomplete, Button, Dialog, DialogTitle, Stack, TextField } from "@mui/material";
import { useSearchTag } from "gqls";
import { FC, useDeferredValue, useEffect, useState, useTransition } from "react";

type UseTagEditModalProps = {
  afterSubmit: (tags: Tag[]) => void;
};

const ModalBody: FC<{ open: boolean; close: () => void } & UseTagEditModalProps> = ({ open, afterSubmit, close }) => {
  const [input, setInput] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const { data, loading } = useSearchTag({ name: input });
  const [arr, setArr] = useState<Tag[]>([]);
  const [pickedTags, setPickedTags] = useState<Tag[]>([]);
  useEffect(() => {
    if (!loading && data) {
      setArr(data?.searchTag || []);
    }
  }, [data, loading]);

  return (
    <Dialog open={open}>
      <DialogTitle style={{ paddingBottom: 0 }}>{"태그선택"}</DialogTitle>
      <Stack sx={{ p: 2 }}>
        <Autocomplete<Tag, true>
          options={arr}
          multiple
          onChange={(event, newValue) => setPickedTags(newValue)}
          filterSelectedOptions
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              onChange={(e) => {
                startTransition(() => {
                  setInput(e.target.value);
                });
              }}
              {...params}
              label="TAG"
            />
          )}
        />
        {/* <TextField variant="outlined" onChange={(e) => setInput(e.target.value)} value={input} /> */}
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => close()}>
            취소
          </Button>
          <Button disabled={pickedTags?.length > 0 === false} variant="contained" onClick={() => afterSubmit(pickedTags)}>
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
