import { Typography } from "@mui/material";
import {
  DAY_SCHEDULE,
  NO_GROUPS_YET,
  groupsTableDefinition,
  subRowItemsDefinition,
} from "./constants";
import { useMemo } from "react";
import {
  GROUPS_ACTIONS,
  GROUPS_TAG,
  DAYS_TAG,
  DAYS_ACTIONS,
} from "../../APIData";
import MainTable from "../../components/table/MainTable";

const GroupsTable = ({
  groups,
  days,
  sponsors,
  setSelectedGroup,
  handleOpenGroupNameModal,
  setSelectedGroupId,
  setSelectedDay,
  handleOpenAddEditDayDialog,
  deleteData,
  successUpdating,
}) => {
  const mergedDaysAndGroups = useMemo(() => {
    if (groups && sponsors && days) {
      const updGroups = groups.map((group) => {
        const groupSchedule = days
          .filter((d) => d.group_id === group.id)
          .map((day) => {
            const sponsorsNames = sponsors
              .filter((sp) => day.day_sponsors?.includes(sp.id))
              .map((sp) => sp.sponsorName);
            return {
              id: day.id,
              date: day.date,
              startTime: day.start_time,
              endTime: day.end_time,
              programma: day.programma,
              extraInfo: day.extra_info,
              startLocation: day.start_location,
              endLocation: day.end_location,
              videoTitle: day.video_title,
              videoUrl: day.video_url,
              groupId: day.group_id,
              sponsors: day.day_sponsors,
              namedSponsors: sponsorsNames,
            };
          });
        return {
          id: group.id,
          groupName: group.group_name,
          weekSchedule: [...groupSchedule],
          days: groupSchedule.length,
        };
      });
      return updGroups;
    }
    return [];
  }, [groups, days, sponsors]);

  const handleEditGroupName = (groupId) => {
    const groupToEdit = mergedDaysAndGroups.find((gr) => gr.id === groupId);
    if (groupToEdit) {
      setSelectedGroup(groupToEdit);
      handleOpenGroupNameModal();
    }
  };

  const handleRemoveGroups = (idsToRemove) => {
    deleteData({
      deletedItems: idsToRemove,
      tag: GROUPS_TAG,
      actions: GROUPS_ACTIONS,
    });
  };

  const handleEditDay = (dayId, groupId) => {
    const group = mergedDaysAndGroups.find((gr) => gr.id === groupId);
    const day = group.weekSchedule.find((day) => day.id === dayId);
    if (day) {
      setSelectedGroupId(groupId);
      setSelectedDay(day);
      handleOpenAddEditDayDialog();
    }
  };

  const handleAddNewDay = (groupId) => {
    setSelectedGroupId(groupId);
    handleOpenAddEditDayDialog();
  };

  const handleRemoveDay = (dayToDelete) => {
    deleteData({
      deletedItems: [dayToDelete],
      tag: DAYS_TAG,
      actions: DAYS_ACTIONS,
    });
  };

  return mergedDaysAndGroups && mergedDaysAndGroups.length > 0 ? (
    <MainTable
      items={mergedDaysAndGroups}
      tableDefinition={groupsTableDefinition}
      onRemoveItems={handleRemoveGroups}
      onEditItem={handleEditGroupName}
      subRowItemsDefinition={subRowItemsDefinition}
      subTableTitle={DAY_SCHEDULE}
      subTableListName={"weekSchedule"}
      onAddNewSubRowItem={handleAddNewDay}
      onEditSubRowItem={handleEditDay}
      onRemoveSubRowItem={handleRemoveDay}
      successUpdating={successUpdating}
    />
  ) : (
    <Typography>{NO_GROUPS_YET}</Typography>
  );
};
export default GroupsTable;
