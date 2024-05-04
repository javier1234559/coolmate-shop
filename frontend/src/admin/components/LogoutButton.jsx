import { useLogout } from "@refinedev/core";

export const LogoutButton = () => {
  const { mutate: logout } = useLogout();

  return <button onClick={() => logout()}>Logout</button>;
};