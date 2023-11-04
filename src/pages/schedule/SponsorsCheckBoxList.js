import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { DAY_SPONSORS } from "./constants";
import { Typography } from "@mui/material";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexFlow: "column wrap",
    gap: "0 30px",
    overflow: "auto",
  },
  item: {
    width: "auto",
  },
});

const SponsorsCheckboxList = (props) => {
  const [checkedSponsors, setCheckedSponsors] = useState([]);
  const sponsors = [];
  const classes = useStyles();

  useEffect(() => {
    if (props.selectedDaySponsors) {
      setCheckedSponsors(props.selectedDaySponsors);
    }
  }, [props.selectedDaySponsors]);

  const handleToggle = (value) => () => {
    const currentIndex = checkedSponsors.indexOf(value);
    const newChecked = [...checkedSponsors];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    props.setSelectedDaySponsors(newChecked);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      className={classes.container}
    >
      <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
        {DAY_SPONSORS}
      </Typography>
      {sponsors.map((sponsor) => {
        const labelId = `checkbox-list-label-${sponsor.id}`;

        return (
          <ListItem key={sponsor.id} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={handleToggle(sponsor.id)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checkedSponsors.indexOf(sponsor.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={sponsor.sponsorName} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
export default SponsorsCheckboxList;
