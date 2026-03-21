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

const AboutPage = () => {
    return (
        <Layout>
            <Box sx={{ animation: `${fadeIn} 0.3s ease-out` }}>
                <PageBanner
                    title="About Unsensored"
                    description="A free, open platform for sharing unfiltered ideas, articles, and discussions."
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
                    <Section title="Our Mission">
                        <Body>
                            Unsensored exists because we believe that ideas deserve to be heard. In an era
                            of increasing content moderation and algorithmic gatekeeping, we created a space
                            where writers, thinkers, and creators can share their perspectives without fear
                            of arbitrary censorship.
                        </Body>
                        <Body>
                            Our mission is simple: to provide a free and open platform where meaningful
                            discourse can flourish. Whether you are a seasoned journalist, an independent
                            blogger, or someone with a story to tell, Unsensored gives you the tools to
                            publish, connect, and engage with a community that values honest expression.
                        </Body>
                    </Section>

                    <Section title="What We Believe">
                        <Body>
                            <strong>Free Expression.</strong> We believe that the free exchange of ideas is
                            the foundation of progress. Every voice matters, and every perspective has the
                            potential to spark important conversations.
                        </Body>
                        <Body>
                            <strong>Community.</strong> Great writing does not happen in isolation. Unsensored
                            is built around a community of readers and writers who challenge each other,
                            support one another, and engage in thoughtful dialogue.
                        </Body>
                        <Body>
                            <strong>Quality Discourse.</strong> Freedom of expression comes with
                            responsibility. We encourage well-reasoned arguments, original thinking, and
                            constructive debate. The goal is not to shout the loudest but to contribute
                            something worth reading.
                        </Body>
                        <Body>
                            <strong>Transparency.</strong> We are upfront about how the platform works,
                            how your data is handled, and what our policies are. No hidden algorithms
                            deciding what you see or do not see.
                        </Body>
                    </Section>

                    <Section title="What You Can Do on Unsensored">
                        <Body>
                            Publish articles on any topic that matters to you. Build a following of readers
                            who care about what you have to say. Discover fresh perspectives from writers
                            around the world. Engage in meaningful discussions through comments and replies.
                            Curate your reading experience by following the writers and topics you love.
                        </Body>
                    </Section>

                    <Section title="Who Built This">
                        <Body>
                            Unsensored was designed and developed by Stanley Hayford, a full-stack software
                            engineer driven by curiosity, ambition, and a belief that technology should
                            empower people to speak freely and connect authentically.
                        </Body>
                        <Body>
                            Have questions, feedback, or ideas? Reach out at{" "}
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

export default AboutPage;
