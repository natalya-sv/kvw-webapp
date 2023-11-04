import React, { useState } from "react";
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
import {
  useCreateDataMutation,
  useDeleteDataMutation,
  useGetDataQuery,
  useUpdateDataMutation,
} from "../../services/api";
import {
  DAYS_TAG,
  DAY_GET,
  GROUPS_GET,
  GROUPS_TAG,
  SPONSORS_GET,
  SPONSORS_TAG,
} from "../../APIData";

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
  } = useGetDataQuery({ fetchData: GROUPS_GET, tag: GROUPS_TAG });

  const { data: days } = useGetDataQuery({
    fetchData: DAY_GET,
    tag: DAYS_TAG,
  });

  const { data: sponsors } = useGetDataQuery({
    fetchData: SPONSORS_GET,
    tag: SPONSORS_TAG,
  });

  const [updateData] = useUpdateDataMutation();
  const [deleteData] = useDeleteDataMutation();
  const [createData] = useCreateDataMutation();

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
            updateData={updateData}
            createData={createData}
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
            updateData={updateData}
            createData={createData}
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
        deleteData={deleteData}
      />
    </Box>
  );
};
export default SchedulePage;
