import React, { useState } from "react";
import AddEditSponsorForm from "./AddEditSponsorForm";
import Title from "../../components/UI/Title";
import AlertNotification from "../../components/UI/AlertNotification";
import SpinnerView from "../../components/UI/SpinnerView";
import { ADD_SPONSOR, ALL_SPONSORS_DESC, SPONSORS } from "./constants";
import PageDescription from "../../components/UI/PageDescription";
import { Box } from "@mui/material";
import SponsorsTable from "./SponsorsTable";
import CustomModal from "../../components/CustomModal";
import {
  useCreateDataMutation,
  useDeleteDataMutation,
  useGetDataQuery,
  useUpdateDataMutation,
} from "../../services/api";
import CustomButton from "../../components/CustomButton";
import { SPONSORS_GET, SPONSORS_TAG } from "../../APIData";

const SponsorsPage = () => {
  const [open, setOpen] = useState(false);
  const [editedSponsor, setEditedSponsor] = useState(null);
  const [
    updateData,
    {
      isSuccess: successUpdating,
      isError: errorUpdating,
      error: updatingErrorRes,
    },
  ] = useUpdateDataMutation();

  const {
    data: sponsors,
    isLoading,
    isError: errorFetching,
    error: fetchingErrorRes,
  } = useGetDataQuery({ fetchData: SPONSORS_GET, tag: SPONSORS_TAG });

  const [deleteData] = useDeleteDataMutation();
  const [createData] = useCreateDataMutation();

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

      <CustomButton title={ADD_SPONSOR} onClick={openSponsorsModal} />
      <CustomModal
        open={open}
        handleClose={closeSponsorsModal}
        modalComponent={
          <AddEditSponsorForm
            editedSponsor={editedSponsor}
            closeSponsorsModal={closeSponsorsModal}
            updateData={updateData}
            createData={createData}
          />
        }
      />
      <SponsorsTable
        setEditedSponsor={setEditedSponsor}
        closeSponsorsModal={closeSponsorsModal}
        openSponsorsModal={openSponsorsModal}
        sponsors={sponsors}
        deleteData={deleteData}
        updateData={updateData}
      />
    </Box>
  );
};
export default SponsorsPage;
