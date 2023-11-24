import React from "react";
// import axios from "axios";

// import { API_URL } from "../../config";

const ProTeamInjuries = ({ teamID, width, height, color }) => {
//   const [Loading, setLoading] = useState(true);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}Draft/ProTeamInjuries/${teamID}`).then((response) => {
//       setData([{ value: 0, label: "Select Team" }, ...response.data]);
//     });
//     setLoading(false);
//   }, [teamID]);

  const style = {
    width: width || "100%",
    height: height || "100%",
    backgroundColor: color || "transparent",
    // You can add more styling properties as needed
  };

  return (
    <div style={style}>
      {/* You can customize the content of your placeholder here */}({teamID}) -
      INJURIES Loading...
    </div>
  );
};

export default ProTeamInjuries;
