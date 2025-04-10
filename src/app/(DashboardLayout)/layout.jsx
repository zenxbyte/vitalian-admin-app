"use client";
import React, { useState } from "react";
import { styled, Container, Box } from "@mui/material";
import Header from "../../layouts/header/Header";
import SideBar from "../../layouts/sidebar/sidebar";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

export default function RootLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleDrawer = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <MainWrapper className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <SideBar isOpen={isSidebarOpen} toggleDrawer={toggleDrawer} />
      {/* <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      /> */}
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper className="page-wrapper">
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header toggleMobileSidebar={toggleDrawer} />
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        >
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
