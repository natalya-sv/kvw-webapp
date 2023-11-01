import React, { useCallback, useMemo } from "react";
import SimpleTable from "../../components/table/SimpleTable";
import {
  ACTIVE,
  MAIN_SPONSOR,
  NOT_ACTIVE,
  NO_SPONSORS_YET,
  SPONSOR,
  SPONSORS,
  sponsorsTableDefinitions,
} from "./constants";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DoNotDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import { Typography } from "@mui/material";
import {
  useDeleteAllSponsorsMutation,
  useDeleteSponsorByIdMutation,
  useDeleteSponsorsByIdsMutation,
  useUpdateSponsorsStatusMutation,
} from "../../services/sponsors";

const SponsorsTable = ({
  sponsors,
  openSponsorsModal,
  closeSponsorsModal,
  setEditedSponsor,
}) => {
  const [deleteSponsorById] = useDeleteSponsorByIdMutation();
  const [deleteAllSponsors] = useDeleteAllSponsorsMutation();
  const [deleteSponsorsByIds] = useDeleteSponsorsByIdsMutation();
  const [updateSponsorsStatus] = useUpdateSponsorsStatusMutation();

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
            type: sp.sponsor_type === "main" ? MAIN_SPONSOR : SPONSOR,
            sponsorType: sp.sponsor_type,
          };
        });
    } else {
      return [];
    }
  }, [sponsors]);

  const handleRemoveSponsor = (idsToRemove) => {
    if (idsToRemove.length === 1) {
      deleteSponsorById(idsToRemove[0]);
    } else {
      const deleteAllItems = updatedSponsors.length === idsToRemove.length;
      if (deleteAllItems) {
        deleteAllSponsors();
      } else {
        deleteSponsorsByIds(idsToRemove);
      }
    }
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
      updateSponsorsStatus({
        ids: selectedSponsors,
        status: isActive,
      });
    },
    [updateSponsorsStatus]
  );

  const extraButtons = useMemo(() => {
    return [
      {
        id: 1,
        title: ACTIVE,
        icon: <TaskAltIcon />,
        func: setSponsorStatus,
        status: "active",
      },
      {
        id: 2,
        title: NOT_ACTIVE,
        icon: <DoNotDisturbAltIcon />,
        func: setSponsorStatus,
        status: "",
      },
    ];
  }, [setSponsorStatus]);

  return updatedSponsors && updatedSponsors.length > 0 ? (
    <SimpleTable
      items={updatedSponsors}
      headCells={sponsorsTableDefinitions}
      title={SPONSORS}
      onRemove={handleRemoveSponsor}
      buttons={["edit", "delete"]}
      onEditItem={handleEditSponsor}
      extraButtons={extraButtons}
    />
  ) : (
    <Typography>{NO_SPONSORS_YET}</Typography>
  );
};
export default SponsorsTable;
