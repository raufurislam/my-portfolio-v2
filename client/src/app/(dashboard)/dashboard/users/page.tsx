import { getAllUsers } from "@/actions/user";

export default async function ManageUsers() {
  const res = await getAllUsers();
  const users = res?.data;
  console.log(users);

  return (
    <div>
      <h1>This is the Manage Users page</h1>
    </div>
  );
}
