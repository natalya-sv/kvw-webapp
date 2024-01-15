import { useMemo } from "react";
import { Typography } from "@mui/material";
import {
  NO_NEWSLETTERS,
  SENT_NEWSLETTERS,
  newslettersTableDefinition,
} from "./constants";
import { truncateString } from "../../../helpers/utils";
import { NEWSLETTERS_ACTIONS, NEWSLETTERS_TAG } from "../../../APIData";
import MainTable from "../../../components/table/MainTable";

const NewsletteraTable = ({
  newsletters,
  setEditedNewsletterItem,
  openNewslettersModal,
  deleteData,
  successUpdating,
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
            truncatedText: nlItem.newsletter_link
              ? truncateString(nlItem.newsletter_link, 70)
              : "",
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
  };

  const handleEditNewsletterItem = (id) => {
    const item = newslettersItems.find(
      (newslettersItem) => newslettersItem.id === id
    );
    setEditedNewsletterItem(item);
    openNewslettersModal();
  };

  return newslettersItems && newslettersItems.length > 0 ? (
    <MainTable
      items={newslettersItems}
      tableDefinition={newslettersTableDefinition}
      title={SENT_NEWSLETTERS}
      onRemoveItems={handleRemoveNewsletterItem}
      onEditItem={handleEditNewsletterItem}
      successUpdating={successUpdating}
    />
  ) : (
    <Typography>{NO_NEWSLETTERS}</Typography>
  );
};
export default NewsletteraTable;
