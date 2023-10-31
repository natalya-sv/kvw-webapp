import SimpleTable from "../../components/table/SimpleTable";
import {
  NO_VIDEOS_YET,
  VIDEOS_PAGE_TITLE,
  videosTableDefinitions,
} from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import {
  removeVideoItem,
  removeVideoItems,
} from "../../store/videos/videos-actions";
import { useMemo } from "react";
import { truncateString } from "../../helpers/utils";

const VideosTable = (props) => {
  const { videos } = useSelector((state) => state.videos);
  const buttons = ["edit", "delete"];
  const dispatch = useDispatch();

  const updatedVideos = useMemo(() => {
    if (videos) {
      return [...videos]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((videoItem) => {
          return {
            ...videoItem,
            truncatedText: truncateString(videoItem.description, 150),
          };
        });
    } else {
      return [];
    }
  }, [videos]);

  const handleRemoveVideos = (idsToRemove) => {
    if (idsToRemove.length === 1) {
      dispatch(removeVideoItem(idsToRemove[0]));
    } else {
      const deleteAllItems = videos.length === idsToRemove.length;
      dispatch(removeVideoItems(idsToRemove, deleteAllItems));
    }
  };

  const handleEditVideo = (id) => {
    const videoToEdit = videos.find((v) => v.id === id);
    if (videoToEdit) {
      props.setEditedVideo(videoToEdit);
      props.openVideosModal();
    }
  };

  return videos.length > 0 ? (
    <SimpleTable
      items={updatedVideos}
      headCells={videosTableDefinitions}
      title={VIDEOS_PAGE_TITLE}
      onRemove={handleRemoveVideos}
      buttons={buttons}
      onEditItem={handleEditVideo}
    />
  ) : (
    <Typography>{NO_VIDEOS_YET}</Typography>
  );
};
export default VideosTable;
