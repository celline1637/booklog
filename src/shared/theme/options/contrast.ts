import { grey } from "@/shared/theme/palette";
import { customShadows } from "@/shared/theme/custom-shadows";

// ----------------------------------------------------------------------

export function createContrast(
  contrast: "default" | "bold",
  mode: "light" | "dark"
) {
  const theme = {
    ...(contrast === "bold" &&
      mode === "light" && {
        palette: {
          background: {
            default: grey[200],
          },
        },
      }),
  };

  const components = {
    ...(contrast === "bold" && {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: customShadows(mode).z1,
          },
        },
      },
    }),
  };

  return {
    ...theme,
    components,
  };
}
