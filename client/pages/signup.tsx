import { Button, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import styles from "../styles/Login.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { clientAxios } from "../networks/axios";
import crypto from "crypto";
import { AxiosError } from "axios";
import { ErrorHandler } from "../errors/handler";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { checkAuthSSR } from "../ssr/auth";
import { ErrorDialog } from "../components/dialogs/alert-dialog";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSafe, setIsSafe] = useState(false);
  const [hasError, setHasError] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  useEffect(() => {
    const validCheck = () => {
      if (!email || !name || !password || !passwordConfirm) return false;
      else if (password !== passwordConfirm) return false;
      else return true;
    };
    setIsSafe(validCheck);
  }, [email, name, password, passwordConfirm]);
  const submit = async () => {
    const hashPass = crypto.createHash("sha256").update(password, "utf8").digest("hex");
    try {
      const res = await clientAxios.post("auth/signup", { email, name, password: hashPass });
      setHasError(true);
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = ErrorHandler.parse(err);
        alert(message.kor);
      }
    }
  };
  return (
    <Layout mainId="layout" pageTitle="회원가입">
      <ErrorDialog
        open={hasError}
        onClose={() => {
          setHasError(false);
          router.push("/login");
        }}
        msg={"회원가입이 완료되었습니다.\n로그인해주세요"}
      />
      <Paper id={styles.paper}>
        <Typography variant="h4" color={"primary"}>
          회원가입
        </Typography>
        <TextField id="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} type={"email"} label="이메일 주소" variant="standard" />
        <TextField id="name" value={name} onChange={(e) => setName(e.currentTarget.value)} type={"text"} label="닉네임" variant="standard" />
        <TextField
          id="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          type={"password"}
          label="암호"
          variant="standard"
        />
        <TextField
          id="passwordConfirm"
          onChange={(e) => setPasswordConfirm(e.currentTarget.value)}
          value={passwordConfirm}
          type={"password"}
          label="암호확인"
          variant="standard"
        />
        <Button onClick={submit} disabled={!isSafe} variant="contained">
          회원가입
        </Button>
      </Paper>
    </Layout>
  );
};

export default SignUp;
