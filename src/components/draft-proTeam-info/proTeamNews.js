import React from "react";
// import axios from "axios";

// import { API_URL } from "../../config";

const ProTeamNews = ({ teamID, width, height, color }) => {
//   const [Loading, setLoading] = useState(true);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}Draft/ProTeamNews/${teamID}`).then((response) => {
//       setData([...response.data]);
//     });
//     setLoading(false);
//   }, [teamID]);

  const style = {
    display: "flex",
    width: width || "100%",
    height: height || "100%",
    backgroundColor: color || "#f0f0f0",
    // You can add more styling properties as needed
  };

  return (
    <div style={style}>
      {/* You can customize the content of your placeholder here */}({teamID}) -
      NEWS Loading...
    </div>
  );
};

export default ProTeamNews;
