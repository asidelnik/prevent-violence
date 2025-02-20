import c from "./GridHeader.module.scss";
import { IconButton, Tooltip } from "@mui/material";
import { IGridHeaderProps } from "../../props/IVideosGridProps";
import CloseIcon from '@mui/icons-material/Close';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import SmallSpinner from "../../shared/components/SmallSpinner";


export default function GridHeader({
  videosCount,
  videosCountIsFetching,
  eventId,
  eventTitle,
  selectedVideos,
  unselectAllVideos,
  addSelectedVideosToEvent
}: IGridHeaderProps) {
  return (
    <>
      <div className={c.gridHeader}>
        <div className={c.headerTitles}>
          {videosCountIsFetching ?
            <div><SmallSpinner diameter={20} /></div> :
            <div>{videosCount} videos</div>
          }
          {eventId && <h3>{eventTitle || ''}</h3>}
        </div>

        {eventId && (
          <div className={c.headerActions}>
            <div>{`${selectedVideos.length} selected`}</div>
            <IconButton
              aria-label="Unselect all videos button"
              disabled={selectedVideos.length === 0}
              onClick={unselectAllVideos}
              color="info"
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            <Tooltip
              title="Add videos to event"
              placement="top-end"
              enterDelay={500}
            >
              <span>
                <IconButton
                  aria-label="Add videos to event button"
                  disabled={selectedVideos.length === 0}
                  onClick={addSelectedVideosToEvent}
                  color="primary"
                >
                  <CreateNewFolderIcon />
                </IconButton>
              </span>
            </Tooltip>
          </div>
        )}
      </div>
    </>
  )
}
