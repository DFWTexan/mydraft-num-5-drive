import http from "../api/http-common";

const getDraftSelections = data => {

console.log('===> EMFTEST - GOT HERE (DraftService) getDraftSelections => data: \n', data);

  return http.post("/Draft/GetDraftPicksForLeague", data);
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

const DraftService
 = {
  getDraftSelections,
  // get,
  // create,
  // update,
  // remove,
  // removeAll,
  // findByTitle
};

export default DraftService;