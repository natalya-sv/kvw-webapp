import { useMemo } from "react";
import SimpleTable from "../../../components/table/SimpleTable";
import { Typography } from "@mui/material";
import {
  NO_NEWSLETTERS,
  SENT_NEWSLETTERS,
  newslettersTableDefinition,
} from "./constants";
import { truncateString } from "../../../helpers/utils";
import { NEWSLETTERS_ACTIONS, NEWSLETTERS_TAG } from "../../../APIData";

const NewsletteraTable = ({
  newsletters,
  closeNewslettersModal,
  setEditedNewsletterItem,
  openNewslettersModal,
  deleteData,
}) => {
  const newslettersItems = useMemo(() => {
    if (newsletters && newsletters.length > 0) {
      return [...newsletters]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((nlItem) => {
          return {
            id: nlItem.id,
            title: nlItem.title,
            newsletterLink: nlItem.newsletter_link,
            date: nlItem.date,
            truncatedText: truncateString(nlItem.newsletter_link, 70),
          };
        });
    } else {
      return [];
    }
  }, [newsletters]);

  const handleRemoveNewsletterItem = (idsToRemove) => {
    deleteData({
      deletedItems: idsToRemove,
      actions: NEWSLETTERS_ACTIONS,
      tag: NEWSLETTERS_TAG,
    });
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
