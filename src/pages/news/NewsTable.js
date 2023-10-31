import SimpleTable from "../../components/table/SimpleTable";
import { useDispatch, useSelector } from "react-redux";
import {
  NO_NEWS_MESSAGE,
  PREVIOUS_NEWS,
  newsTableDefinition,
} from "./constants";
import { removeNewsItem, removeNewsItems } from "../../store/news/news-actions";
import { Typography } from "@mui/material";
import { useMemo } from "react";
import { truncateString } from "../../helpers/utils";
const NewsTable = (props) => {
  const { news } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  const updatedNews = useMemo(() => {
    if (news) {
      return [...news]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((newsItem) => {
          return {
            ...newsItem,
            truncatedText: truncateString(newsItem.content, 150),
          };
        });
    } else {
      return [];
    }
  }, [news]);

  const handleRemoveNews = (idsToRemove) => {
    if (idsToRemove.length === 1) {
      dispatch(removeNewsItem(idsToRemove[0]));
    } else {
      const deleteAllItems = news.length === idsToRemove.length;
      dispatch(removeNewsItems(idsToRemove, deleteAllItems));
    }
    props.closeNewsModal();
  };

  const handleEditNewsItem = (id) => {
    const newsItem = news.find((newsItemId) => newsItemId.id === id);
    if (newsItem) {
      props.setEditedNewsItem(newsItem);
      props.openNewsModal();
    }
  };

  return news.length > 0 ? (
    <SimpleTable
      items={updatedNews}
      headCells={newsTableDefinition}
      title={PREVIOUS_NEWS}
      onRemove={handleRemoveNews}
      buttons={["delete", "edit"]}
      onEditItem={handleEditNewsItem}
    />
  ) : (
    <Typography>{NO_NEWS_MESSAGE}</Typography>
  );
};
export default NewsTable;
