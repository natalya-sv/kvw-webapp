import { useState } from "react";
import SpinnerView from "../../../components/UI/SpinnerView";
import { Box } from "@mui/material";
import AlertNotification from "../../../components/UI/AlertNotification";
import Title from "../../../components/UI/Title";
import PageDescription from "../../../components/UI/PageDescription";
import AddEditNewslettersItem from "./AddEditNewsletterItem";
import CustomModal from "../../../components/CustomModal";
import NewsletteraTable from "./NewslettersTable";
import { NEWSLETTERS, NEWSLETTERS_DESC } from "./constants";
import {
  useGetNewslettersQuery,
  useUpdateNewslettersDataMutation,
} from "../../../services/newsletters";

const NewslettersPage = () => {
  const [open, setOpen] = useState(false);
  const [editedNewsletterItem, setEditedNewsletterItem] = useState(null);
  const {
    data: newsletters,
    isLoading,
    isError: errorFetching,
    error: fetchingErrorRes,
  } = useGetNewslettersQuery();
  const [
    updateNewslettersData,
    {
      isSuccess: successUpdating,
      isError: errorUpdating,
      error: updatingErrorRes,
    },
  ] = useUpdateNewslettersDataMutation();
  const openNewslettersModal = () => {
    setOpen(true);
  };

  const closeNewslettersModal = () => {
    setEditedNewsletterItem(null);
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
      style={{ width: "100%" }}
    >
      <AlertNotification
        errorFetching={errorFetching}
        errorUpdating={errorUpdating}
        successUpdating={successUpdating}
        subMessage={
          fetchingErrorRes?.message ?? updatingErrorRes?.message ?? ""
        }
      />

      <Title title={NEWSLETTERS} />
      <PageDescription text={NEWSLETTERS_DESC} />
      <Box style={{ width: "90%" }}>
        <AddEditNewslettersItem
          closeNewslettersModal={closeNewslettersModal}
          updateNewslettersData={updateNewslettersData}
        />
      </Box>
      <CustomModal
        open={open}
        handleClose={closeNewslettersModal}
        modalComponent={
          <AddEditNewslettersItem
            editedNewsletterItem={editedNewsletterItem}
            closeNewslettersModal={closeNewslettersModal}
            updateNewslettersData={updateNewslettersData}
          />
        }
      />
      <NewsletteraTable
        setEditedNewsletterItem={setEditedNewsletterItem}
        closeNewslettersModal={closeNewslettersModal}
        openNewslettersModal={openNewslettersModal}
        updateNewslettersData={updateNewslettersData}
        newsletters={newsletters}
      />
    </Box>
  );
};

export default NewslettersPage;
