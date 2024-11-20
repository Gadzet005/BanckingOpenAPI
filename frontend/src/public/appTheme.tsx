import { createTheme } from "@mui/material";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { LinkProps } from "@mui/material/Link";
import React from "react";
import * as materialLocales from "@mui/material/locale";
import * as dataGridLocales from "@mui/x-data-grid/locales";
import { mochaColors } from "./colors";

declare module "@mui/material/styles" {
  interface Palette {
    mochaBase: Palette["primary"];
    mochaMantle: Palette["primary"];
    mochaCrust: Palette["primary"];
  }

  interface PaletteOptions {
    mochaBase?: PaletteOptions["primary"];
    mochaMantle?: PaletteOptions["primary"];
    mochaCrust?: PaletteOptions["primary"];
  }
}

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});

export const appTheme = createTheme(
  {
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
              backgroundColor: mochaColors.base,
            },
          },
        },
      },
    },
    palette: {
      mode: "dark",
      primary: {
        main: mochaColors.blue,
        dark: mochaColors.blue,
      },
      error: {
        main: mochaColors.red,
        dark: mochaColors.red,
      },
      success: {
        main: mochaColors.green,
        dark: mochaColors.green,
      },
      info: {
        main: mochaColors.sapphire,
        dark: mochaColors.sapphire,
      },
      text: {
        secondary: mochaColors.subtext1,
        primary: mochaColors.text,
      },
      mochaBase: {
        main: mochaColors.base,
        dark: mochaColors.base,
      },
      mochaMantle: {
        main: mochaColors.mantle,
        dark: mochaColors.mantle,
      },
      mochaCrust: {
        main: mochaColors.crust,
        dark: mochaColors.crust,
      },
    },
  },
  materialLocales.ruRU,
  dataGridLocales.ruRU,
);
