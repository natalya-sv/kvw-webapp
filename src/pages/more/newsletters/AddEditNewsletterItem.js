import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TextInput from "../../../components/TextInput";
import CustomButton from "../../../components/CustomButton";
import {
  addNewsletterItem,
  editNewsletterItem,
} from "../../../store/newsletters/newsletters-actions";
import { NEWSLETTERS_LINK, NEWSLETTERS_TITLE, SENT_ON } from "./constants";
import { SAVE } from "../../../helpers/constants";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/nl";
import CustomDatePicker from "../../../components/UI/pickers/CustomDatePicker";

const AddEditNewslettersItem = ({
  editedNewsletterItem,
  closeNewslettersModal,
}) => {
  const [newsLetterTitle, setNewsletterTitle] = useState("");
  const [newsletterLink, setNewsletterLink] = useState("");
  const [dateSent, setDateSent] = useState(dayjs());
  const dispatch = useDispatch();

  useEffect(() => {
    if (editedNewsletterItem) {
      const d = editedNewsletterItem.date;
      const dateFormatted = dayjs(d).format("YYYY-MM-DD");
      setNewsletterLink(editedNewsletterItem.newsletterLink);
      setNewsletterTitle(editedNewsletterItem.title);
      setDateSent(dateFormatted);
    }
  }, [editedNewsletterItem]);

  const submitHandler = () => {
    const dateValue =
      typeof dateSent === "string" ? dateSent : dateSent.format("YYYY-MM-DD");

    const newsletterItem = {
      title: newsLetterTitle,
      newsletter_link: newsletterLink,
      date: dateValue,
    };
    if (editedNewsletterItem) {
      const updatedItem = {
        ...newsletterItem,
        id: editedNewsletterItem.id,
      };
      dispatch(editNewsletterItem(updatedItem));
    } else {
      dispatch(addNewsletterItem(newsletterItem));
    }
    closeNewslettersModal();
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
      <TextInput
        id="newsletter-title"
        value={newsLetterTitle}
        onChange={setNewsletterTitle}
        label={NEWSLETTERS_TITLE}
      />
      <TextInput
        id="newsletter-link"
        value={newsletterLink}
        onChange={setNewsletterLink}
        label={NEWSLETTERS_LINK}
      />
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"nl"}>
          <CustomDatePicker
            label={SENT_ON}
            format="DD/MM/YYYY"
            value={dateSent}
            onChange={setDateSent}
          />
        </LocalizationProvider>
      </Box>
      <CustomButton
        disabled={newsletterLink === "" || newsLetterTitle === ""}
        onClick={submitHandler}
        title={SAVE}
      />
    </Box>
  );
};
export default AddEditNewslettersItem;
