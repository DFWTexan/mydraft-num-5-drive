import http from "../api/http-common";

const getToken = () => {
  let userObject = JSON.parse(localStorage.getItem("user"));
  return userObject ? `Bearer ${userObject.token}` : null;
};

const getActiveLeague = () => {
  // Ensure token is up-to-date
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  return http.get("League/GetActiveLeague/");
};

// const get = id => {
//   return http.get(`/tutorials/${id}`);
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

const LeagueService = {
  getActiveLeague,
  // get,
  // create,
  // update,
  // remove,
  // removeAll,
  // findByTitle
};

export default LeagueService;
