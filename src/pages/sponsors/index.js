import React, { useEffect, useState } from "react";
import AddEditSponsorForm from "./AddEditSponsorForm";
import Title from "../../components/UI/Title";
import { useDispatch, useSelector } from "react-redux";
import { fetchSponsorsData } from "../../store/sponsors/sponsors-actions";
import AlertNotification from "../../components/UI/AlertNotification";
import SpinnerView from "../../components/UI/SpinnerView";
import { ALL_SPONSORS_DESC, SPONSORS } from "./constants";
import PageDescription from "../../components/UI/PageDescription";
import { Box } from "@mui/material";
import SponsorsTable from "./SponsorsTable";
import CustomModal from "../../components/CustomModal";

const SponsorsPage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.sponsors);
  const [open, setOpen] = useState(false);
  const [editedSponsor, setEditedSponsor] = useState(null);
  const { notification } = useSelector((state) => state.notification);

  const openSponsorsModal = () => {
    setOpen(true);
  };

  const closeSponsorsModal = () => {
    setEditedSponsor(null);
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchSponsorsData());
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
      <Title title={SPONSORS} />
      <PageDescription text={ALL_SPONSORS_DESC} />

      <Box style={{ width: "90%" }}>
        <AddEditSponsorForm closeSponsorsModal={closeSponsorsModal} />
      </Box>

      <CustomModal
        open={open}
        handleClose={closeSponsorsModal}
        modalComponent={
          <AddEditSponsorForm
            editedSponsor={editedSponsor}
            closeSponsorsModal={closeSponsorsModal}
          />
        }
      />

      <SponsorsTable
        setEditedSponsor={setEditedSponsor}
        closeSponsorsModal={closeSponsorsModal}
        openSponsorsModal={openSponsorsModal}
      />
    </Box>
  );
};
export default SponsorsPage;
