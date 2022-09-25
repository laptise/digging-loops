import { GetServerSideProps } from "next";

const Jump = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: { destination: "/library/samples", permanent: true },
  };
};
export default Jump;
