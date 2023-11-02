import SimpleTable from "../../components/table/SimpleTable";
import {
  NO_VIDEOS_YET,
  VIDEOS_PAGE_TITLE,
  videosTableDefinitions,
} from "./constants";
import { Typography } from "@mui/material";
import { useMemo } from "react";
import { truncateString } from "../../helpers/utils";

const VideosTable = ({
  videos,
  updateVideosData,
  setEditedVideo,
  openVideosModal,
}) => {
  const buttons = ["edit", "delete"];

  const updatedVideos = useMemo(() => {
    if (videos && videos.length > 0) {
      return [...videos]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((videoItem) => {
          return {
            id: videoItem.id,
            title: videoItem.title,
            url: videoItem.url,
            description: videoItem.description,
            youtubeLink: videoItem.youtube_link,
            date: videoItem.date,
            truncatedText: truncateString(videoItem.description, 150),
          };
        });
    } else {
      return [];
    }
  }, [videos]);

  const handleRemoveVideos = (idsToRemove) => {
    if (idsToRemove.length === 1) {
      updateVideosData(idsToRemove[0]);
    } else {
      const deleteAllItems = updatedVideos.length === idsToRemove.length;
      updateVideosData(idsToRemove, deleteAllItems);
    }
  };

  const handleEditVideo = (id) => {
    const videoToEdit = updatedVideos.find((v) => v.id === id);
    if (videoToEdit) {
      setEditedVideo(videoToEdit);
      openVideosModal();
    }
  };

  return updatedVideos && updatedVideos.length > 0 ? (
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
