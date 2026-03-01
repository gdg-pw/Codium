"use client";

import Image from 'next/image';
import { Box, Typography, Button, Stack, Link } from '@mui/material';
import styles from './page.module.css';

export default function LandingPage() {
  return (
    <Box className={styles.container}>
      <Box component="header" className={styles.header}>
        <Typography variant='h2' component="div" className={styles.logo}>
          <Image src="/logo1.svg" alt="GDG Logo" width={250} height={100} className={styles.logoImage} />
          GDG <span className={styles.logoIcon}>Codium</span>
        </Typography>
        
        <Box component="nav" className={styles.nav}>
          <Box className={styles.navLinks}>
            <Link href="#" underline="none" className={styles.navLink}>What we do ▼</Link>
            <Link href="#" underline="none" className={styles.navLink}>About game</Link>
            <Link href="https://github.com/gdg-pw/Codium" target="_blank" rel="noopener noreferrer" underline="none" className={styles.navLink}>Github</Link>
          </Box>
          <Button variant="contained" disableElevation className={styles.btn}>
            Login
          </Button>
        </Box>
      </Box>

      <Box className={styles.colorBar} />

      <Box component="main" className={styles.hero}>
        <Box className={styles.heroContent}>
          <Typography variant="h1" className={styles.title}>
            Codium
          </Typography>
          <Typography variant="body1" className={styles.subtitle}>
            Learn how to code with corgi!
          </Typography>
          <Button variant="contained" disableElevation className={`${styles.btn} ${styles.btnLarge}`}>
            Play
          </Button>
        </Box>

        <Box className={styles.heroImage}>
            <Image src="/corgi1.svg" alt="Codium Hero" width={700} height={700} priority />
        </Box>
      </Box>

      <Stack component="section" direction="row" className={styles.socialBar}>
        
        <Link href="https://www.instagram.com/gdg_pw/" target="_blank" rel="noopener noreferrer" underline="none" className={styles.socialItem}>
          <Box className={styles.socialLogoPlaceholder}>
            <Image src={"/ig_logo.svg"} alt='GDG' width={50} height={50}/>
          </Box>
          <Box className={styles.socialText}>
            <Typography component="span" className={styles.socialDesc}>Instagram</Typography>
          </Box>
        </Link>

        <Link href="https://github.com/gdg-pw" target="_blank" rel="noopener noreferrer" underline="none" className={styles.socialItem}>
          <Box className={styles.socialLogoPlaceholder}>
            <Image src={"/github_logo.svg"} alt='GDG' width={50} height={50}/>
          </Box>
          <Box className={styles.socialText}>
            <Typography component="span" className={styles.socialDesc}>GitHub</Typography>
          </Box>
        </Link>

        <Link href="https://gdg.community.dev/" underline="none" className={styles.socialItem}>
          <Box className={styles.socialLogoPlaceholder}>
            <Image src={"/gdg_logo.svg"} alt='GDG' width={50} height={50}/>
          </Box>
          <Box className={styles.socialText}>
            <Typography component="span" className={styles.socialDesc}>Google Developer Groups</Typography>
          </Box>
        </Link>
        
      </Stack>
    </Box>
  );
}