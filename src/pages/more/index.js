import Title from "../../components/UI/Title";
import React, { useEffect } from "react";
import PageDescription from "../../components/UI/PageDescription";
import { MORE_PAGE_DESCRIPTION, MORE_PAGE_TITLE } from "./constants";
import MoreForm from "./MoreForm";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import AlertNotification from "../../components/UI/AlertNotification";
import SpinnerView from "../../components/UI/SpinnerView";
import { fetchMoreData } from "../../store/more/more-actions";

const MorePage = () => {
  const { moreInfo, isLoading } = useSelector((state) => state.moreData);
  const { notification } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoreData());
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

      <Title title={MORE_PAGE_TITLE} />
      <PageDescription text={MORE_PAGE_DESCRIPTION} />

      <Box
        style={{
          width: "90%",
        }}
      >
        <MoreForm moreData={moreInfo} />
      </Box>
    </Box>
  );
};
export default MorePage;
