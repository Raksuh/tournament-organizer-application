import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./app.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { AuthProvider } from "./providers/AuthProvider";
import { RouterConfig } from "./navigation/RouterConfig";
import Copyright from "./components/Copyright/Copyright";
import AppBar from "./components/AppBar/AppBar";

const theme = createTheme();

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <AppBar />
            <Container component='main' maxWidth='md' sx={{ mb: 4 }}>
              <RouterConfig />
            </Container>
            <Box
              component='footer'
              sx={{
                py: 3,
                px: 2,
                mt: "auto",
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[200]
                    : theme.palette.grey[800],
              }}
            >
              <Container maxWidth='sm'>
                <Copyright />
              </Container>
            </Box>
          </Box>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
