import Image from "next/image";
import { Box, Typography, Button, Stack, List } from "@mui/material";
import Footer from "./shared/Footer";
import styles from "./page.module.css";
import GradientLine from "./shared/GradientLine";
import { AutoStories, Code, PhoneIphone, VideogameAsset } from "@mui/icons-material";
import { ReactElement } from "react";
import Link from "next/link";

interface SocialLogoButton {
  label: string;
  imageSrc: string;
  alt: string;
  href: string;
}

interface CardContent {
  label: string;
  icon: ReactElement;
  text: string;
}

export default function LandingPage() {
  const renderLogoButtons = (items: SocialLogoButton[]) =>
    items.map(
      ({ label, imageSrc, alt, href }: SocialLogoButton, index: number) => (
        <Button 
          component="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialItem} 
          key={index}
        >
          <Box className={styles.socialLogoPlaceholder}>
            <Image src={imageSrc} width={50} height={50} alt={alt} />
          </Box>
          <Box className={styles.socialText}>
            <Typography component="span" className={styles.socialDesc}>
              {label}
            </Typography>
          </Box>
        </Button>
      ),
    );

  const renderCards = (items: CardContent[]) => {
    return (
      <Box className={styles.featuresGrid}>
        {items.map(({ icon, label, text }: CardContent, index: number) => (
          <Box key={index} className={styles.featureCard}>
            <Box className={styles.featureCardBackground}>
              {icon}
              <Typography variant="h6" className={styles.featureTitle}>
                {label}
              </Typography>
              <Typography variant="body2" className={styles.featureDesc}>
                {text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  const renderPhotos = (items: number[]) => {
    return (
      <Box className={styles.carouselContainer}>
        <Box className={styles.carouselTrack}>
          {/* Three times for smooth animation without empty spaces */}
          {[...items, ...items, ...items].map((item, index) => (
            <Box key={index} className={styles.carouselImagePlaceholder}>
              Photo {item}
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  const lorem = "Lorem ipsum, dolor sit amet consectetur elit. ";
  const cardContent: CardContent[] = [
    {
      icon: <AutoStories fontSize="inherit" className={styles.iconPlaceholder} />,
      label: "Placeholder 1",
      text: lorem,
    },
    {
      icon: <Code fontSize="inherit" className={styles.iconPlaceholder} />,
      label: "Placeholder 2",
      text: lorem,
    },
    {
      icon: <VideogameAsset fontSize="inherit" className={styles.iconPlaceholder} />,
      label: "Placeholder 3",
      text: lorem,
    },

    {
      icon: <PhoneIphone fontSize="inherit" className={styles.iconPlaceholder} />,
      label: "Placeholder 3",
      text: lorem,
    },
  ];

  const logoButtons: SocialLogoButton[] = [
    {
      label: "Instagram",
      alt: "ig_logo",
      imageSrc: "/ig_logo.svg",
      href: "https://www.instagram.com/gdg_pw/",
    },
    {
      label: "Github",
      alt: "gh_logo",
      imageSrc: "/github_logo.svg",
      href: "https://github.com/gdg-pw",
    },
    {
      label: "GDG",
      alt: "gdg_logo",
      imageSrc: "/gdg_logo.svg",
      href: "https://gdg.community.dev/",
    },
  ];

  const photosContent = [1, 2, 3, 4, 5];

  return (
    <Box className={styles.container}>
      <Box component="main" className={styles.hero}>
        {/* Main content */}
        <Box className={styles.heroContent}>
          <Typography variant="h1" className={styles.title}>
            Learn how to code with corgi!
          </Typography>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              className={`${styles.btn} ${styles.btnLarge}`}
            >
              Play
            </Button>
          </Link>
        </Box>

        {/* Corgi  */}
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

      {/* Cards */}
      <Box component="section" className={styles.featuresSection}>
        <Typography variant="h2" className={styles.sectionTitle}>
          Why Codium?
        </Typography>
        {renderCards(cardContent)}
      </Box>

      {/* Carousel Photos */}
      <Box component="section" className={styles.carouselSection}>
        <Typography variant="h2" className={styles.sectionTitle}>
          Features
        </Typography>
        {renderPhotos(photosContent)}
      </Box>

      {/* Tab at the bottom */}
      <GradientLine />
      <Stack component="section" direction="row" className={styles.socialBar}>
        <Box sx={{ mr: "auto" }}>
          <Footer />
        </Box>
        <List>{renderLogoButtons(logoButtons)}</List>
      </Stack>
    </Box>
  );
}
