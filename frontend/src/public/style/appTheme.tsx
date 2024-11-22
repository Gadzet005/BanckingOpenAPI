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
import type {} from "@mui/x-data-grid/themeAugmentation";

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
      warning: {
        main: mochaColors.peach,
        dark: mochaColors.peach,
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
      secondary: {
        main: mochaColors.lavender,
        dark: mochaColors.lavender,
      },
    },
    mixins: {
      MuiDataGrid: {
        containerBackground: mochaColors.mantle,
      },
    },
  },
  materialLocales.ruRU,
  dataGridLocales.ruRU,
);
