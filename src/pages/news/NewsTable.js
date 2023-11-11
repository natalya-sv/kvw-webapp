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
  setEditedNewsItem,
  openNewsModal,
  deleteData,
  successDeleting,
}) => {
  const updatedNews = useMemo(() => {
    if (news) {
      return [...news]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((newsItem) => {
          return {
            id: newsItem.id,
            title: newsItem.title,
            content: newsItem.content,
            imageUrl: newsItem.image_url,
            date: newsItem.date,
            truncatedText: newsItem.content
              ? truncateString(newsItem.content, 150)
              : "",
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
      onEditItem={handleEditNewsItem}
      successDeleting={successDeleting}
    />
  ) : (
    <Typography>{NO_NEWS_MESSAGE}</Typography>
  );
};
export default NewsTable;
