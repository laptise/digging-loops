import { Paper, Stack, TextField } from "@mui/material";
import { Layout } from "../components/layout";
import styles from "../styles/Login.module.scss";

const Login = () => {
  return (
    <Layout mainId="layout" pageTitle="로그인">
      <Paper id={styles.paper}>
        <Stack spacing={1}>
          <TextField id="email" type={"email"} label="이메일 주소" variant="standard" />
          <TextField id="password" type={"password"} label="암호" variant="standard" />
        </Stack>
      </Paper>
    </Layout>
  );
};

export default Login;
