import React, { useState, useEffect } from "react";
import Select from "react-select";

import { emfTestFanTeamValues } from '../../constants/emftest-data'

const FanTeamFilter = () => {
  const [fanTeams, setFanTeams] = useState([]);

  useEffect(() => {
    setFanTeams(
      emfTestFanTeamValues.map((x) => ({
        value: x.value,
        label: x.label,
      }))
    );
  }, []);

  return (
    <div>
      <Select
            // className="input-xs no-padding"
            // classNamePrefix="react-select"
            name="fanTeamFilter_ID"
            // defaaultValue={playerValues}
            options={fanTeams}
            // onChange={(value) => handleChange(value, index, "paymentMethod_ID")}
          />
    </div>
  );
};

export default FanTeamFilter;