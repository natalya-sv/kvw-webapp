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
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {
  removeSponsorItem,
  removeSponsors,
  updateActiveSponsorsData,
} from "../../store/sponsors/sponsors-actions";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DoNotDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import { Typography } from "@mui/material";
const SponsorsTable = (props) => {
  const { sponsors } = useSelector((state) => state.sponsors);
  const dispatch = useDispatch();

  const updatedSponsors = useMemo(() => {
    if (sponsors && sponsors.length > 0) {
      return [...sponsors]
        .sort((a, b) => a.sponsorName.localeCompare(b.sponsorName))
        .map((sp) => {
          const sponsor = { ...sp };
          if (sp.active) {
            sponsor.active = <CheckIcon color="success" />;
          } else {
            sponsor.active = <ClearIcon color="default" />;
          }
          sponsor.sponsorType =
            sp.sponsorType === "main" ? MAIN_SPONSOR : SPONSOR;

          return sponsor;
        });
    } else {
      return [];
    }
  }, [sponsors]);

  const handleRemoveSponsor = (idsToRemove) => {
    if (idsToRemove.length === 1) {
      dispatch(removeSponsorItem(idsToRemove[0]));
    } else {
      const deleteAllItems = sponsors.length === idsToRemove.length;
      dispatch(removeSponsors(idsToRemove, deleteAllItems));
    }
    props.closeSponsorsModal();
  };

  const handleEditSponsor = (id) => {
    const sponsorToEdit = sponsors.find((sp) => sp.id === id);
    if (sponsorToEdit) {
      props.setEditedSponsor(sponsorToEdit);
      props.openSponsorsModal();
    }
  };

  const setSponsorStatus = useCallback(
    (selectedSponsors, isActive) => {
      const allSponsors = [...sponsors]
        .map((sponsor) => {
          if (selectedSponsors.includes(sponsor.id)) {
            return {
              ...sponsor,
              active: isActive === "active" ? true : false,
            };
          }
          return sponsor;
        })
        .map((sponsor) => {
          return {
            id: sponsor.id,
            sponsor_name: sponsor.sponsorName,
            sponsor_type: sponsor.sponsorType,
            image_url: sponsor.imageUrl,
            website_url: sponsor.websiteUrl,
            active: sponsor.active,
          };
        });
      dispatch(updateActiveSponsorsData(allSponsors));
    },
    [dispatch, sponsors]
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

  return sponsors.length > 0 ? (
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
