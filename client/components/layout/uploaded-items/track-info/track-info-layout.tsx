import { Track } from "@entities";
import { Button, ButtonGroup, Stack } from "@mui/material";
import Link from "next/link";
import { FC, ReactNode } from "react";

type TrackInfoLayoutProps = {
  value: number;
  track: Track;
  children: ReactNode;
};

export const TrackInfoLayout: FC<TrackInfoLayoutProps> = ({ value, track, children }) => {
  return (
    <Stack direction="row" style={{ minHeight: 300 }}>
      <Stack sx={{ backgroundColor: "rgba(0,0,0,0.05)" }}>
        <ButtonGroup disableElevation={true} orientation="vertical" aria-label="vertical outlined button group" sx={{ width: 160 }}>
          <SingleButton href={`/library/samples/${track.id}`} picked={value === 1} label={"곡 정보"} />
          <SingleButton href={`/library/samples/${track.id}/sales`} picked={value === 2} label={"판매 정보"} />
        </ButtonGroup>
      </Stack>
      {children}
    </Stack>
  );
};

const SingleButton: FC<{ picked: boolean; label: string; href: string }> = ({ picked, label, href }) => {
  return picked ? (
    <Button disableElevation={true} variant="contained">
      {label}
    </Button>
  ) : (
    <Link href={href}>
      <Button disableElevation={true} variant="text" sx={{ color: "gray" }}>
        {label}
      </Button>
    </Link>
  );
};
