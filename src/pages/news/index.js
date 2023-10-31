import React, { useEffect, useState } from "react";
import AddEditNewsForm from "./AddEditNewsForm";
import Title from "../../components/UI/Title";
import { useSelector, useDispatch } from "react-redux";
import SpinnerView from "../../components/UI/SpinnerView";
import AlertNotification from "../../components/UI/AlertNotification";
import { fetchNewsItems } from "../../store/news/news-actions";
import { NEWS, NEWS_DESC } from "./constants";
import PageDescription from "../../components/UI/PageDescription";
import NewsTable from "./NewsTable";
import { Box } from "@mui/material";
import CustomModal from "../../components/CustomModal";

const NewsPage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.news);
  const { notification } = useSelector((state) => state.notification);
  const [editedNewsItem, setEditedNewsItem] = useState(null);
  const [open, setOpen] = useState(false);

  const openNewsModal = () => {
    setOpen(true);
  };

  const closeNewsModal = () => {
    setEditedNewsItem(null);
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchNewsItems());
  }, [dispatch]);

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
      {notification?.isActive && (
        <AlertNotification notification={notification} />
      )}

      <Title title={NEWS} />
      <PageDescription text={NEWS_DESC} />

      <Box
        style={{
          width: "90%",
        }}
      >
        <AddEditNewsForm />
      </Box>
      <CustomModal
        open={open}
        handleClose={closeNewsModal}
        modalComponent={
          <AddEditNewsForm
            editedNewsItem={editedNewsItem}
            closeNewsModal={closeNewsModal}
          />
        }
      />
      <NewsTable
        setEditedNewsItem={setEditedNewsItem}
        closeNewsModal={closeNewsModal}
        openNewsModal={openNewsModal}
      />
    </Box>
  );
};

export default NewsPage;
