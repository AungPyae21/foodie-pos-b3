import LayoutBackOffice from "@/components/LayoutBackOffice";
import { Button } from "@mui/material";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <LayoutBackOffice>
      <Button
        variant="contained"
        onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
      >
        sign in
      </Button>
    </LayoutBackOffice>
  );
};
export default SignIn;
