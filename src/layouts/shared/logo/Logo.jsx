import Link from "next/link";
import { styled } from "@mui/material";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <img
        src="/images/logos/VITALIAN-LOGO-DARK.png"
        alt="logo"
        style={{ width: "120px", height: "auto" }}
      />
    </LinkStyled>
  );
};

export default Logo;
