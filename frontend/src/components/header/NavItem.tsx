import { Button } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "../../routing/path";

interface Props {
  name: string;
  path: Path;
  isActive?: boolean;
  isActiveHandler?: () => void;
}

export const NavItem: FC<Props> = ({
  name,
  path,
  isActive = false,
  isActiveHandler = () => {},
}) => {
  const navigate = useNavigate();
  return (
    <Button
      variant={isActive ? "outlined" : "text"}
      size="large"
      onClick={() => {
        isActiveHandler();
        navigate(path);
      }}
      sx={{
        textDecoration: "none",
        color: "mochaText.main",
      }}
    >
      {name}
    </Button>
  );
};
