import { GetServerSideProps } from "next";

const Jump = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: { destination: "/library/sample/", permanent: true },
  };
};
export default Jump;
