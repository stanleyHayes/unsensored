import React from "react";
import { Box, Typography, keyframes } from "@mui/material";
import Layout from "../../components/layout/layout";
import PageBanner from "../../components/shared/page-banner";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
`;

const Section = ({ title, children }) => (
    <Box sx={{ mb: 4 }}>
        <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 1.5, letterSpacing: "-0.01em", fontSize: "1.05rem" }}
        >
            {title}
        </Typography>
        {children}
    </Box>
);

const Body = ({ children }) => (
    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: "0.88rem", mb: 1.5 }}>
        {children}
    </Typography>
);

const PrivacyPage = () => {
    return (
        <Layout>
            <Box sx={{ animation: `${fadeIn} 0.3s ease-out` }}>
                <PageBanner
                    title="Privacy Policy"
                    description="How we collect, use, and protect your information."
                    gradient="linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)"
                />

                <Box
                    sx={{
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                        p: { xs: 3, sm: 4 },
                    }}
                >
                    <Body>
                        Last updated: March 21, 2026
                    </Body>

                    <Section title="1. Information We Collect">
                        <Body>
                            <strong>Account Information.</strong> When you create an account, we collect
                            your name, email address, username, and password (stored in hashed form). You
                            may also provide an optional profile photo and bio.
                        </Body>
                        <Body>
                            <strong>Content.</strong> We store the articles, comments, and other content
                            you publish on the Platform, along with associated metadata such as timestamps
                            and edit history.
                        </Body>
                        <Body>
                            <strong>Usage Data.</strong> We automatically collect information about how
                            you interact with the Platform, including pages visited, articles viewed,
                            search queries, device type, browser type, IP address, and referring URLs.
                        </Body>
                        <Body>
                            <strong>Cookies.</strong> We use essential cookies to maintain your session
                            and authentication state. We may also use analytics cookies to understand
                            how the Platform is used. You can disable non-essential cookies in your
                            browser settings.
                        </Body>
                    </Section>

                    <Section title="2. How We Use Your Information">
                        <Body>
                            We use the information we collect to provide, maintain, and improve the
                            Platform; authenticate your identity and secure your account; display your
                            articles and profile to other users; send you important notifications about
                            your account and activity; analyze usage patterns to improve the user experience;
                            and respond to your inquiries and support requests.
                        </Body>
                        <Body>
                            We do not sell your personal information to third parties. We do not use your
                            data for targeted advertising.
                        </Body>
                    </Section>

                    <Section title="3. Third-Party Services">
                        <Body>
                            <strong>Cloudinary.</strong> We use Cloudinary for image hosting and
                            optimization. When you upload a profile photo or article image, it is
                            stored on Cloudinary's servers. Cloudinary's use of your data is governed
                            by their own privacy policy.
                        </Body>
                        <Body>
                            <strong>Hosting and Infrastructure.</strong> The Platform is hosted on
                            third-party cloud infrastructure providers. These providers may process
                            your data as part of delivering the service but do not have independent
                            rights to use your information.
                        </Body>
                    </Section>

                    <Section title="4. Data Security">
                        <Body>
                            We take reasonable measures to protect your personal information from
                            unauthorized access, alteration, disclosure, or destruction. These measures
                            include encrypted password storage, HTTPS encryption for all data in transit,
                            and regular security reviews.
                        </Body>
                        <Body>
                            However, no method of transmission over the Internet or electronic storage
                            is completely secure. While we strive to protect your information, we cannot
                            guarantee its absolute security.
                        </Body>
                    </Section>

                    <Section title="5. Data Retention">
                        <Body>
                            We retain your account information and content for as long as your account
                            is active. If you delete your account, we will remove your personal information
                            and content within a reasonable time frame, except where retention is required
                            by law or for legitimate business purposes (such as resolving disputes).
                        </Body>
                    </Section>

                    <Section title="6. Your Rights">
                        <Body>
                            You have the right to access and review the personal information we hold
                            about you; correct inaccurate or incomplete information; delete your account
                            and associated data; export your content; and withdraw consent for non-essential
                            data processing at any time.
                        </Body>
                        <Body>
                            To exercise any of these rights, please contact us at the email address below.
                            We will respond to your request within a reasonable time frame.
                        </Body>
                    </Section>

                    <Section title="7. Children's Privacy">
                        <Body>
                            The Platform is not directed at children under 13. We do not knowingly
                            collect personal information from children under 13. If you believe a child
                            under 13 has provided us with personal information, please contact us and
                            we will take steps to remove that information.
                        </Body>
                    </Section>

                    <Section title="8. Changes to This Policy">
                        <Body>
                            We may update this Privacy Policy from time to time. When we make significant
                            changes, we will notify you through the Platform or by email. Your continued
                            use of the Platform after changes are posted constitutes your acceptance of
                            the updated policy.
                        </Body>
                    </Section>

                    <Section title="9. Contact Us">
                        <Body>
                            If you have questions, concerns, or requests regarding this Privacy Policy
                            or our data practices, please contact us at{" "}
                            <Typography
                                component="a"
                                href="mailto:hayfordstanley@gmail.com"
                                variant="body2"
                                sx={{ color: "primary.main", textDecoration: "none", fontWeight: 600, fontSize: "0.88rem" }}
                            >
                                hayfordstanley@gmail.com
                            </Typography>
                        </Body>
                    </Section>
                </Box>
            </Box>
        </Layout>
    );
};

export default PrivacyPage;
