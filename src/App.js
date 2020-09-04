import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Paper, CssBaseline } from "@material-ui/core";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "react-calendar/dist/Calendar.css";
import SelectTimes from "./pages/SelectTimes";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Allocation from "./pages/Allocation";
import LoginRoute from "./components/LoginRoute";
import UserDetails from "./pages/UserDetails";
import Email from "./pages/Email";

import ChangePassword from "./pages/ChangePassword";
import { AuthProvider } from "./contexts/AuthContext";

import "fontsource-source-sans-pro";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CreateTimes from "./pages/CreateTimes";

function App() {
  const theme = createMuiTheme({
    typography: {
      // Use the system font.
      fontFamily: "Source Sans Pro",
    },
    palette: {
      primary: {
        light: "#5dd7a9",
        main: "#1da57a",
        dark: "#00754e",
        contrastText: "#ffffff",
      },
      secondary: {
        light: "#2a3a50",
        main: "#001428",
        dark: "#000000",
        contrastText: "#ffffff",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1430,
        xl: 1920,
      },
    },
    shadows: ["none"],
    overrides: {
      MuiButton: {
        root: {
          textTransform: "none",
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper>
        <AuthProvider>
          <Router>
            <Switch>
              <Route path="/privacypolicy" component={PrivacyPolicy} />
              <LoginRoute path="/login" component={Login} />
              <ProtectedRoute path="/allocation" component={Allocation} />
              <ProtectedRoute exact path="/" component={UserDetails} />
              <ProtectedRoute path="/times" component={SelectTimes} />
              <ProtectedRoute
                path="/changepassword"
                component={ChangePassword}
              />
              <AdminRoute path="/sendemail" component={Email} />
              <AdminRoute path="/createtimes" component={CreateTimes} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Router>
        </AuthProvider>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
