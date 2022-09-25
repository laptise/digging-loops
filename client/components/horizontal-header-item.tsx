import { Stack, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = { label: string; body: string };
export const HorizontalHeaderItem: FC<Props> = ({ label, body }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="h3" fontSize={24}>
        {label}
      </Typography>
      <Typography variant="body1" fontSize={24}>
        {body}
      </Typography>
    </Stack>
  );
};
