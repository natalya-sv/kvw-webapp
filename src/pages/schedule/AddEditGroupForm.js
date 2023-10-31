import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SAVE } from "../../helpers/constants";
import { GROUP_NAME } from "./constants";
import CustomButton from "../../components/CustomButton";
import TextInput from "../../components/TextInput";
import {
  addNewGroupItem,
  updateGroupName,
} from "../../store/schedule/schedule-actions";
import { useDispatch } from "react-redux";

const AddEditGroupForm = ({ selectedGroupName, handleClose }) => {
  const [groupName, setGroupName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedGroupName) {
      setGroupName(selectedGroupName.groupName);
    }
  }, [selectedGroupName]);

  const submitHandler = (e) => {
    e.preventDefault();
    const group = {
      group_name: groupName,
    };
    if (selectedGroupName) {
      const updatedGroup = {
        ...group,
        id: selectedGroupName.id,
      };
      dispatch(updateGroupName(updatedGroup));
    } else {
      dispatch(addNewGroupItem(group));
    }
    handleClose();
  };

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <TextInput
        id="group_name"
        value={groupName}
        label={GROUP_NAME}
        onChange={setGroupName}
      />
      <CustomButton
        title={SAVE}
        onClick={submitHandler}
        disabled={groupName === ""}
      />
    </Box>
  );
};

export default AddEditGroupForm;
