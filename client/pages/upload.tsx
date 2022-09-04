/* eslint-disable @next/next/no-img-element */
import { User } from "@entities";
import { LoadingButton } from "@mui/lab";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  LinearProgressProps,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { FC, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useKeySelector } from "../components/key-selector";
import { Layout } from "../components/layout";
import { noHeaderAxios } from "../networks/axios";
import { withAuth } from "../ssr/auth";
import { AddNewTrackPayload } from "@dtos";
import { buildForm } from "../utils/form-builder";
import useImageUploader from "../hooks/use-image-uploader";
import { EndPoints } from "../networks/url";
function RowRadioButtonsGroup() {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">구분</FormLabel>
      <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
        <FormControlLabel value="female" control={<Radio />} label="샘플" />
        <FormControlLabel value="male" control={<Radio />} label="루프" />
        <FormControlLabel value="other" control={<Radio />} label="음원" />
      </RadioGroup>
    </FormControl>
  );
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const ProgressModal: FC<{ total: number; loaded: number; step: number; openState: [boolean, (val: boolean) => void] }> = ({
  openState,
  loaded,
  total,
  step,
}) => {
  const [open, setOpen] = openState;
  const stepPoint = step * 10;
  const progress = Math.floor((loaded / total) * 50) + stepPoint;
  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog open={open}>
        <DialogTitle>File Uploading</DialogTitle>
        <Box sx={{ p: 2 }}>
          <LinearProgressWithLabel value={progress} />
          <LoadingButton onClick={() => setOpen(false)} loading={progress !== 100} variant="contained">
            OK
          </LoadingButton>
        </Box>
      </Dialog>
    </>
  );
};

const Upload: NextPage<{ auth: User | null }> = ({ auth }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const [loadedSize, setLoadedSize] = useState(0);
  const [title, setTitle] = useState<string>("");
  const [step, setStep] = useState(0);
  const { Component: ImageUploaderC, img, imgUrl } = useImageUploader();
  const { KeySelector, value: keyChord } = useKeySelector();
  const uploadable = keyChord && file && img && title;
  const upload = async () => {
    if (uploadable) {
      const socket = io(EndPoints.getServerUrl());
      socket.on("connect", () => {
        setLoadedSize(0);
        setTotalSize(file.size);
        setStep(0);
      });
      socket.on("events", (data) => {
        console.log(data);
        if (data?.current) {
          setLoadedSize(data.current);
        }
        if (data?.step) {
          setStep(data.step);
        }
      });
      try {
        setIsUploading(true);
        const form = buildForm<AddNewTrackPayload>({ trackName: file.name, thumbnailName: img?.name || "", keyChord, title });
        form.append("track", file);
        if (img) form.append("thumbnail", img);
        await noHeaderAxios.post("track/upload", form, { headers: { "Content-Type": "multipart/form-data" } });
      } catch {
      } finally {
        socket.disconnect();
      }
    }
  };
  return (
    <Layout pageTitle="업로드" mainId="22" auth={auth}>
      <ProgressModal openState={[isUploading, setIsUploading]} step={step} loaded={loadedSize} total={totalSize} />
      <Paper>
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            upload();
          }}
        >
          <Stack sx={{ p: 2 }} spacing={2}>
            <Typography variant="h4" sx={{ p: 2 }}>
              파일 업로드
            </Typography>
            <RowRadioButtonsGroup />
            <ImageUploaderC />
            <FormControl>
              <FormLabel htmlFor="filename-input" id="demo-row-radio-buttons-group-label">
                키
              </FormLabel>
              <KeySelector />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="filename-input" id="demo-row-radio-buttons-group-label">
                파일명
              </FormLabel>
              <TextField value={title} onChange={(e) => setTitle(e.target.value)} id="filename-input" variant="outlined" />
            </FormControl>
            <input
              onChange={(e) => {
                const file = e.target?.files?.[0];
                if (file) {
                  setFile(file);
                }
              }}
              name="file"
              type="file"
            />
            <Button disabled={!uploadable} variant="contained" type="submit">
              업로드
            </Button>
          </Stack>
        </form>
      </Paper>
    </Layout>
  );
};
export default Upload;
export const getServerSideProps: GetServerSideProps = withAuth;
