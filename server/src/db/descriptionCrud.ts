import projectModel, { projectType } from "./models/project";
import {Response, Request} from 'express'
import Transaction from './models/transactions'

// export const getDescriptionByEmail = async (req: Request, res: Response) => {
//   if (req['isAdmin']) {
//       return res.send(401).end();
//   }
//   try {
//     const project = await descriptionModel.find()
//       return res.status(200).json(project);
//   } catch (err) {
//       return res.status(400).json(err);
//   }
// };

export const getDescriptionByEmail = (email: string) => {
    const getDescription = Transaction.aggregate([
        {$match: {
            email: email,
        }}
    ])
    return getDescription
}
