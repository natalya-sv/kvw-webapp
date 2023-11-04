import { useEffect, useState } from "react";
import AlertNotification from "../../components/UI/AlertNotification";
import SpinnerView from "../../components/UI/SpinnerView";
import Title from "../../components/UI//Title";
import { COUNTDOWN, COUNTDOWN_DESC } from "./constants";
import { SAVE } from "../../helpers/constants";
import { END_DATE, START_DATE, EVENT_TITLE } from "./constants";
import PageDescription from "../../components/UI/PageDescription";
import { Stack, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextInput from "../../components/TextInput";
import CustomButton from "../../components/CustomButton";
import "dayjs/locale/nl";
import CustomDatePicker from "../../components/UI/pickers/CustomDatePicker";
import { useGetDataQuery, useUpdateDataMutation } from "../../services/api";
import { COUNTDOWN_ACTIONS, COUNTDOWN_GET, COUNTDOWN_TAG } from "../../APIData";

const CountDownPage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");
  const {
    isLoading,
    data: countdown,
    isError: errorFetching,
    error: fetchingErrorRes,
  } = useGetDataQuery({ fetchData: COUNTDOWN_GET, tag: COUNTDOWN_TAG });
  const [updateData, { isSuccess: successUpdating, isError: errorUpdating }] =
    useUpdateDataMutation();

  useEffect(() => {
    if (countdown && countdown[0]) {
      setTitle(countdown[0].event_title);
      setStartDate(countdown[0].start_date);
      setEndDate(countdown[0].end_date);
    }
  }, [countdown]);

  const submitHandler = () => {
    const startDateUpd =
      typeof startDate === "string"
        ? startDate
        : startDate.format("YYYY-MM-DD");
    const endDateUpd =
      typeof endDate === "string" ? endDate : endDate.format("YYYY-MM-DD");

    const countdownData = {
      id: countdown[0].id,
      event_title: title,
      start_date: startDateUpd,
      end_date: endDateUpd,
    };
    updateData({
      updatedItem: countdownData,
      actions: COUNTDOWN_ACTIONS,
      tag: COUNTDOWN_TAG,
    });
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
      <AlertNotification
        errorFetching={errorFetching}
        errorUpdating={errorUpdating}
        successUpdating={successUpdating}
        subMessage={fetchingErrorRes?.message ?? ""}
      />

      <Title title={COUNTDOWN} />
      <PageDescription text={COUNTDOWN_DESC} />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"nl"}>
        <Stack
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <CustomDatePicker
            label={START_DATE}
            format={"DD/MM/YYYY"}
            value={startDate}
            onChange={setStartDate}
          />
          <CustomDatePicker
            label={END_DATE}
            format={"DD/MM/YYYY"}
            value={endDate}
            onChange={setEndDate}
          />
        </Stack>
      </LocalizationProvider>

      <Box style={{ marginBottom: 10, marginTop: 20, width: "70%" }}>
        <TextInput
          fullWidth={true}
          label={EVENT_TITLE}
          value={title}
          onChange={setTitle}
        />
      </Box>
      <CustomButton title={SAVE} onClick={submitHandler} />
    </Box>
  );
};

export default CountDownPage;
