const getEmployees = (jwtToken: string) => {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/employee`, {
    headers: { authorization: `bearer ${jwtToken}` },
  }).then((res: any) => res.json());
};

export default getEmployees;
