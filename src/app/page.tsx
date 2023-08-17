import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import UserCard from "./components/UserCard";

export default async function Home() {
  const session = await getServerSession(options);
  //Necesito usar redux
  return <h1>Hello bro</h1>;
}
