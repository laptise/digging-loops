import { Button, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { Layout } from "../components/layout";
import styles from "../styles/Login.module.scss";

const Login = () => {
  return (
    <Layout mainId="layout" pageTitle="로그인">
      <Paper id={styles.paper}>
        <Typography variant="h4" color={"primary"}>
          로그인
        </Typography>
        <TextField id="email" type={"email"} label="이메일 주소" variant="standard" />
        <TextField id="password" type={"password"} label="암호" variant="standard" />
        <Button variant="contained">로그인</Button>
        <Divider />
        <Link passHref={true} href="/signup">
          <Button variant="contained">회원가입</Button>
        </Link>
      </Paper>
    </Layout>
  );
};

export default Login;
