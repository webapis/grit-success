import React from "react";
import { Container, Grid, Link, Typography } from "@mui/material";
const domainname=process.env.domainname
const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "lightgrey", // Replace with your desired background color
        padding: 20,
        marginTop:50
      }}
    >
      <Container maxWidth="lg">
   
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} Glumzi.com. Her hakkı saklıdır. glumzi.land@gmail.com
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;