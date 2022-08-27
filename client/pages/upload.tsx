import { User } from "@entities";
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { clientAxios, noHeaderAxios } from "../axios/server";
import { Layout } from "../components/layout";
import { withAuth } from "../ssr/auth";
import io from "socket.io-client";
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

const Upload: NextPage<{ auth: User | null }> = ({ auth }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const upload = async () => {
    if (file) {
      try {
        setIsUploading(true);
        const form = new FormData();
        form.append("track", file);
        form.append("trackName", file.name);
        console.log(file);
        await noHeaderAxios.post("track/upload", form, { headers: { "Content-Type": "multipart/form-data" } });
      } catch {
      } finally {
        setIsUploading(false);
      }
    }
  };
  useEffect(() => {
    const socket = io("http://localhost:13018");
    socket.on("connect", function () {
      console.log("Connected");

      socket.emit("events", { test: "test" });
      socket.emit("identity", 888, (response: any) => console.log("Identity:", response));
    });
    socket.on("events", function (data) {
      console.log("event", data);
    });
    socket.on("exception", function (data) {
      console.log("event", data);
    });
    socket.on("disconnect", function () {
      console.log("Disconnected");
    });
  }, []);
  return (
    <Layout pageTitle="업로드" mainId="22" auth={auth}>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isUploading}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
