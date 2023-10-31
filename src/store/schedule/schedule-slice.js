import { createSlice } from "@reduxjs/toolkit";

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    groups: [],
    days: [],
    isLoading: false,
  },

  reducers: {
    setGroupsAndDays(state, action) {
      const dayProgrammes = action.payload.days.map((day) => {
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
        };
      });
      const groupsCombined = action.payload.groups.map((gr) => {
        return {
          id: gr.id,
          groupName: gr.group_name,
          weekSchedule: [],
        };
      });
      state.groups = groupsCombined;
      state.days = dayProgrammes;
    },
    addNewGroup(state, action) {
      const { id, group_name } = action.payload.newGroup;
      const newGroup = {
        id: id,
        groupName: group_name,
        weekSchedule: [],
      };
      state.groups.push(newGroup);
    },

    updateGroup(state, action) {
      const { id, group_name } = action.payload;
      state.groups = state.groups.map((g) => {
        if (g.id === id) {
          return { ...g, groupName: group_name };
        }
        return g;
      });
    },
    removeGroup(state, action) {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload.id
      );
    },
    removeGroups(state, action) {
      const { deleteAll, ids } = action.payload;
      if (deleteAll) {
        state.groups = [];
      } else {
        state.groups = state.groups.filter((item) => !ids.includes(item.id));
      }
    },

    editDay(state, action) {
      const {
        id,
        date,
        start_time,
        end_time,
        programma,
        extra_info,
        start_location,
        end_location,
        group_id,
        day_sponsors,
      } = action.payload.editedDay;
      const updatedDay = {
        id: id,
        date: date,
        startTime: start_time,
        endTime: end_time,
        programma: programma,
        extraInfo: extra_info,
        startLocation: start_location,
        endLocation: end_location,
        groupId: group_id,
        sponsors: day_sponsors,
      };

      const index = state.days.findIndex((day) => day.id === updatedDay.id);
      if (index !== -1) {
        state.days[index] = updatedDay;
      }
    },
    removeDay(state, action) {
      state.days = state.days.filter((day) => day.id !== action.payload.id);
    },
    addNewDay(state, action) {
      const {
        id,
        start_time,
        end_time,
        date,
        programma,
        extra_info,
        start_location,
        end_location,
        group_id,
        day_sponsors,
      } = action.payload.newDay;
      const day = {
        id: id,
        date: date,
        startTime: start_time,
        endTime: end_time,
        programma: programma,
        extraInfo: extra_info,
        startLocation: start_location,
        endLocation: end_location,
        groupId: group_id,
        sponsors: day_sponsors,
      };
      state.days.push(day);
    },

    removeDays(state, action) {
      const { deleteAll, daysIds } = action.payload;
      if (deleteAll) {
        state.days = [];
      } else {
        state.days = state.days.filter((day) => !daysIds.includes(day.id));
      }
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const scheduleActions = scheduleSlice.actions;
export default scheduleSlice;
