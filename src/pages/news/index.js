import React, { useState } from "react";
import AddEditNewsForm from "./AddEditNewsForm";
import Title from "../../components/UI/Title";
import SpinnerView from "../../components/UI/SpinnerView";
import AlertNotification from "../../components/UI/AlertNotification";
import { NEWS, NEWS_DESC } from "./constants";
import PageDescription from "../../components/UI/PageDescription";
import NewsTable from "./NewsTable";
import { Box } from "@mui/material";
import CustomModal from "../../components/CustomModal";
import {
  useCreateDataMutation,
  useDeleteDataMutation,
  useGetDataQuery,
  useUpdateDataMutation,
} from "../../services/api";
import { NEWS_GET, NEWS_TAG } from "../../APIData";

const NewsPage = () => {
  const [editedNewsItem, setEditedNewsItem] = useState(null);
  const [open, setOpen] = useState(false);
  const {
    data: news,
    isLoading,
    isError: errorFetching,
    error: fetchingErrorRes,
  } = useGetDataQuery({ fetchData: NEWS_GET, tag: NEWS_TAG });

  const [
    updateData,
    {
      isSuccess: successUpdating,
      isError: errorUpdating,
      error: updatingErrorRes,
    },
  ] = useUpdateDataMutation();
  const [createData] = useCreateDataMutation();
  const [deleteData] = useDeleteDataMutation();

  const openNewsModal = () => {
    setOpen(true);
  };

  const closeNewsModal = () => {
    setEditedNewsItem(null);
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
      <Title title={NEWS} />
      <PageDescription text={NEWS_DESC} />

      <Box
        style={{
          width: "90%",
        }}
      >
        <AddEditNewsForm createData={createData} />
      </Box>
      <CustomModal
        open={open}
        handleClose={closeNewsModal}
        modalComponent={
          <AddEditNewsForm
            editedNewsItem={editedNewsItem}
            closeNewsModal={closeNewsModal}
            updateData={updateData}
          />
        }
      />
      <NewsTable
        setEditedNewsItem={setEditedNewsItem}
        closeNewsModal={closeNewsModal}
        openNewsModal={openNewsModal}
        deleteData={deleteData}
        news={news}
      />
    </Box>
  );
};

export default NewsPage;
