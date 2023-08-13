/* eslint-disable react/forbid-component-props */
import React from "react";
import { Input, FormGroup } from "reactstrap";

const DropdownSelect = ({
  defaultValue,
  onChange,
  valueMapperObj,
  sort = true,
}) => {
  const keys = sort
    ? Object.keys(valueMapperObj).sort()
    : Object.keys(valueMapperObj);

  //WORK ORDER BOARD, ASSIGNED FILTER NEEDS TO REORDER OPTIONS
  const notAssigned = keys.indexOf("Not Assigned");
  if (notAssigned > -1) {
    keys.splice(notAssigned, 1);
    keys.splice(1, 0, "Not Assigned");
  }

  return (
    <FormGroup className="custom-control">
      <Input
        type="select"
        name="select"
        className="input-xs"
        defaultValue={defaultValue}
        onChange={onChange}
        style={{ backgroundColor: "#005DA8", color: "#FFF" }}
      >
        {keys.map((key) => {
          const item = valueMapperObj[key];
          return (
            <option key={key} value={key}>
              {item.label}
            </option>
          );
        })}
      </Input>
    </FormGroup>
  );
};

export default DropdownSelect;
