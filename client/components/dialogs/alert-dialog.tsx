import { Box, Dialog, Typography } from "@mui/material";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  msg: string;
}
export function ErrorDialog(props: SimpleDialogProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: string) => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ p: 2 }}>
        <Typography>{props.msg}</Typography>
      </Box>
    </Dialog>
  );
}
