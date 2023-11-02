import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import PageDescription from "../../components/UI/PageDescription";
import Title from "../../components/UI/Title";
import { Box } from "@mui/material";
import AlertNotification from "../../components/UI/AlertNotification";
import SpinnerView from "../../components/UI/SpinnerView";
import GroupsTable from "./GroupsTable";
import {
  ADD_DAY,
  ADD_NEW_GROUP,
  EDIT_DAY,
  GROUPS,
  GROUPS_DESC,
} from "./constants";
import AddEditGroupForm from "./AddEditGroupForm";
import AddEditDayForm from "./AddEditDayForm";
import CustomModal from "../../components/CustomModal";
import CustomDialog from "../../components/CustomDialog";
import CustomButton from "../../components/CustomButton";
import { useGetDaysQuery, useGetGroupsQuery } from "../../services/schedule";
import { useGetSponsorsQuery } from "../../services/sponsors";

const SchedulePage = () => {
  const [open, setOpen] = useState(false);
  const [openAddEditDayDialog, setOpenAddEditDayDialog] = useState(false);
  const [selectedGroupName, setSelectedGroupName] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const {
    data: groups,
    isError: errorFetching,
    error: fetchingErrorRes,
    isLoading,
  } = useGetGroupsQuery();
  const { data: days } = useGetDaysQuery();
  const { data: sponsors } = useGetSponsorsQuery();
  const handleOpenGroupNameModal = () => {
    setOpen(true);
  };
  const handleCloseGroupNameModal = () => {
    if (selectedGroupName) {
      setSelectedGroupName(null);
    }
    setOpen(false);
  };

  const handleOpenAddEditDayDialog = () => {
    setOpenAddEditDayDialog(true);
  };

  const handleCloseAddEditDayDialog = () => {
    setSelectedDay(null);
    setOpenAddEditDayDialog(false);
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
      {/* <AlertNotification /> */}

      <Title title={GROUPS} />
      <PageDescription text={GROUPS_DESC} />

      <CustomButton
        title={ADD_NEW_GROUP}
        onClick={handleOpenGroupNameModal}
        startIcon={<AddIcon />}
      />

      <CustomModal
        open={open}
        handleClose={handleCloseGroupNameModal}
        modalComponent={
          <AddEditGroupForm
            selectedGroupName={selectedGroupName}
            handleClose={handleCloseGroupNameModal}
          />
        }
      />
      <CustomDialog
        openDialog={openAddEditDayDialog}
        handleCloseDialog={handleCloseAddEditDayDialog}
        title={selectedDay ? EDIT_DAY : ADD_DAY}
        component={
          <AddEditDayForm
            selectedDay={selectedDay}
            selectedGroupId={selectedGroupId}
            handleCloseAddEditDayDialog={handleCloseAddEditDayDialog}
          />
        }
      />

      <GroupsTable
        handleOpenGroupNameModal={handleOpenGroupNameModal}
        setSelectedGroupName={setSelectedGroupName}
        setSelectedGroupId={setSelectedGroupId}
        handleOpenAddEditDayDialog={handleOpenAddEditDayDialog}
        setSelectedDay={setSelectedDay}
        groups={groups}
        days={days}
        sponsors={sponsors}
      />
    </Box>
  );
};
export default SchedulePage;
