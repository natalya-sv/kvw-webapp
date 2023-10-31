import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DATE, SAVE } from "../../helpers/constants";
import SponsorsCheckboxList from "./SponsorsCheckBoxList";
import {
  END_LOCATION,
  END_TIME,
  EXTRA,
  PROGRAMMA,
  START_LOCATION,
  START_TIME,
} from "./constants";
import CustomButton from "../../components/CustomButton";
import TextInput from "../../components/TextInput";
import { useDispatch } from "react-redux";
import { addNewDay, editDay } from "../../store/schedule/schedule-actions";
import "dayjs/locale/nl";
import CustomDatePicker from "../../components/UI/pickers/CustomDatePicker";
import CustomTimePicker from "../../components/UI/pickers/CustomTimePicker";

const AddEditDayForm = ({
  selectedDay,
  handleCloseAddEditDayDialog,
  selectedGroupId,
}) => {
  const [programma, setProgramma] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [date, setDate] = useState(dayjs());
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const [selectedDaySponsors, setSelectedDaySponsors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedDay) {
      const d = selectedDay.date;
      const dateFormatted = dayjs(d).format("YYYY-MM-DD");
      const stTime = dayjs(selectedDay.startTime, "HH:mm");
      const enTime = dayjs(selectedDay.endTime, "HH:mm");
      setProgramma(selectedDay.programma);
      setExtraInfo(selectedDay.extraInfo);
      setStartLocation(selectedDay.startLocation);
      setEndLocation(selectedDay.endLocation);
      setDate(dateFormatted);
      setStartTime(stTime);
      setEndTime(enTime);
      setSelectedDaySponsors(selectedDay.sponsors);
    }
  }, [selectedDay]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const dateValue =
      typeof date === "string" ? date : date.format("YYYY-MM-DD");
    const formattedStartTime = startTime.format("HH:mm");
    const formattedEndTime = endTime.format("HH:mm");

    const day = {
      programma: programma,
      extra_info: extraInfo,
      date: dateValue,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
      start_location: startLocation,
      end_location: endLocation,
      day_sponsors: selectedDaySponsors,
      group_id: selectedGroupId,
    };

    if (selectedDay) {
      const updatedDay = {
        ...day,
        id: selectedDay.id,
      };

      dispatch(editDay(updatedDay));
    } else {
      dispatch(addNewDay(day));
    }

    handleCloseAddEditDayDialog();
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={"20px 10px"}
      style={{
        width: "100%",
        padding: 20,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"nl"}>
        <Stack
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            gap: "10px 0px",
          }}
        >
          <CustomDatePicker
            label={DATE}
            format="DD/MM/YYYY"
            value={date}
            onChange={setDate}
          />
          <CustomTimePicker
            label={START_TIME}
            value={startTime}
            onChange={setStartTime}
          />
          <CustomTimePicker
            label={END_TIME}
            value={endTime}
            onChange={setEndTime}
          />
        </Stack>
      </LocalizationProvider>
      <TextInput
        id="programma"
        value={programma}
        label={PROGRAMMA}
        onChange={setProgramma}
      />
      <TextInput
        id="extraInfo"
        value={extraInfo}
        label={EXTRA}
        multiline={true}
        onChange={setExtraInfo}
      />

      <TextInput
        id="startLocation"
        value={startLocation}
        label={START_LOCATION}
        onChange={setStartLocation}
      />
      <TextInput
        id="endLocation"
        value={endLocation}
        label={END_LOCATION}
        onChange={setEndLocation}
      />

      <SponsorsCheckboxList
        setSelectedDaySponsors={setSelectedDaySponsors}
        selectedDaySponsors={selectedDaySponsors}
      />

      <CustomButton title={SAVE} onClick={onSubmitHandler} />
    </Box>
  );
};

export default AddEditDayForm;
