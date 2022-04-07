import projectModel, { projectType } from "./models/project";

export const createProject = async (project: projectType) => {
  const newProject = new projectModel(project);
  await newProject.save();
  return newProject;
};
