import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SAVE } from "../../helpers/constants";
import { GROUP_NAME } from "./constants";
import CustomButton from "../../components/CustomButton";
import TextInput from "../../components/TextInput";
import { GROUP_TYPE, SCHEDULE_ACTIONS, SCHEDULE_TAG } from "../../APIData";

const AddEditGroupForm = ({
  selectedGroupName,
  handleClose,
  createData,
  updateData,
}) => {
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    if (selectedGroupName) {
      setGroupName(selectedGroupName.groupName);
    }
  }, [selectedGroupName]);

  const handleGroup = () => {
    const group = {
      group_name: groupName,
    };
    if (selectedGroupName) {
      const updatedGroup = {
        ...group,
        id: selectedGroupName.id,
      };
      updateData({
        updatedItem: { item: updatedGroup, type: GROUP_TYPE },
        actions: SCHEDULE_ACTIONS,
        tag: SCHEDULE_TAG,
      });
    } else {
      createData({
        newItem: { item: group, type: GROUP_TYPE },
        actions: SCHEDULE_ACTIONS,
        tag: SCHEDULE_TAG,
      });
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
        onClick={handleGroup}
        disabled={groupName === ""}
      />
    </Box>
  );
};

export default AddEditGroupForm;
