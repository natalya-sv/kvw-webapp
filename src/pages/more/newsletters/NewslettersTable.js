import { useMemo } from "react";
import SimpleTable from "../../../components/table/SimpleTable";
import { Typography } from "@mui/material";
import {
  NO_NEWSLETTERS,
  SENT_NEWSLETTERS,
  newslettersTableDefinition,
} from "./constants";
import { truncateString } from "../../../helpers/utils";

const NewsletteraTable = ({
  newsletters,
  updateNewslettersData,
  closeNewslettersModal,
  setEditedNewsletterItem,
  openNewslettersModal,
}) => {
  const newslettersItems = useMemo(() => {
    if (newsletters && newsletters.length > 0) {
      return [...newsletters]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((nl) => {
          return {
            id: nl.id,
            title: nl.title,
            newsletterLink: nl.newsletter_link,
            date: nl.date,
            truncatedText: truncateString(nl.newsletter_link, 70),
          };
        });
    } else {
      return [];
    }
  }, [newsletters]);

  const handleRemoveNewsletterItem = (idsToRemove) => {
    if (idsToRemove.length === 1) {
      updateNewslettersData(idsToRemove[0]);
    } else {
      const deleteAllItems = newslettersItems.length === idsToRemove.length;
      updateNewslettersData(idsToRemove, deleteAllItems);
    }
    closeNewslettersModal();
  };

  const handleEditNewsletterItem = (id) => {
    const item = newslettersItems.find(
      (newslettersItem) => newslettersItem.id === id
    );
    setEditedNewsletterItem(item);
    openNewslettersModal();
  };

  return newslettersItems.length > 0 ? (
    <SimpleTable
      items={newslettersItems}
      headCells={newslettersTableDefinition}
      title={SENT_NEWSLETTERS}
      onRemove={handleRemoveNewsletterItem}
      buttons={["delete", "edit"]}
      onEditItem={handleEditNewsletterItem}
    />
  ) : (
    <Typography>{NO_NEWSLETTERS}</Typography>
  );
};
export default NewsletteraTable;
