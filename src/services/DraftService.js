import http from "../api/http-common";

const getDraftStatus = (data) => {
  return http.get("Draft/GetDraftStatus");
};

const getDraftSelections = (data) => {
  return http.get("Draft/GetDraftPicksForLeague_v2");
};

const GetDraftPicksByFanTeam = (id) => {
  return http.get(`Draft/GetDraftPicksByFanTeam/${id}`);
};

const GetDraftPicksByPosition = (data) => {
  return http.get("Draft/GetDraftPicksByPosition");
};

const GetFanTeamRosters = (data) => {
  return http.get("Draft/GetRosterTotalPositionCount");
};

const GetFanTeamSelections = (id) => {
  return http.get(`Draft/GetTeamSelections/${id}`);
};
// const create = data => {
//   return http.post("/tutorials", data);
// };

// const update = (id, data) => {
//   return http.put(`/tutorials/${id}`, data);
// };

// const remove = id => {
//   return http.delete(`/tutorials/${id}`);
// };

// const removeAll = () => {
//   return http.delete(`/tutorials`);
// };

// const findByTitle = title => {
//   return http.get(`/tutorials?title=${title}`);
// };

const DraftService = {
  getDraftStatus,
  getDraftSelections,
  GetDraftPicksByFanTeam,
  GetDraftPicksByPosition,
  GetFanTeamRosters,
  GetFanTeamSelections,
  // get,
  // create,
  // update,
  // remove,
  // removeAll,
  // findByTitle
};

export default DraftService;
