import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpinnerView from "../../../components/UI/SpinnerView";
import { Box } from "@mui/material";
import AlertNotification from "../../../components/UI/AlertNotification";
import Title from "../../../components/UI/Title";
import PageDescription from "../../../components/UI/PageDescription";
import { fetchNewsletters } from "../../../store/newsletters/newsletters-actions";
import AddEditNewslettersItem from "./AddEditNewsletterItem";
import CustomModal from "../../../components/CustomModal";
import NewsletteraTable from "./NewslettersTable";
import { NEWSLETTERS, NEWSLETTERS_DESC } from "./constants";

const NewslettersPage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.newsletters);
  const { notification } = useSelector((state) => state.notification);
  const [open, setOpen] = useState(false);
  const [editedNewsletterItem, setEditedNewsletterItem] = useState(null);

  const openNewslettersModal = () => {
    setOpen(true);
  };

  const closeNewslettersModal = () => {
    setEditedNewsletterItem(null);
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchNewsletters());
  }, [dispatch]);

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
      {notification?.isActive && (
        <AlertNotification notification={notification} />
      )}
      <Title title={NEWSLETTERS} />
      <PageDescription text={NEWSLETTERS_DESC} />
      <Box style={{ width: "90%" }}>
        <AddEditNewslettersItem closeNewslettersModal={closeNewslettersModal} />
      </Box>
      <CustomModal
        open={open}
        handleClose={closeNewslettersModal}
        modalComponent={
          <AddEditNewslettersItem
            editedNewsletterItem={editedNewsletterItem}
            closeNewslettersModal={closeNewslettersModal}
          />
        }
      />
      <NewsletteraTable
        setEditedNewsletterItem={setEditedNewsletterItem}
        closeNewslettersModal={closeNewslettersModal}
        openNewslettersModal={openNewslettersModal}
      />
    </Box>
  );
};

export default NewslettersPage;
