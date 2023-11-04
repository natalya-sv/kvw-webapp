import SimpleTable from "../../components/table/SimpleTable";
import {
  NO_VIDEOS_YET,
  VIDEOS_PAGE_TITLE,
  videosTableDefinitions,
} from "./constants";
import { Typography } from "@mui/material";
import { useMemo } from "react";
import { truncateString } from "../../helpers/utils";
import { VIDEOS_ACTIONS, VIDEOS_TAG } from "../../APIData";

const VideosTable = ({
  videos,
  deleteData,
  setEditedVideo,
  openVideosModal,
}) => {
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
    deleteData({
      deletedItems: idsToRemove,
      tag: VIDEOS_TAG,
      actions: VIDEOS_ACTIONS,
    });
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
      buttons={["edit", "delete"]}
      onEditItem={handleEditVideo}
    />
  ) : (
    <Typography>{NO_VIDEOS_YET}</Typography>
  );
};
export default VideosTable;
