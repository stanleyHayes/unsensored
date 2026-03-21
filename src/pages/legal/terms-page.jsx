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

const TermsPage = () => {
    return (
        <Layout>
            <Box sx={{ animation: `${fadeIn} 0.3s ease-out` }}>
                <PageBanner
                    title="Terms of Service"
                    description="Please read these terms carefully before using Unsensored."
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

                    <Section title="1. Acceptance of Terms">
                        <Body>
                            By accessing or using Unsensored ("the Platform"), you agree to be bound by
                            these Terms of Service. If you do not agree to these terms, you may not use
                            the Platform. We reserve the right to update these terms at any time, and
                            continued use of the Platform after changes constitutes acceptance of the
                            revised terms.
                        </Body>
                    </Section>

                    <Section title="2. User Accounts">
                        <Body>
                            To access certain features of the Platform, you must create an account. You
                            are responsible for maintaining the confidentiality of your account credentials
                            and for all activities that occur under your account. You agree to provide
                            accurate, current, and complete information during registration and to update
                            such information as necessary.
                        </Body>
                        <Body>
                            You must be at least 13 years of age to create an account. If you are under
                            18, you represent that you have your parent or guardian's permission to use
                            the Platform.
                        </Body>
                    </Section>

                    <Section title="3. Content Ownership and License">
                        <Body>
                            You retain full ownership of all content you create and publish on Unsensored,
                            including articles, comments, and any other materials ("User Content"). By
                            posting User Content, you grant Unsensored a non-exclusive, worldwide,
                            royalty-free license to display, distribute, and promote your content on the
                            Platform and through related channels such as social media and email newsletters.
                        </Body>
                        <Body>
                            You may remove your content at any time, at which point the license granted
                            above will terminate, except where your content has been shared, referenced,
                            or cached by other users or third-party services.
                        </Body>
                    </Section>

                    <Section title="4. Acceptable Use">
                        <Body>
                            Unsensored is committed to free expression. However, to maintain a functional
                            and safe community, the following content and behaviors are prohibited:
                        </Body>
                        <Body>
                            Direct threats of violence against specific individuals or groups. Content that
                            is illegal under applicable law, including but not limited to child exploitation
                            material, fraud schemes, and doxxing. Spam, automated posting, or any form of
                            platform manipulation. Impersonating another person or entity. Uploading malware
                            or engaging in any activity that disrupts the Platform's infrastructure.
                        </Body>
                        <Body>
                            We reserve the right to remove content or suspend accounts that violate these
                            guidelines, though we aim to do so transparently and with clear communication.
                        </Body>
                    </Section>

                    <Section title="5. Intellectual Property">
                        <Body>
                            The Platform's design, code, branding, and original content are the intellectual
                            property of Unsensored and its developer, Stanley Hayford. You may not copy,
                            modify, or distribute any part of the Platform without prior written permission.
                        </Body>
                    </Section>

                    <Section title="6. Disclaimers">
                        <Body>
                            The Platform is provided on an "as is" and "as available" basis without
                            warranties of any kind, either express or implied, including but not limited
                            to warranties of merchantability, fitness for a particular purpose, or
                            non-infringement. We do not guarantee that the Platform will be uninterrupted,
                            error-free, or secure at all times.
                        </Body>
                        <Body>
                            User Content published on the Platform represents the views of its authors
                            and does not reflect the opinions or endorsement of Unsensored.
                        </Body>
                    </Section>

                    <Section title="7. Limitation of Liability">
                        <Body>
                            To the fullest extent permitted by law, Unsensored and its developer shall
                            not be liable for any indirect, incidental, special, consequential, or
                            punitive damages, including but not limited to loss of data, revenue, or
                            profits, arising out of or related to your use of the Platform.
                        </Body>
                        <Body>
                            In no event shall our total liability to you for all claims exceed the
                            amount you have paid to Unsensored (if any) in the twelve months preceding
                            the claim.
                        </Body>
                    </Section>

                    <Section title="8. Termination">
                        <Body>
                            We reserve the right to suspend or terminate your account at any time if
                            you violate these Terms of Service or engage in conduct that we determine
                            is harmful to the Platform or its community. You may also delete your account
                            at any time by contacting us.
                        </Body>
                        <Body>
                            Upon termination, your right to use the Platform ceases immediately. Sections
                            of these terms that by their nature should survive termination (such as
                            content licenses, disclaimers, and limitations of liability) will remain
                            in effect.
                        </Body>
                    </Section>

                    <Section title="9. Governing Law">
                        <Body>
                            These Terms shall be governed by and construed in accordance with applicable
                            law. Any disputes arising from these terms or your use of the Platform shall
                            be resolved through good-faith negotiation before pursuing formal legal action.
                        </Body>
                    </Section>

                    <Section title="10. Contact">
                        <Body>
                            If you have questions about these Terms of Service, please contact us at{" "}
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

export default TermsPage;
