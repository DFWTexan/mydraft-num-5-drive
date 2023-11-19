import React from "react";
import FormControl from "@mui/material/FormControl";
// import InputLabel from '@mui/material/InputLabel';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const PlayerFilterSelect = ({
  data,
  selectedItem,
  setSelectedItem,
  label,
  minWidth,
  margin,
  size,
}) => {
  const options = data.map((item) => ({
    value: item.value,
    label: item.label,
  }));

  return (
    <React.Fragment>
      <div style={{ width: "100%" }}>
        {/* <InputLabel id="playerFilterSelect-label">{label}</InputLabel> */}
        <FormControl sx={{ minWidth: minWidth || 125 }} size={size || "small"}>
          <Select
            labelId="playerFilterSelect-label"
            id="playerFilterSelect"
            value={selectedItem}
            onChange={setSelectedItem}
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

export default PlayerFilterSelect;
