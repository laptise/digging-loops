import { Button, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { clientAxios } from "../networks/axios";
import { Layout } from "../components/layout";
import styles from "../styles/Login.module.scss";
import crypto from "crypto";
import { setCookie } from "nookies";
import { checkAuthSSR } from "../ssr/auth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ErrorDialog } from "../components/dialogs/alert-dialog";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSafe, setIsSafe] = useState(false);
  const router = useRouter();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const validateIsSafe = () => {
      if (!email || !password) return false;
      else return true;
    };
    setIsSafe(validateIsSafe);
  }, [email, password]);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const hashPass = crypto.createHash("sha256").update(password, "utf8").digest("hex");
      const { data } = await clientAxios.post("auth/login", { email, password: hashPass });
      setCookie(null, "access_token", data.access_token, {
        maxAge: 24 * 60 * 60,
        path: "/",
      });
      sessionStorage.setItem("access_token", data.access_token);
      router.reload();
    } catch {
      setHasError(true);
    }
  };
  return (
    <Layout mainId="layout" pageTitle="로그인">
      <ErrorDialog
        open={hasError}
        onClose={() => {
          setHasError(false);
        }}
        msg={"일치하는 로그인정보가 없습니다."}
      />
      <form onSubmit={(e) => submit(e)}>
        <Paper id={styles.paper}>
          <Typography variant="h4" color={"primary"}>
            로그인
          </Typography>
          <TextField id="email" value={email} onChange={(e) => setEmail(e.target.value)} type={"email"} label="이메일 주소" variant="standard" />
          <TextField id="password" value={password} onChange={(e) => setPassword(e.target.value)} type={"password"} label="암호" variant="standard" />
          <Button disabled={!isSafe} variant="contained" type="submit">
            로그인
          </Button>
          <Divider />
          <Link passHref={true} href="/signup">
            <Button variant="contained">회원가입</Button>
          </Link>
        </Paper>
      </form>
    </Layout>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await checkAuthSSR(req);
  console.log(user);
  if (user) {
    return { redirect: { destination: "/", permanent: true }, props: {} };
  } else return { props: {} };
};
