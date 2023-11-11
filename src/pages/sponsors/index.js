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
import CustomButton from "../../components/CustomButton";
import { SPONSORS_GET, SPONSORS_TAG } from "../../APIData";
import AddIcon from "@mui/icons-material/Add";
import useCustomDataQuery from "../../useCustomDataQuery";

const SponsorsPage = () => {
  const [open, setOpen] = useState(false);
  const [editedSponsor, setEditedSponsor] = useState(null);

  const {
    data: sponsors,
    fetchingData,
    isError,
    successCreating,
    successUpdating,
    successDeleting,
    isLoading,
    errorMessage,
    updateData,
    createData,
    deleteData,
  } = useCustomDataQuery({ fetchData: SPONSORS_GET, tag: SPONSORS_TAG });

  const openSponsorsModal = () => {
    setOpen(true);
  };

  const closeSponsorsModal = () => {
    setEditedSponsor(null);
    setOpen(false);
  };
  if (fetchingData) {
    return <SpinnerView />;
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100%"}
    >
      {isLoading && <SpinnerView />}

      <AlertNotification
        isError={isError}
        isSuccessCreating={successCreating}
        isSuccessUpdating={successUpdating}
        isSuccessDeleting={successDeleting}
        errorMessage={errorMessage}
      />

      <Title title={SPONSORS} />
      <PageDescription text={ALL_SPONSORS_DESC} />

      <CustomButton
        title={ADD_SPONSOR}
        onClick={openSponsorsModal}
        startIcon={<AddIcon />}
      />
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
        successDeleting={successDeleting}
      />
    </Box>
  );
};
export default SponsorsPage;
