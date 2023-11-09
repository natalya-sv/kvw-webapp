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
import {} from "../../services/api";
import { NEWS_GET, NEWS_TAG } from "../../APIData";
import useCustomDataQuery from "../../useCustomDataQuery";

const NewsPage = () => {
  const [editedNewsItem, setEditedNewsItem] = useState(null);
  const [open, setOpen] = useState(false);

  const {
    data: news,
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
  } = useCustomDataQuery({ fetchData: NEWS_GET, tag: NEWS_TAG });

  const openNewsModal = () => {
    setOpen(true);
  };

  const closeNewsModal = () => {
    setEditedNewsItem(null);
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
      {(isError || successCreating || successUpdating || successDeleting) && (
        <AlertNotification
          isError={isError}
          isSuccess={successCreating || successUpdating || successDeleting}
          errorMessage={errorMessage}
        />
      )}
      <Title title={NEWS} />
      <PageDescription text={NEWS_DESC} />
      {isLoading && <SpinnerView />}
      <Box
        style={{
          width: "90%",
        }}
      >
        <AddEditNewsForm
          createData={createData}
          successCreating={successCreating}
          closeNewsModal={closeNewsModal}
        />
      </Box>
      <CustomModal
        open={open}
        handleClose={closeNewsModal}
        modalComponent={
          <AddEditNewsForm
            editedNewsItem={editedNewsItem}
            closeNewsModal={closeNewsModal}
            updateData={updateData}
            isLoading={isLoading}
          />
        }
      />
      <NewsTable
        setEditedNewsItem={setEditedNewsItem}
        closeNewsModal={closeNewsModal}
        openNewsModal={openNewsModal}
        deleteData={deleteData}
        news={news}
        successDeleting={successDeleting}
      />
    </Box>
  );
};

export default NewsPage;
