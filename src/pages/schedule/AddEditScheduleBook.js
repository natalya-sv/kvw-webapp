import { Box } from "@mui/material";
import TextInput from "../../components/TextInput";
import { SCHEDULE_BOOK_ACTIONS, SCHEDULE_BOOK_TAG } from "../../APIData";
import { SAVE } from "../../helpers/constants";
import { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { SCHEDULE_BOOK_URL } from "./constants";

const AddEditScheduleBookLink = ({ updateData, scheduleBook }) => {
  const [scheduleBookUrl, setScheduleBookUrl] = useState("");

  useEffect(() => {
    if (scheduleBook) {
      const url = scheduleBook[0].schedule_book_url;
      setScheduleBookUrl(url);
    }
  }, [scheduleBook]);

  const handleScheduleBookUpdate = () => {
    updateData({
      updatedItem: {
        id: scheduleBook[0].id,
        schedule_book_url: scheduleBookUrl,
      },
      actions: SCHEDULE_BOOK_ACTIONS,
      tag: SCHEDULE_BOOK_TAG,
    });
  };
  return (
    <Box display="flex" flexDirection="column" width={"90%"} margin={5}>
      <TextInput
        id="books"
        fullWidth={true}
        value={scheduleBookUrl}
        label={SCHEDULE_BOOK_URL}
        onChange={setScheduleBookUrl}
      />

      <CustomButton title={SAVE} onClick={handleScheduleBookUpdate} />
    </Box>
  );
};

export default AddEditScheduleBookLink;
