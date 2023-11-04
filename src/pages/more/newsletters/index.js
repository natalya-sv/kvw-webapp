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
import {
  useGetDataQuery,
  useUpdateDataMutation,
  useCreateDataMutation,
  useDeleteDataMutation,
} from "../../../services/api";
import { NEWSLETTERS_GET, NEWSLETTERS_TAG } from "../../../APIData";
import CustomButton from "../../../components/CustomButton";
import AddIcon from "@mui/icons-material/Add";

const NewslettersPage = () => {
  const [open, setOpen] = useState(false);
  const [editedNewsletterItem, setEditedNewsletterItem] = useState(null);
  const {
    data: newsletters,
    isLoading,
    isError: errorFetching,
    error: fetchingErrorRes,
  } = useGetDataQuery({ fetchData: NEWSLETTERS_GET, tag: NEWSLETTERS_TAG });

  const [
    updateData,
    {
      isSuccess: successUpdating,
      isError: errorUpdating,
      error: updatingErrorRes,
    },
  ] = useUpdateDataMutation();

  const [createData] = useCreateDataMutation();
  const openNewslettersModal = () => {
    setOpen(true);
  };
  const [deleteData] = useDeleteDataMutation();

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
        closeNewslettersModal={closeNewslettersModal}
        openNewslettersModal={openNewslettersModal}
        updateNewslettersData={updateData}
        newsletters={newsletters}
        deleteData={deleteData}
      />
    </Box>
  );
};

export default NewslettersPage;
