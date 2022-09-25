import { Stack, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = { label: string; body: string };
export const HorizontalHeaderItem: FC<Props> = ({ label, body }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="h3" fontSize={16} color="#999">
        {label}
      </Typography>
      <Typography variant="body1" fontSize={16}>
        {body}
      </Typography>
    </Stack>
  );
};
