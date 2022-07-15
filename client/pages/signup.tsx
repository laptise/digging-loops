import { Button, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Layout } from "../components/layout";
import styles from "../styles/Login.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const submit = () => {
    console.log(1188);
  };
  return (
    <Layout mainId="layout" pageTitle="회원가입">
      <Paper id={styles.paper}>
        <Typography variant="h4" color={"primary"}>
          회원가입
        </Typography>
        <TextField id="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} type={"email"} label="이메일 주소" variant="standard" />
        <TextField id="password" type={"password"} label="암호" variant="standard" />
        <TextField id="passwordConfirm" type={"password"} label="암호확인" variant="standard" />
        <Button onClick={submit} variant="contained">
          회원가입
        </Button>
      </Paper>
    </Layout>
  );
};

export default SignUp;
