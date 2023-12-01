import http from "../api/http-common";

const UserInfoStatus = (data) => {
  return http.get("/User/UserInfoStatus", data);
};

// const getDraftSelections = (data) => {
//   return http.get("/Draft/GetDraftPicksForLeague_v2");
// };

// const GetDraftPicksByFanTeam = id => {
//   return http.get(`/Draft/GetDraftPicksByFanTeam/${id}`);
// };

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

const UserService = {
  UserInfoStatus,
  // getDraftSelections,
  // GetDraftPicksByFanTeam,
  // get,
  // create,
  // update,
  // remove,
  // removeAll,
  // findByTitle
};

export default UserService;
