import { Paper, Stack, TextField, Typography } from "@mui/material";
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
      </Paper>
    </Layout>
  );
};

export default Login;
