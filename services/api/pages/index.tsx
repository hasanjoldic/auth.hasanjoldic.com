import type { NextPage } from "next";

import { useForm } from "react-hook-form";

import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { EmailFieldBase, PasswordFieldBase } from "@hasan.joldic/components";

const Container = styled("div")(({ theme }) => ({
  minWidth: theme.breakpoints.values.sm,

  padding: theme.spacing(2, 4),

  display: "flex",
  flexDirection: "column",
  rowGap: theme.spacing(2),

  [theme.breakpoints.down("sm")]: {
    width: "100vw",
    padding: theme.spacing(2, 1),
  },
}));

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Box>
      <form onSubmit={handleSubmit(console.log)}>
        <Paper elevation={1}>
          <Container>
            <EmailFieldBase
              label="Email"
              {...register("email", { required: true })}
              required={true}
              error={!!errors["email"]}
              helperText={String(errors["email"]?.message || "")}
            />

            <PasswordFieldBase
              label="Password"
              {...register("password", { required: true })}
              required={true}
              error={!!errors["password"]}
              helperText={String(errors["password"]?.message || "")}
            />

            <Button type="submit" variant="outlined">
              Log in
            </Button>
          </Container>
        </Paper>
      </form>
    </Box>
  );
};

export default Home;
