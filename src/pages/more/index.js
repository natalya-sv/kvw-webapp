import Title from "../../components/UI/Title";
import React from "react";
import PageDescription from "../../components/UI/PageDescription";
import { MORE_PAGE_DESCRIPTION, MORE_PAGE_TITLE } from "./constants";
import MoreForm from "./MoreForm";
import { Box } from "@mui/material";
import AlertNotification from "../../components/UI/AlertNotification";
import SpinnerView from "../../components/UI/SpinnerView";
import {
  useGetMoreDataQuery,
  useSetMoreDataMutation,
} from "../../services/more";

const MorePage = () => {
  const {
    data: moreData,
    isLoading,
    isError: errorFetching,
    error: fetchingErrorRes,
  } = useGetMoreDataQuery();
  const [setMoreData, { isSuccess: successUpdating, isError: errorUpdating }] =
    useSetMoreDataMutation();

  if (isLoading) {
    return <SpinnerView />;
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      style={{ width: "100%" }}
    >
      <AlertNotification
        errorFetching={errorFetching}
        errorUpdating={errorUpdating}
        successUpdating={successUpdating}
        subMessage={fetchingErrorRes?.message ?? ""}
      />

      <Title title={MORE_PAGE_TITLE} />
      <PageDescription text={MORE_PAGE_DESCRIPTION} />

      <Box
        style={{
          width: "90%",
        }}
      >
        <MoreForm moreData={moreData} setMoreData={setMoreData} />
      </Box>
    </Box>
  );
};
export default MorePage;
