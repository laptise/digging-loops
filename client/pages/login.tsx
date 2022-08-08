import { Button, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import styles from "../styles/Login.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSafe, setIsSafe] = useState(false);
  useEffect(() => {
    const validateIsSafe = () => {
      if (!email || !password) return false;
      else return true;
    };
    setIsSafe(validateIsSafe);
  }, [email, password]);

  return (
    <Layout mainId="layout" pageTitle="로그인">
      <Paper id={styles.paper}>
        <Typography variant="h4" color={"primary"}>
          로그인
        </Typography>
        <TextField id="email" value={email} onChange={(e) => setEmail(e.target.value)} type={"email"} label="이메일 주소" variant="standard" />
        <TextField id="password" value={password} onChange={(e) => setPassword(e.target.value)} type={"password"} label="암호" variant="standard" />
        <Button disabled={!isSafe} variant="contained">
          로그인
        </Button>
        <Divider />
        <Link passHref={true} href="/signup">
          <Button variant="contained">회원가입</Button>
        </Link>
      </Paper>
    </Layout>
  );
};

export default Login;
