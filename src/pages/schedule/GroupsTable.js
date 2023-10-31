import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  DAY_SCHEDULE,
  NO_GROUPS_YET,
  groupsTableDefinition,
  subRowItemsDefinition,
} from "./constants";
import { useMemo } from "react";
import {
  removeDays,
  removeDayItem,
  removeGroups,
} from "../../store/schedule/schedule-actions";
import CollapsableTable from "../../components/table/CollapsableTable";
const GroupsTable = (props) => {
  const { groups, days } = useSelector((state) => state.schedule);
  const dispatch = useDispatch();
  const { sponsors } = useSelector((state) => state.sponsors);

  const mergedDaysAndGroups = useMemo(() => {
    if (groups && sponsors && days) {
      const updGroups = groups.map((group) => {
        const groupSchedule = days
          .filter((day) => day.groupId === group.id)
          .map((d) => {
            const sponsorsNames = sponsors
              .filter((sp) => d.sponsors.includes(sp.id))
              .map((sp) => sp.sponsorName);
            return {
              ...d,
              namedSponsors: sponsorsNames,
            };
          });
        return {
          ...group,
          weekSchedule: [...groupSchedule],
          days: groupSchedule.length,
        };
      });
      return updGroups;
    }
    return [];
  }, [groups, days, sponsors]);

  const handleEditGroupName = (groupId) => {
    const groupToEdit = groups.find((gr) => gr.id === groupId);
    if (groupToEdit?.id) {
      props.setSelectedGroupName(groupToEdit);
      props.handleOpenGroupNameModal();
    }
  };

  //delete groups and days that belong to these groups
  const handleRemoveGroups = (idsToRemove) => {
    const deleteAllGroups = groups.length === idsToRemove.length;

    if (deleteAllGroups) {
      dispatch(removeGroups(idsToRemove, true));
      const daysToRemove = days.map((day) => day.id);
      dispatch(removeDays(daysToRemove, true));
    } else {
      const dayIds = days
        .filter((day) => idsToRemove.includes(day.groupId))
        .map((d) => d.id);

      dispatch(removeGroups(idsToRemove, false));
      dispatch(removeDays(dayIds, false));
    }
  };

  const handleEditDay = (dayId, groupId) => {
    props.setSelectedGroupId(groupId);
    const day = days.find((day) => day.id === dayId);
    if (day) {
      props.setSelectedDay(day);
      props.handleOpenAddEditDayDialog();
    }
  };

  const handleAddNewDay = (groupId) => {
    props.setSelectedGroupId(groupId);
    props.handleOpenAddEditDayDialog();
  };

  const handleRemoveDay = (dayToDelete) => {
    dispatch(removeDayItem(dayToDelete));
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
