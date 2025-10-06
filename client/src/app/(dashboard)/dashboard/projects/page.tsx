import { getAllProjects } from "@/services/ProjectServices";

export default async function ManageProjects() {
  const projects = await getAllProjects();
  console.log(projects);

  return (
    <div>
      <h1>This is the Manage Projects page</h1>
    </div>
  );
}
