/* eslint-disable @next/next/no-img-element */
import { User } from "@entities";
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
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { clientAxios, noHeaderAxios } from "../networks/axios";
import { Layout } from "../components/layout";
import { withAuth } from "../ssr/auth";
import { LoadingButton } from "@mui/lab";
import io from "socket.io-client";
import Image from "next/image";
import { KeySelector } from "../components/key-selector";
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
  const progress = Math.floor((loaded / total) * 60) + stepPoint;
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

const ImageUploader = () => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const imgTag = useRef<HTMLImageElement | null>(null);
  const [img, setImg] = useState<File | null>(null);
  const [imgUrl, setimgUrl] = useState<string | null>(null);
  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onload = () => {
        setimgUrl(reader.result as string);
      };
      reader.readAsDataURL(img);
    }
    console.log(img);
  }, [img]);
  return (
    <FormControl>
      <FormLabel htmlFor="filename-input" id="demo-row-radio-buttons-group-label">
        사진
      </FormLabel>
      <Button variant="contained" onClick={() => fileInput.current?.click()}>
        Edit Thumbnail
      </Button>
      <Box style={{ width: 300, aspectRatio: "1", display: "flex", justifyContent: "center" }}>
        <img alt="test" style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }} src={imgUrl || ""} />
      </Box>
      <input
        onChange={(e) => setImg(e.target?.files?.[0] || null)}
        ref={fileInput}
        type="file"
        style={{ display: "none" }}
        accept="image/png, image/jpeg"
      />
    </FormControl>
  );
};

const Upload: NextPage<{ auth: User | null }> = ({ auth }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const [loadedSize, setLoadedSize] = useState(0);
  const [step, setStep] = useState(0);
  const upload = async () => {
    if (file) {
      const socket = io("http://localhost:13018");
      socket.on("connect", () => {
        setLoadedSize(0);
        setTotalSize(file.size);
        setStep(0);
      });
      socket.on("events", (data) => {
        if (data?.current) {
          setLoadedSize(data.current);
        }
        if (data?.step) {
          setStep(data.step);
        }
      });
      try {
        setIsUploading(true);
        const form = new FormData();
        form.append("track", file);
        form.append("trackName", file.name);
        console.log(file);
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
            <ImageUploader />
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
              <TextField name="aak" id="filename-input" variant="outlined" />
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
            <Button variant="contained" type="submit">
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
