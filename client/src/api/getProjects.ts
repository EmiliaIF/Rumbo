export const getProjectsByUser = (jwtToken: string, email: string) => {

    return fetch(`${process.env.REACT_APP_API_BASE_URL}/${email}/project-list`, {
       headers: { authorization: `bearer ${jwtToken}` },
   }).then((res: any) => res.json());
};

export const getAllProjects = (jwtToken: string) => {

   return fetch(`${process.env.REACT_APP_API_BASE_URL}/project-list`, {
      headers: { authorization: `bearer ${jwtToken}` },
  }).then((res: any) => res.json());
};