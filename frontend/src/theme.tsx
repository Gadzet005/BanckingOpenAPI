import { createTheme } from "@mui/material";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { LinkProps } from "@mui/material/Link";
import React from "react";

declare module "@mui/material/styles" {
  interface Palette {
    mochaBase: Palette["primary"];
    mochaMantle: Palette["primary"];
    mochaCrust: Palette["primary"];
    mochaText: Palette["primary"];
  }

  interface PaletteOptions {
    mochaBase?: PaletteOptions["primary"];
    mochaMantle?: PaletteOptions["primary"];
    mochaCrust?: PaletteOptions["primary"];
    mochaText?: PaletteOptions["primary"];
  }
}

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});

export const darkTheme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          '&[role="menu"]': {
            backgroundColor: "#1e1e2e",
          },
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#89b4fa",
      dark: "#89b4fa",
    },
    error: {
      main: "#f38ba8",
      dark: "#f38ba8",
    },
    success: {
      main: "#a6e3a1",
      dark: "#a6e3a1",
    },
    info: {
      main: "#74c7ec",
      dark: "#74c7ec",
    },
    text: {
      secondary: "#cdd6f4",
      primary: "#cdd6f4",
    },
    mochaBase: {
      main: "#1e1e2e",
      dark: "#1e1e2e",
    },
    mochaMantle: {
      main: "#181825",
      dark: "#181825",
    },
    mochaCrust: {
      main: "#11111b",
      dark: "#11111b",
    },
    mochaText: {
      main: "#cdd6f4",
      dark: "#cdd6f4",
    },
  },
});
