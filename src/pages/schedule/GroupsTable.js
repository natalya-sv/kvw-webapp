import { Typography } from "@mui/material";
import {
  DAY_SCHEDULE,
  NO_GROUPS_YET,
  groupsTableDefinition,
  subRowItemsDefinition,
} from "./constants";
import { useMemo } from "react";
import CollapsableTable from "../../components/table/CollapsableTable";
import {
  DAYS_ACTIONS,
  DAYS_TAG,
  GROUPS_ACTIONS,
  GROUPS_TAG,
} from "../../APIData";

const GroupsTable = ({
  groups,
  days,
  sponsors,
  setSelectedGroupName,
  handleOpenGroupNameModal,
  setSelectedGroupId,
  setSelectedDay,
  handleOpenAddEditDayDialog,
  deleteData,
}) => {
  const mergedDaysAndGroups = useMemo(() => {
    if (groups && sponsors && days) {
      const updGroups = groups.map((group) => {
        const groupSchedule = days
          .filter((d) => d.group_id === group.id)
          .map((day) => {
            const sponsorsNames = sponsors
              .filter((sp) => day.day_sponsors.includes(sp.id))
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

    if (groupToEdit?.id) {
      setSelectedGroupName(groupToEdit);
      handleOpenGroupNameModal();
    }
  };

  const handleRemoveGroups = (idsToRemove) => {
    deleteData({ data: idsToRemove, tag: GROUPS_TAG, actions: GROUPS_ACTIONS });
  };

  const handleEditDay = (dayId, groupId) => {
    setSelectedGroupId(groupId);
    const group = mergedDaysAndGroups.find((gr) => gr.id === groupId);
    const day = group.weekSchedule.find((day) => day.id === dayId);
    if (day) {
      setSelectedDay(day);
      handleOpenAddEditDayDialog();
    }
  };

  const handleAddNewDay = (groupId) => {
    setSelectedGroupId(groupId);
    handleOpenAddEditDayDialog();
  };

  const handleRemoveDay = (dayToDelete) => {
    deleteData({ data: dayToDelete, tag: DAYS_TAG, actions: DAYS_ACTIONS });
  };

  return groups.length > 0 ? (
    <CollapsableTable
      items={mergedDaysAndGroups}
      tableDefinition={groupsTableDefinition}
      buttons={["edit", "delete", "add"]}
      onRemoveItems={handleRemoveGroups}
      onEditItem={handleEditGroupName}
      subRowItemsDefinition={subRowItemsDefinition}
      subTableTitle={DAY_SCHEDULE}
      subTableListName={"weekSchedule"}
      onAddNewSubRowItem={handleAddNewDay}
      onEditSubRowItem={handleEditDay}
      onRemoveSubRowItem={handleRemoveDay}
    />
  ) : (
    <Typography>{NO_GROUPS_YET}</Typography>
  );
};
export default GroupsTable;
