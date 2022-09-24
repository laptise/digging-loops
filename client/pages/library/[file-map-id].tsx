import { GetServerSideProps } from "next";
import { requireAuth } from "../../ssr/auth";

function MyTrackInfo() {
  return <div>dda</div>;
}

export default MyTrackInfo;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  requireAuth(ctx, async ({ query, params }) => {
    const fileMapId = params?.["file-map-id"]!;
    console.log(fileMapId);
    return { props: {} };
  });
