import {
  NO_VIDEOS_YET,
  VIDEOS_PAGE_TITLE,
  videosTableDefinitions,
} from "./constants";
import { Typography } from "@mui/material";
import { useMemo } from "react";
import { truncateString } from "../../helpers/utils";
import { VIDEOS_ACTIONS, VIDEOS_TAG } from "../../APIData";
import MainTable from "../../components/table/MainTable";

const VideosTable = ({
  videos,
  deleteData,
  setEditedVideo,
  openVideosModal,
  successUpdating,
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
            truncatedText: videoItem.description
              ? truncateString(videoItem.description, 150)
              : "",
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
    <MainTable
      items={updatedVideos}
      tableDefinition={videosTableDefinitions}
      title={VIDEOS_PAGE_TITLE}
      onRemoveItems={handleRemoveVideos}
      onEditItem={handleEditVideo}
      successUpdating={successUpdating}
    />
  ) : (
    <Typography>{NO_VIDEOS_YET}</Typography>
  );
};
export default VideosTable;
