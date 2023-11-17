import React from "react";
// import Select from "react-select";
// import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const TeamSelect = ({ teams, selectedTeam, setSelectedTeam }) => {
  const options = teams.map((team) => ({
    value: team.id,
    label: team.name,
  }));

  return (
    <React.Fragment>
      <div style={{ margin: 5, width: "100%" }}>
        {/* <InputLabel id="fanTeamSelect-label">Fan Team</InputLabel> */}
        <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
          <Select
            labelId="fanTeamSelect-label"
            id="fanTeamSelect"
            value={selectedTeam}
            onChange={setSelectedTeam}
            // label="Fan Team"
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </React.Fragment>
  );
};
export default TeamSelect;
