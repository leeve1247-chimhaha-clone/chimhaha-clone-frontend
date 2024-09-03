import axios from "axios";
import { useAuth } from "react-oidc-context";

export async function getList() {
  const auth = useAuth();
  try {
    const myData = await axios.get(
      "http://192.168.1.14:8080/myAccount?username=userC",
      {
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      },
    );
    console.log(myData);
  } catch (error) {
    console.log(error);
  }
}