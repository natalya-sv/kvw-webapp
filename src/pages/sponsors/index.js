import React, { useState } from "react";
import AddEditSponsorForm from "./AddEditSponsorForm";
import Title from "../../components/UI/Title";
import AlertNotification from "../../components/UI/AlertNotification";
import SpinnerView from "../../components/UI/SpinnerView";
import { ALL_SPONSORS_DESC, SPONSORS } from "./constants";
import PageDescription from "../../components/UI/PageDescription";
import { Box } from "@mui/material";
import SponsorsTable from "./SponsorsTable";
import CustomModal from "../../components/CustomModal";
import {
  useGetSponsorsQuery,
  useUpdateSponsorsDataMutation,
} from "../../services/sponsors";

const SponsorsPage = () => {
  const [open, setOpen] = useState(false);
  const [editedSponsor, setEditedSponsor] = useState(null);
  const [
    updateSponsorsData,
    {
      isSuccess: successUpdating,
      isError: errorUpdating,
      error: updatingErrorRes,
    },
  ] = useUpdateSponsorsDataMutation();

  const {
    data: sponsors,
    isLoading,
    isError: errorFetching,
    error: fetchingErrorRes,
  } = useGetSponsorsQuery();

  const openSponsorsModal = () => {
    setOpen(true);
  };

  const closeSponsorsModal = () => {
    setEditedSponsor(null);
    setOpen(false);
  };

  if (isLoading) {
    return <SpinnerView />;
  }
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100%"}
    >
      <AlertNotification
        errorFetching={errorFetching}
        errorUpdating={errorUpdating}
        successUpdating={successUpdating}
        subMessage={
          fetchingErrorRes?.message ?? updatingErrorRes?.message ?? ""
        }
      />
      <Title title={SPONSORS} />
      <PageDescription text={ALL_SPONSORS_DESC} />

      <Box style={{ width: "90%" }}>
        <AddEditSponsorForm
          closeSponsorsModal={closeSponsorsModal}
          updateSponsorsData={updateSponsorsData}
        />
      </Box>
      <CustomModal
        open={open}
        handleClose={closeSponsorsModal}
        modalComponent={
          <AddEditSponsorForm
            editedSponsor={editedSponsor}
            closeSponsorsModal={closeSponsorsModal}
            updateSponsorsData={updateSponsorsData}
          />
        }
      />
      <SponsorsTable
        setEditedSponsor={setEditedSponsor}
        closeSponsorsModal={closeSponsorsModal}
        openSponsorsModal={openSponsorsModal}
        sponsors={sponsors}
        updateSponsorsData={updateSponsorsData}
      />
    </Box>
  );
};
export default SponsorsPage;
