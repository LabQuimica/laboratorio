import { redirect } from "next/navigation";

export function Welcome() {
  redirect("menu/dashboard");
}

export default Welcome;
