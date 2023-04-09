export const createBrearerRefreshToken = () => {
  const token = localStorage.getItem('refreshToken');

  return `Bearer ${token}`;
};

export const createBrearerAccessToken = () => {
  const token = localStorage.getItem('accessToken');

  return `Bearer ${token}`;
};
