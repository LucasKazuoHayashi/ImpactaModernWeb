import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import { useRouter } from "next/navigation";

import { authService } from "@/services/auth.service";
import { Container } from "@mui/material";

export default function LoginPage() {
  const router = useRouter();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const defaultTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "light" : "dark",
        },
      }),
    [prefersDarkMode]
  );

  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function signIn() {
    const isLogged = await authService.login(login, password);
    if (isLogged) {
      router.replace("home");
    } else {
      alert("Login/senha inválido(a)!");
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: prefersDarkMode ? "white" : "black",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "secondary.main",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <TextField
            required
            focused
            fullWidth
            id="username"
            label="UserName"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setLogin(e.target.value)}
            sx={{
              mt: 4,
            }}
            inputProps={{
              style: {
                color: prefersDarkMode ? "white" : "black",
              },
            }}
            variant="outlined"
          />
          <TextField
            required
            focused
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mt: 4,
            }}
            inputProps={{
              style: {
                color: prefersDarkMode ? "white" : "black",
              },
            }}
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={signIn}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
