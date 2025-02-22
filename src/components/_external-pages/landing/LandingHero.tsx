import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import flashFill from "@iconify/icons-eva/flash-fill";
// next
import NextLink from "next/link";
// material
import { styled } from "@mui/material/styles";
import { Box, Link, Stack, Button, Container, Typography } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
//
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up("md")]: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    position: "fixed",
    alignItems: "center",
  },
}));

const ContentStyle = styled((props: any) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    maxWidth: 520,
    margin: "auto",
    textAlign: "center",
    position: "relative",
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up("md")]: {
      margin: "unset",
      textAlign: "left",
    },
  })
);

const HeroOverlayStyle = styled(motion.img)({
  zIndex: 9,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: "100%",
  margin: "auto",
  position: "absolute",
  [theme.breakpoints.up("lg")]: {
    right: "8%",
    width: "auto",
    height: "48vh",
  },
}));

// ----------------------------------------------------------------------

export default function LandingHero() {
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <HeroOverlayStyle
          alt="overlay"
          src="/static/overlay.svg"
          variants={varFadeIn}
        />

        <HeroImgStyle
          alt="hero"
          src="/static/home/hero.png"
          variants={varFadeInUp}
        />

        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Typography variant="h2" sx={{ color: "common.white" }}>
                Supply Chain <br />
                Analytics Dashboard <br /> by
                <Typography
                  component="span"
                  variant="h2"
                  sx={{ color: "primary.main" }}
                >
                  &nbsp; Mark Chege
                </Typography>
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Typography sx={{ color: "common.white" }}>
                SaaS platform for procurement management, selling to food and
                agricultural businesses as your users. Use our
                platform to oversee procurement activities across most
                countries and multiple regions within a country
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <NextLink href={PATH_DASHBOARD.root} legacyBehavior>
                <Button
                  size="large"
                  variant="contained"
                  startIcon={<Icon icon={flashFill} width={20} height={20} />}
                >
                  Live Preview
                </Button>
              </NextLink>
            </motion.div>

            <Stack
              direction="row"
              spacing={1.5}
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <motion.img
                variants={varFadeInRight}
                src="/static/home/ic_material.svg"
              />
              <motion.img
                variants={varFadeInRight}
                src="/static/home/ic_react.svg"
              />
              <motion.img
                variants={varFadeInRight}
                src="/static/home/ic_js.svg"
              />
              <motion.img
                variants={varFadeInRight}
                src="/static/home/ic_ts.svg"
              />
            </Stack>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: "100vh" } }} />
    </>
  );
}
