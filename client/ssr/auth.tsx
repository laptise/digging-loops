import { IncomingMessage } from "http";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { ParsedUrlQuery } from "querystring";
import { isBrowser, ssrAxios } from "../networks/axios";
import { User } from "@entities";
export const checkAuthSSR = async (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  }
): Promise<User | null> => {
  try {
    const token = isBrowser() ? sessionStorage.getItem("access_token") : req?.cookies?.["access_token"]?.toString?.() || "";
    const res = await ssrAxios.get("auth/check", {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data as unknown as User;
  } catch {
    return null;
  }
};
type WithAuthFn<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = (context: GetServerSidePropsContext<Q, D> & { auth: User | null }) => Promise<GetServerSidePropsResult<P>>;

type RequireAuthFn<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = (context: GetServerSidePropsContext<Q, D> & { auth: User }) => Promise<GetServerSidePropsResult<P>>;

async function resolveFn<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>(context: GetServerSidePropsContext<Q, D>, fn: WithAuthFn<P, Q, D>, auth: User | null): Promise<{ props: P | Promise<P> }> {
  const injectedContext = { ...context, ...{ auth } };
  return (await fn(injectedContext)) as any;
}

export async function withAuth<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>(context: GetServerSidePropsContext<Q, D>, fn?: GetServerSideProps<P, Q, D>): Promise<GetServerSidePropsResult<P>> {
  const [auth, res]: any = await Promise.all([checkAuthSSR(context.req), fn?.(context)].filter(Boolean));
  return fn ? { ...res, ...{ props: { ...res.props, auth } } } : { props: { auth } };
}

export async function requireAuth<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>(context: GetServerSidePropsContext<Q, D>, fn?: RequireAuthFn<P, Q, D>): Promise<GetServerSidePropsResult<P>> {
  const auth = await checkAuthSSR(context.req);
  if (!auth) {
    return { redirect: { destination: "/login", permanent: false } };
  }
  const blankProps = { props: {} } as { props: P };
  if (fn) {
    const res = await resolveFn(context, fn as WithAuthFn<P, Q, D>, auth);
    const resWithPayload = { props: { ...res.props, ...{ auth } } };
    return { ...resWithPayload };
  } else {
    const paylodObj = { auth };
    return { props: paylodObj } as unknown as { props: P };
  }
}
