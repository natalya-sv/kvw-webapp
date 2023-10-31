import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleTable from "../../../components/table/SimpleTable";
import { Typography } from "@mui/material";
import {
  NO_NEWSLETTERS,
  SENT_NEWSLETTERS,
  newslettersTableDefinition,
} from "./constants";
import {
  removeNewsletterItem,
  removeNewslettersItems,
} from "../../../store/newsletters/newsletters-actions";
import { truncateString } from "../../../helpers/utils";

const NewsletteraTable = (props) => {
  const { newsletters } = useSelector((state) => state.newsletters);
  const dispatch = useDispatch();

  const newslettersItems = useMemo(() => {
    if (newsletters && newsletters.length > 0) {
      return [...newsletters]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((nl) => {
          return {
            ...nl,
            truncatedText: truncateString(nl.newsletterLink, 70),
          };
        });
    } else {
      return [];
    }
  }, [newsletters]);

  const handleRemoveNewsletterItem = (idsToRemove) => {
    if (idsToRemove.length === 1) {
      dispatch(removeNewsletterItem(idsToRemove[0]));
    } else {
      const deleteAllItems = newslettersItems.length === idsToRemove.length;
      dispatch(removeNewslettersItems(idsToRemove, deleteAllItems));
    }
    props.closeNewslettersModal();
  };

  const handleEditNewsletterItem = (id) => {
    const item = newslettersItems.find(
      (newslettersItem) => newslettersItem.id === id
    );
    props.setEditedNewsletterItem(item);
    props.openNewslettersModal();
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
