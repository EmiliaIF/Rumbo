// import aad from "azure-ad-jwt-v2";

// const auth = (req, res, next) => {
//   const authorization = req.headers["authorization"];

//   if (authorization) {
//     return res.sendStatus(401);
//   } else {
//     var bearer = authorization.split(" ");
//     var jwtToken = bearer[1];
//     aad.verify(
//       jwtToken,
//       {
//         audience: process.env.AZURE_APP_CLIENT_ID
//       },
//       function (err, result) {
//         if (result) {
//           req.user = result.preferred_username;
//           req.isAdmin = process.env.MOCK_IS_ADMIN ? true : result.roles && result.roles.indexOf('Administrator') > -1;
//           next();
//         } else {
//           console.log("JWT is invalid: " + err);
//           return res.sendStatus(401);
//         }
//       }
//     );
//   }
// };

// export default auth;
