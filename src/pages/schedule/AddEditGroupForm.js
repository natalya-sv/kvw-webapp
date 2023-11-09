import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SAVE } from "../../helpers/constants";
import { GROUP_NAME } from "./constants";
import CustomButton from "../../components/CustomButton";
import TextInput from "../../components/TextInput";
import { GROUPS_TAG, GROUP_TYPE, SCHEDULE_ACTIONS } from "../../APIData";

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
        updatedItem: updatedGroup,
        type: GROUP_TYPE,
        actions: SCHEDULE_ACTIONS,
        tag: GROUPS_TAG,
      });
    } else {
      createData({
        newItem: group,
        type: GROUP_TYPE,
        actions: SCHEDULE_ACTIONS,
        tag: GROUPS_TAG,
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
