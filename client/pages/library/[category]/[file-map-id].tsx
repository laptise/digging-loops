import { User } from "@entities";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { UploadedItemsLayout } from "../../../components/layout/uploaded-items/uploaded-item-layout";
import { requireAuth } from "../../../ssr/auth";

const MyTrackInfo: FC<{ auth: User }> = ({ auth }) => {
  return (
    <UploadedItemsLayout auth={auth} value={0}>
      <div>dda</div>
    </UploadedItemsLayout>
  );
};

export default MyTrackInfo;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  requireAuth(ctx, async ({ query, params }) => {
    const fileMapId = params?.["file-map-id"]!;
    console.log(fileMapId);
    return { props: {} };
  });
