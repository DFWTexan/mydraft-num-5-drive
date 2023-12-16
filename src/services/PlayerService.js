import http from '../api/http-common';

const getToken = () => {
  let userObject = JSON.parse(localStorage.getItem('user'));
  return userObject ? `Bearer ${userObject.token}` : null;
};

const fetch = (payload) => {
  // Ensure token is up-to-date
  const token = getToken();
  if (!token) {
    throw new Error('No token found');
  }

  return http.put('Player/GetPlayers', payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
};

const PlayerService = {
  fetch,
};

export default PlayerService;