import React, { useEffect } from "react";
import { Stack, Box, Typography } from "@mui/material";
import { useState } from "react";
import SideBar from "../Components/SideBar";

const Privacy = () => {
  const [selectedCategory, setSelectedCategory] = useState("Privacy");

  return (
    <div>
      <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Box p={3} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#000", marginBottom: "5px" }}
          >
            {selectedCategory}{" "}
            <span style={{ color: "#1557a5" }}>& Policy</span>
          </Typography>

          <Stack m={4}>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.6, fontSize: 16, mb: 3 }}
            >
              <span style={{ textIndent: "24px" }}>
                **The Terms of Service and Privacy Policy** for the Myanmar Idol
                Voting System are designed to outline the relationship between
                users and the platform, ensuring transparency and fairness in
                the usage of our services.
              </span>
              Our Terms of Service reflect the core principles of our business
              operations and the legal obligations that govern our company.
              These terms cover various aspects, including: * What users can
              expect from us in terms of service provision and development. *
              The rules and guidelines users must adhere to while using our
              services. * The intellectual property rights pertaining to the
              content found within our platform. * The legal rights and
              procedures in case of disputes or violations.
              <span style={{ color: "#1557a5" }}>
                It is essential for users to understand and agree to these terms
                before utilizing our services, as they form the basis of our
                relationship with our users.
              </span>
              Additionally, we also maintain a Privacy Policy that outlines how
              we handle user information, including data management, privacy
              controls, and information security practices. While the Privacy
              Policy is separate from the Terms of Service, we encourage all
              users to review it to gain a comprehensive understanding of how
              their information is collected, used, and protected within the
              Myanmar Idol Voting System platform.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
};

export default Privacy;
