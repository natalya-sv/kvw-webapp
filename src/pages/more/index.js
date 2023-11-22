import Title from "../../components/UI/Title";
import React from "react";
import PageDescription from "../../components/UI/PageDescription";
import { MORE_PAGE_DESCRIPTION, MORE_PAGE_TITLE } from "./constants";
import MoreForm from "./MoreForm";
import { Box } from "@mui/material";
import AlertNotification from "../../components/UI/AlertNotification";
import SpinnerView from "../../components/UI/SpinnerView";
import { MORE_DATA_GET, MORE_PAGE_TAG } from "../../APIData";
import useCustomDataQuery from "../../useCustomDataQuery";

const MorePage = () => {
  const {
    data: moreData,
    updateData,
    isError,
    fetchingData,
    successUpdating,
    isLoading,
    errorMessage,
  } = useCustomDataQuery({ fetchData: MORE_DATA_GET, tag: MORE_PAGE_TAG });

  if (fetchingData) {
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
        isError={isError}
        isSuccessUpdating={successUpdating}
        errorMessage={errorMessage}
      />

      <Title title={MORE_PAGE_TITLE} />
      <PageDescription text={MORE_PAGE_DESCRIPTION} />
      {fetchingData.isLoading && <SpinnerView />}
      <Box width={"90%"}>
        <MoreForm
          moreData={moreData}
          updateData={updateData}
          isUpdating={isLoading}
        />
      </Box>
    </Box>
  );
};
export default MorePage;
