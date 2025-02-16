import { ReactNode } from "react";
// next
import { useRouter } from "next/router";
// material
import { Box, Link, Container, Typography } from "@mui/material";
// components
import MainNavbar from "./MainNavbar";

// ----------------------------------------------------------------------

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const { pathname } = useRouter();

  return (
    <>
      <MainNavbar />
      <div>{children}</div>

      <Box
        sx={{
          py: 5,
          textAlign: "center",
          position: "relative",
          bgcolor: "background.default",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="caption" component="p">
            © All rights reserved
            <br /> made by &nbsp;
            <Link href="https://github.com/thegliche">Mark Chege</Link>
          </Typography>
        </Container>
      </Box>
    </>
  );
}
