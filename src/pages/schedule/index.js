import React, { useMemo, useState } from "react";
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
  DAYS_TAG,
  DAY_GET,
  GROUPS_GET,
  GROUPS_TAG,
  SCHEDULE_BOOK_GET,
  SCHEDULE_BOOK_TAG,
  SPONSORS_GET,
  SPONSORS_TAG,
} from "../../APIData";
import useCustomDataQuery from "../../useCustomDataQuery";
import AddEditScheduleBookLink from "./AddEditScheduleBook";

const SchedulePage = () => {
  const [open, setOpen] = useState(false);
  const [openAddEditDayDialog, setOpenAddEditDayDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const {
    data: groups,
    fetchingData: fetchingGroups,
    isError: groupsError,
    successCreating: groupsSuccessCreating,
    successUpdating: groupsSuccessUpdating,
    successDeleting: groupsSuccessDeleting,
    isLoading: groupsLoading,
    errorMessage: groupsErrorMessage,
    updateData,
    createData,
    deleteData,
  } = useCustomDataQuery({ fetchData: GROUPS_GET, tag: GROUPS_TAG });

  const {
    data: days,
    fetchingData: fetchingDays,
    isError: daysError,
    successCreating: daysSuccessCreating,
    successUpdating: daysSuccessUpdating,
    successDeleting: daysSuccessDeleting,
    isLoading: daysLoading,
    errorMessage: daysErrorMessage,
  } = useCustomDataQuery({
    fetchData: DAY_GET,
    tag: DAYS_TAG,
  });

  const { data: sponsors } = useCustomDataQuery({
    fetchData: SPONSORS_GET,
    tag: SPONSORS_TAG,
  });
  const {
    data: scheduleBook,
    isError: scheduleBookError,
    isSuccess: scheduleBookSuccessUpdating,
    error: scheduleBookErrorMessage,
  } = useCustomDataQuery({
    fetchData: SCHEDULE_BOOK_GET,
    tag: SCHEDULE_BOOK_TAG,
  });

  const errMessage =
    groupsErrorMessage || daysErrorMessage || scheduleBookErrorMessage;

  const isError = scheduleBookError || daysError || groupsError;

  const handleOpenGroupNameModal = () => {
    setOpen(true);
  };
  const handleCloseGroupNameModal = () => {
    if (selectedGroup) {
      setSelectedGroup(null);
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

  const transformedSponsors = useMemo(() => {
    if (sponsors && sponsors.length > 0) {
      return sponsors
        .filter((sp) => sp.active)
        .map((sponsor) => {
          return {
            id: sponsor.id,
            sponsorName: sponsor.sponsor_name,
            sponsorType: sponsor.sponsor_type,
            imageUrl: sponsor.image_url,
            active: sponsor.active,
            website_url: sponsor.website_url,
          };
        });
    }
    return [];
  }, [sponsors]);

  if (fetchingGroups || fetchingDays) {
    return <SpinnerView />;
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100%"}
    >
      {(groupsLoading || daysLoading) && <SpinnerView />}

      <AlertNotification
        isError={isError}
        isSuccessCreating={groupsSuccessCreating || daysSuccessCreating}
        isSuccessDeleting={groupsSuccessDeleting || daysSuccessDeleting}
        isSuccessUpdating={
          groupsSuccessUpdating ||
          daysSuccessUpdating ||
          scheduleBookSuccessUpdating
        }
        errorMessage={errMessage}
      />

      <Title title={GROUPS} />
      <AddEditScheduleBookLink
        scheduleBook={scheduleBook}
        updateData={updateData}
      />
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
            selectedGroupName={selectedGroup}
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
            sponsors={transformedSponsors}
          />
        }
      />
      <GroupsTable
        handleOpenGroupNameModal={handleOpenGroupNameModal}
        setSelectedGroup={setSelectedGroup}
        setSelectedGroupId={setSelectedGroupId}
        handleOpenAddEditDayDialog={handleOpenAddEditDayDialog}
        setSelectedDay={setSelectedDay}
        groups={groups}
        days={days}
        sponsors={transformedSponsors}
        deleteData={deleteData}
        successDeleting={groupsSuccessDeleting}
      />
    </Box>
  );
};
export default SchedulePage;
