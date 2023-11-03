import Title from "../../components/UI/Title";
import React from "react";
import PageDescription from "../../components/UI/PageDescription";
import { MORE_PAGE_DESCRIPTION, MORE_PAGE_TITLE } from "./constants";
import MoreForm from "./MoreForm";
import { Box } from "@mui/material";
import AlertNotification from "../../components/UI/AlertNotification";
import SpinnerView from "../../components/UI/SpinnerView";
import { MORE_DATA_GET, MORE_PAGE_TAG } from "../../APIData";
import { useUpdateDataMutation, useGetDataQuery } from "../../services/api";

const MorePage = () => {
  const {
    data: moreData,
    isLoading,
    isError: errorFetching,
    error: fetchingErrorRes,
  } = useGetDataQuery({ fetchData: MORE_DATA_GET, tag: MORE_PAGE_TAG });

  const [updateData, { isSuccess: successUpdating, isError: errorUpdating }] =
    useUpdateDataMutation();

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
      <Box width={"90%"}>
        <MoreForm moreData={moreData} updateData={updateData} />
      </Box>
    </Box>
  );
};
export default MorePage;
