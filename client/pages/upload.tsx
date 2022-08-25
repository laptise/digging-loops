import { User } from "@entities";
import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { useRef, useState } from "react";
import { clientAxios, noHeaderAxios } from "../axios/server";
import { Layout } from "../components/layout";
import { withAuth } from "../ssr/auth";

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
  const upload = async () => {
    if (file) {
      const form = new FormData();
      form.append("track", file);
      form.append("trackName", file.name);
      console.log(file);
      await noHeaderAxios.post("track/upload", form, { headers: { "Content-Type": "multipart/form-data" } });
    }
  };

  return (
    <Layout pageTitle="업로드" mainId="22" auth={auth}>
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
