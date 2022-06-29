import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.white,
    opacity: 0.85,

    "&:hover": {
      opacity: 1,
      backgroundColor: theme.colors[theme.primaryColor][5],
    },
  },

  active: {
    opacity: 1,
    "&, &:hover": {
      backgroundColor: theme.colors[theme.primaryColor][7],
    },
  },
}));
