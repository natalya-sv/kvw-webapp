import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SAVE } from "../../helpers/constants";
import { GROUP_NAME } from "./constants";
import CustomButton from "../../components/CustomButton";
import TextInput from "../../components/TextInput";
import { GROUPS_ACTIONS, GROUPS_TAG } from "../../APIData";

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
        data: updatedGroup,
        actions: GROUPS_ACTIONS,
        tag: GROUPS_TAG,
      });
    } else {
      createData({ data: group, actions: GROUPS_ACTIONS, tag: GROUPS_TAG });
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
