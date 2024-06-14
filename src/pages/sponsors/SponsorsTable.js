import React, { useCallback, useMemo } from "react";
import {
  ACTIVE,
  NOT_ACTIVE,
  NO_SPONSORS_YET,
  SPONSORS,
  sponsorsTableDefinitions,
} from "./constants";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DoNotDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import { Typography } from "@mui/material";
import {
  SET_SPONSORS_STATUS,
  SPONSORS_ACTIONS,
  SPONSORS_TAG,
} from "../../APIData";
import MainTable from "../../components/table/MainTable";
import { getSponsorType } from "./utils";

const SponsorsTable = ({
  sponsors,
  openSponsorsModal,
  closeSponsorsModal,
  setEditedSponsor,
  deleteData,
  updateData,
  successUpdating,
}) => {
  const updatedSponsors = useMemo(() => {
    if (sponsors && sponsors?.length > 0) {
      return [...sponsors]
        .sort((a, b) => a.sponsor_name.localeCompare(b.sponsor_name))
        .map((sp) => {
          return {
            id: sp.id,
            websiteUrl: sp.website_url ?? "",
            sponsorName: sp.sponsor_name,
            imageUrl: sp.image_url ?? "",
            active: sp.active,
            status: sp.active ? (
              <CheckIcon color="success" />
            ) : (
              <ClearIcon color="default" />
            ),
            type: getSponsorType(sp.sponsor_type), //=== "main" ? MAIN_SPONSOR : SPONSOR,
            sponsorType: sp.sponsor_type,
          };
        });
    } else {
      return [];
    }
  }, [sponsors]);

  const handleRemoveSponsor = (idsToRemove) => {
    deleteData({
      deletedItems: idsToRemove,
      actions: SPONSORS_ACTIONS,
      tag: SPONSORS_TAG,
    });
    closeSponsorsModal();
  };

  const handleEditSponsor = (id) => {
    const sponsorToEdit = updatedSponsors.find((sp) => sp.id === id);
    if (sponsorToEdit) {
      setEditedSponsor(sponsorToEdit);
      openSponsorsModal();
    }
  };

  const setSponsorStatus = useCallback(
    (selectedSponsors, isActive) => {
      updateData({
        updatedItem: {
          sponsors: selectedSponsors,
          status: isActive,
        },
        type: SET_SPONSORS_STATUS,
        tag: SPONSORS_TAG,
        actions: SPONSORS_ACTIONS,
      });
    },
    [updateData]
  );

  const extraButtons = useMemo(() => {
    return [
      {
        id: 1,
        title: ACTIVE,
        icon: <TaskAltIcon />,
        action: setSponsorStatus,
        status: "active",
      },
      {
        id: 2,
        title: NOT_ACTIVE,
        icon: <DoNotDisturbAltIcon />,
        action: setSponsorStatus,
        status: "",
      },
    ];
  }, [setSponsorStatus]);

  return updatedSponsors && updatedSponsors.length > 0 ? (
    <MainTable
      items={updatedSponsors}
      tableDefinition={sponsorsTableDefinitions}
      title={SPONSORS}
      onRemoveItems={handleRemoveSponsor}
      onEditItem={handleEditSponsor}
      extraButtons={extraButtons}
      successUpdating={successUpdating}
    />
  ) : (
    <Typography>{NO_SPONSORS_YET}</Typography>
  );
};
export default SponsorsTable;
