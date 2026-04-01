"use client";

import Image from "next/image";
import { Box, Typography, Button, Stack, Link, List } from "@mui/material";
import Footer from "./shared/Footer";
import styles from "./page.module.css";
import GradientLine from "./shared/GradientLine";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const renderLogoButtons = (items) =>
    items.map(({ label, imageSrc, alt, onClick}, index) => (
      <Button
          onClick={onClick}
          className={styles.socialItem}
          key={index}
        >
          <Box className={styles.socialLogoPlaceholder}>
            <Image src={imageSrc}  width={50} height={50} alt={alt} />
          </Box>
          <Box className={styles.socialText}>
            <Typography component="span" className={styles.socialDesc}>
              {label}
            </Typography>
          </Box>
        </Button>
    ));

  const logoButtons = [
    {
      label: "Instagram",
      alt:"ig_logo",
      imageSrc: "/ig_logo.svg",
      onClick: () => {router.push("https://www.instagram.com/gdg_pw/")},
    },
    {
      label: "Github",
      alt: "gh_logo",
      imageSrc: "/github_logo.svg",
      onClick: () => {router.push("https://github.com/gdg-pw")},
    },
    {
      label: "GDG",
      alt: "gdg_logo",
      imageSrc: "/gdg_logo.svg",
      onClick: () => {router.push("https://gdg.community.dev/")},
    }
  ]

   return (
    <Box className={styles.container}>
      <Box component="main" className={styles.hero}>


        <Box className={styles.heroContent}>
          <Typography variant="h1" className={styles.title}>
            Codium
          </Typography>
          <Typography variant="body1" className={styles.subtitle}>
            Learn how to code with corgi!
          </Typography>
          <Button
            variant="contained"
            disableElevation
            className={`${styles.btn} ${styles.btnLarge}`}
          >
            Play
          </Button>
        </Box>

        <Box className={styles.heroImage}>
          <Image
            src="/corgi1.svg"
            alt="Codium Hero"
            width={700}
            height={700}
            priority
          />
        </Box>
      </Box>


      {/* Tab at the bottom */}
      <GradientLine/>
      <Stack component="section" direction="row" className={styles.socialBar}>
        <Footer/>
        <List>{renderLogoButtons(logoButtons)}</List>
      </Stack>
    </Box>
  );
}
