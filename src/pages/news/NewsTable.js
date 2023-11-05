import {
  NO_NEWS_MESSAGE,
  PREVIOUS_NEWS,
  newsTableDefinition,
} from "./constants";
import { Typography } from "@mui/material";
import { useMemo } from "react";
import { truncateString } from "../../helpers/utils";
import { NEWS_ACTIONS, NEWS_TAG } from "../../APIData";
import MainTable from "../../components/table/MainTable";

const NewsTable = ({
  news,
  closeNewsModal,
  setEditedNewsItem,
  openNewsModal,
  deleteData,
}) => {
  const updatedNews = useMemo(() => {
    if (news) {
      return [...news]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((newsItem) => {
          return {
            ...newsItem,
            imageUrl: newsItem.image_url,
            truncatedText: truncateString(newsItem.content, 150),
          };
        });
    } else {
      return [];
    }
  }, [news]);

  const handleRemoveNews = (idsToRemove) => {
    deleteData({
      deletedItems: idsToRemove,
      tag: NEWS_TAG,
      actions: NEWS_ACTIONS,
    });
    closeNewsModal();
  };

  const handleEditNewsItem = (id) => {
    const newsItem = updatedNews.find((newsItemId) => newsItemId.id === id);
    if (newsItem) {
      setEditedNewsItem(newsItem);
      openNewsModal();
    }
  };

  return updatedNews && updatedNews.length > 0 ? (
    <MainTable
      items={updatedNews}
      tableDefinition={newsTableDefinition}
      title={PREVIOUS_NEWS}
      onRemoveItems={handleRemoveNews}
      buttons={["delete", "edit"]}
      onEditItem={handleEditNewsItem}
    />
  ) : (
    <Typography>{NO_NEWS_MESSAGE}</Typography>
  );
};
export default NewsTable;
