import { Button } from "@mantine/core";
import { useLogout } from "./auth/auth.helper";

function App() {
  const { logout } = useLogout();
  return <Button onClick={logout}>logout</Button>;
}

export default App;
