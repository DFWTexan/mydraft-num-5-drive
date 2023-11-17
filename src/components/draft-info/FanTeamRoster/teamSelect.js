import Select from "react-select";
import ReactFlow from 'react-flow-renderer';

const TeamSelect = ({ teams, selectedTeam, setSelectedTeam }) => {
  const options = teams.map((team) => ({
    value: team.id,
    label: team.name,
  }));

  return (
    <div style={{ margin: 5 }}>
      <div>
        <Select
          classNamePrefix="react-select"
          name="pointValFilter_ID"
          options={options}
          onChange={(value) => setSelectedTeam(value)}
        />
      </div>
    </div>
  );
};
export default TeamSelect;