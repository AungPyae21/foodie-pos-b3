import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
        >
          sign in with google
        </Button>
      </Box>
    </Box>
  );
};
export default SignIn;
