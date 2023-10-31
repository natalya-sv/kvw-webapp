import React, { useEffect } from "react";
import KVWForm from "./KVWForm.js";
import Title from "../../components/UI/Title";
import SpinnerView from "../../components/UI/SpinnerView";
import { useSelector, useDispatch } from "react-redux";
import { fetchKVWData } from "../../store/kvw/kvw-actions";
import AlertNotification from "../../components/UI/AlertNotification";
import { KVW_DESC, KVW_INFO } from "./constants";
import PageDescription from "../../components/UI/PageDescription";
import { Box } from "@mui/material";

const KVWPage = () => {
  const { isLoading } = useSelector((state) => state.kvwData);
  const { notification } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchKVWData());
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
      <Title title={KVW_INFO} />
      <PageDescription text={KVW_DESC} />
      <KVWForm />
    </Box>
  );
};

export default KVWPage;
