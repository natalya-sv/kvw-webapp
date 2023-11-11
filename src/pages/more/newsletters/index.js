import { useState } from "react";
import SpinnerView from "../../../components/UI/SpinnerView";
import { Box } from "@mui/material";
import AlertNotification from "../../../components/UI/AlertNotification";
import Title from "../../../components/UI/Title";
import PageDescription from "../../../components/UI/PageDescription";
import AddEditNewslettersItem from "./AddEditNewsletterItem";
import CustomModal from "../../../components/CustomModal";
import NewsletteraTable from "./NewslettersTable";
import { ADD_NEWSLETTER, NEWSLETTERS, NEWSLETTERS_DESC } from "./constants";
import { NEWSLETTERS_GET, NEWSLETTERS_TAG } from "../../../APIData";
import CustomButton from "../../../components/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import useCustomDataQuery from "../../../useCustomDataQuery";

const NewslettersPage = () => {
  const [open, setOpen] = useState(false);
  const [editedNewsletterItem, setEditedNewsletterItem] = useState(null);
  const {
    data: newsletters,
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
  } = useCustomDataQuery({ fetchData: NEWSLETTERS_GET, tag: NEWSLETTERS_TAG });

  const openNewslettersModal = () => {
    setOpen(true);
  };

  const closeNewslettersModal = () => {
    setEditedNewsletterItem(null);
    setOpen(false);
  };

  const isSuccess = successCreating || successUpdating || successDeleting;

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
      <Title title={NEWSLETTERS} />
      <PageDescription text={NEWSLETTERS_DESC} />
      {isLoading && <SpinnerView />}
      {(isError || isSuccess) && (
        <AlertNotification
          isError={isError}
          isSuccess={isSuccess}
          errorMessage={errorMessage}
        />
      )}
      <CustomButton
        title={ADD_NEWSLETTER}
        onClick={openNewslettersModal}
        startIcon={<AddIcon />}
      />
      <CustomModal
        open={open}
        handleClose={closeNewslettersModal}
        modalComponent={
          <AddEditNewslettersItem
            editedNewsletterItem={editedNewsletterItem}
            closeNewslettersModal={closeNewslettersModal}
            updateData={updateData}
            createData={createData}
          />
        }
      />
      <NewsletteraTable
        setEditedNewsletterItem={setEditedNewsletterItem}
        openNewslettersModal={openNewslettersModal}
        updateNewslettersData={updateData}
        newsletters={newsletters}
        deleteData={deleteData}
        successDeleting={successDeleting}
      />
    </Box>
  );
};

export default NewslettersPage;
