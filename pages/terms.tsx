import React from "react";
import Layout from "@/components/Layout";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const TermsContainer = styled.div`
    padding: 20px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
    line-height: 1.6;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, sans-serif;
    font-size: 14px;
    color: #333;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
`;

const Section = styled.div`
    margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 18px;
`;

const Paragraph = styled.p`
    margin-bottom: 15px;
`;

const BoldText = styled.span`
    font-weight: bold;
`;

const List = styled.ul`
    margin-left: 20px;
    margin-bottom: 15px;
`;

const ListItem = styled.li`
    margin-bottom: 8px;
`;

const TermsPage = () => {
    const { t } = useTranslation();

    return (
        <Layout>
            <TermsContainer>
                <Title>用户服务条款</Title>

                <Section>
                    <Paragraph>
                        Godeye Inc. ("Godeye"), has created this website (the
                        "Website" or the "Site") to provide an online resource
                        for users to obtain information and data related to
                        crypto assets (i.e., cryptocurrencies). To assist you in
                        using the Website and associated Services, and to ensure
                        a clear understanding of the relationship arising from
                        your use of the Website and participation in these
                        Services, we have created (i) these Terms of Use (the
                        "Terms") and (ii) a Privacy Policy. Our Privacy Policy
                        explains how we treat information you provide to us
                        through the Site, and our Terms govern your use of our
                        Site. Our Terms and Privacy Policy apply to (a) visitors
                        to the Website who wish to obtain Data and Analytics,
                        but who do not sign up for API data feeds ("Site
                        Users"), and (b) users who have registered with Godeye
                        to receive API data feeds ("API Users"). The terms "
                        Godeye," "we" and "us" refer to Godeye Inc.
                    </Paragraph>

                    <Paragraph>
                        <BoldText>
                            PLEASE READ THIS DOCUMENT CAREFULLY BEFORE YOU
                            ACCESS OR USE THE WEBSITE OR PARTICIPATE IN OUR
                            SERVICES. BY ACCESSING THE WEBSITE, YOU AGREE TO BE
                            BOUND BY THE TERMS AND CONDITIONS SET FORTH BELOW.
                            IF YOU DO NOT WISH TO BE BOUND BY THESE TERMS AND
                            CONDITIONS, PLEASE DO NOT ACCESS OUR WEBSITE OR
                            PARTICIPATE IN OUR SERVICES.
                        </BoldText>
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>1. Your Agreement.</SectionTitle>
                    <Paragraph>
                        These Terms govern (i) your use of the Website, (ii)
                        your receipt of and participation in Godeye's services
                        offered through the Website (the "Services"), and (iii)
                        your use of information obtained through the Website,
                        including Data and Analytics, information, data,
                        statistics, software, artwork, text, video, audio,
                        pictures, content, trademarks, trade dress, and other
                        intellectual property owned by Godeye or its licensors
                        and made available to you through the Services ("Godeye
                        Content"). Please read these Terms carefully; they
                        impose legal obligations on you and on Godeye, and
                        establish our legal relationship. By using the Services
                        or accessing our Website, you are acknowledging that you
                        have read and understood these Terms and agree to be
                        legally bound by them. If you are agreeing to these
                        Terms and our Privacy Policy on behalf of a company or
                        other legal entity (your "Organization"), (i) you
                        represent and warrant that you have authority to act on
                        behalf of, and to bind your Organization and (ii) for
                        all purposes in these Terms and the Privacy Policy, the
                        term "you" means your Organization on whose behalf you
                        are acting. We do not provide data that has a direct
                        financial impact, and we our service does not provide
                        any kind of financial advice. By using our services, you
                        agree that the data provided to you is independent of
                        all possible economic effects and potential risks. IF
                        YOU DO NOT HAVE THE LEGAL AUTHORITY TO BIND YOUR
                        ORGANIZATION, YOU MUST NOT ACCESS THE WEBSITE.
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>2. Our Services: Overview.</SectionTitle>
                    <Paragraph>
                        The Website is designed to provide an online resource
                        for reviewing Data and Analytics related to crypto
                        assets. For example, you may use the Website to obtain
                        daily crypto asset data sets of either crypto asset
                        network or market data ("Data"). You may also obtain
                        correlations and other derived analytics of the various
                        Data that we or our licensors have generated
                        ("Analytics"). You may also register with the Website to
                        receive API data feeds of Data and Analytics. We may
                        also offer paid subscriptions for products from time to
                        time – if we do so, your use of such products will be
                        subject to a separate license agreement between you and
                        Godeye.
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>
                        3. Obtaining a Password or Access Credential; Protecting
                        Your Password/Credentials.
                    </SectionTitle>
                    <Paragraph>
                        We may make certain areas of the Website accessible only
                        to users that have a password or other access
                        credentials such as an API key. Please keep in mind that
                        we will treat anyone who uses your user name and
                        password/access credentials as "you." We will provide
                        this user with all of the rights and privileges that we
                        provide to you, and we will hold you responsible for the
                        activities of a person using your account. Therefore, we
                        recommend that you maintain your user name and
                        password/access credentials in confidence, and that you
                        refrain from disclosing this information to anyone
                        outside of your Organization who might "pretend" to be
                        you with respect to the Website and your participation
                        in the Services. For clarity, to the extent a single set
                        of access credentials (user name and password or API
                        key) is established for you / your Organization ("Access
                        Credentials"), these Access Credentials may be used by
                        authorized representatives within your Organization,
                        provided that you / your Organization remains
                        responsible for the use of the Website and any Godeye
                        Content obtained by anyone accessing the Website using
                        your Access Credentials. For the avoidance of doubt, you
                        shall not permit any third parties to access the Website
                        using the your Access Credentials. We also ask that you
                        notify us immediately if you suspect that someone is
                        using your user name and/or password and/or API key in
                        this or any inappropriate manner.
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>4. Grant of Rights.</SectionTitle>
                    <Paragraph>
                        <BoldText>4.1. Grant of Rights to All Users.</BoldText>
                    </Paragraph>
                    <Paragraph>
                        Subject to your compliance with the terms and conditions
                        of this Agreement, Godeye hereby grants to Site Users
                        and API Users, under Godeye' intellectual property
                        rights, a limited non·exclusive, non·transferable,
                        worldwide right (i) to access and use the Website for
                        internal business purposes, and (ii) to access, copy,
                        display, perform, and use Data and Analytics and other
                        Godeye Content for internal, non·commercial business
                        purposes pursuant to the terms of the Creative Commons
                        Attribution·NonCommercial 4.0 International (CC BY·NC
                        4.0) License (available at
                        https://creativecommons.org/licenses/by·nc/4.0/). Site
                        User (i) acknowledges and agrees that Godeye is not
                        responsible or liable for the accuracy or completeness
                        of any Data or Analytics, and (ii) shall be responsible
                        and liable for its use of the Data and Analytics.
                    </Paragraph>

                    <Paragraph>
                        <BoldText>4.2. Grant of Rights to API Users.</BoldText>
                    </Paragraph>
                    <Paragraph>
                        In addition to those rights granted to you in Section
                        4.1, Godeye hereby grants to API Users, under Godeye'
                        intellectual property rights, a limited nonexclusive,
                        non·transferable, worldwide right to access and use
                        API(s) made available by Godeye to access, copy,
                        display, and perform Data and Analytics and other Godeye
                        Content in your applications for internal,
                        non·commercial business purposes.
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>
                        5. Ownership; Reservation of Rights.
                    </SectionTitle>
                    <Paragraph>
                        The information, data, statistics, software, artwork,
                        text, video, audio, pictures, trademarks, trade dress,
                        and other intellectual property embodied in the Services
                        or the Godeye Content, including but not limited to the
                        Data and Analytics, are the proprietary property of
                        Godeye and its licensors, and are protected by
                        Singapore. and international copyright and other
                        intellectual property laws, or are used under the
                        principles of fair use. Godeye reserves the right to
                        store, use, end, or pause, in whole or in part, any user
                        generated content for all kinds of use with referencing
                        the author. Godeye and its licensors retain all rights
                        with respect to the Services and the Godeye Content
                        except those expressly granted to you in these Terms.
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>6. Restrictions.</SectionTitle>
                    <Paragraph>
                        EXCEPT AS EXPRESSLY PROVIDED HEREIN OR IF OTHERWISE
                        EXPRESSLY PERMITTED BY Godeye (e.g., to the extent made
                        available by Godeye through GitHub or subject to
                        separate license from Godeye), YOU AGREE NOT TO (i)
                        DUPLICATE, PUBLISH, DISPLAY, DISTRIBUTE, MODIFY, OR
                        CREATE DERIVATIVE WORKS FROM THE MATERIAL PRESENTED
                        THROUGH THE WEBSITE AND/OR THROUGH THE SERVICES UNLESS
                        SPECIFICALLY AUTHORIZED IN WRITING BY Godeye; OR (ii)
                        REVERSE ENGINEER, DECOMPILE, DISASSEMBLE, OR OTHERWISE
                        SEEK TO DISCOVER THE SOURCE CODE OF THE Godeye WEBSITE
                        AND UNDERLYING SOFTWARE; OR (iii) TAKE ADVANTAGE WITH
                        DATA PROVIDED BY Godeye TO BRADING ANY ASSET MANAGEMENTS
                        OR FUNDS. OR (iiii) DISTRIBUTE THE RAW DATA/ENDPOINTS TO
                        OTHER DEPARTMENTS EVEN IN THE SAME COMPANY, UNLESS YOU
                        HAVE OBTAINED PRIOR WRITTEN CONSENT FROM Godeye.
                    </Paragraph>

                    <Paragraph>
                        <BoldText>6.1. Restrictions on Use.</BoldText>
                    </Paragraph>
                    <Paragraph>
                        You agree to comply with all applicable laws, rules and
                        regulations. You will not use this site or data or
                        services for any unlawful, fraudulent, defamatory,
                        harassing, infringing, abusive, obscene, inappropriate
                        purposes. You shall not use or attempt to use any
                        "scraper,", "deep·link", "robot," "bot," "spider," "data
                        mining," "computer code," or any other automate device,
                        program, tool, algorithm, process or methodology to
                        access, acquire, copy, or monitor any portion of the
                        Service, any data or content found on or accessed
                        through the Service. You shall not attempt to violate
                        the security, or use the site's service to gain
                        unauthorized access to the Service or any parts of the
                        Service. You may neither interfere with nor attempt to
                        interfere with nor otherwise disrupt the proper working
                        of the Service. The Service is provided for information
                        purposes only. You may not copy, reproduce, recompile,
                        decompile, disassemble, reverse engineer, distribute,
                        publish, sell, display, perform, modify, transmit,
                        transfer, sell, license, upload to, edit post, frame,
                        link, or in any other way exploit any part of the
                        Service or Website. You agree to use the Service solely
                        for your internal and non·commercial purposes. This
                        service is not intended for children under the age of
                        18, and these users are not authorized to use this
                        service. By using the Service, you are representing that
                        you are at least 18 years old. By accessing the Service,
                        you represent that you are of legal age to enter into
                        legally binding agreements.
                    </Paragraph>

                    <Paragraph>
                        <BoldText>6.2. User Comments/Feedback.</BoldText>
                    </Paragraph>
                    <Paragraph>
                        Our Website may allow Site Visitors to provide comments
                        or feedback regarding our Website, the Godeye Analytics
                        System, and our Services. By providing
                        comments/feedback, you grant us the right to use your
                        comments and feedback for the purposes of improving the
                        Website, the Godeye Analytics System and our Services.
                    </Paragraph>

                    <Paragraph>
                        <BoldText>
                            6.3. Detailed description of the provided data.
                        </BoldText>
                    </Paragraph>
                    <Paragraph>
                        We are striving to provide accurate data by using all of
                        our capabilities. However, the accuracy of the data
                        referred to here does not mean that it is ERROR·FREE,
                        and/or PERFECT of any kind.
                    </Paragraph>

                    <Paragraph>
                        <BoldText>6.4. Restriction of resale.</BoldText>
                    </Paragraph>
                    <Paragraph>
                        You are allowed to use Godeye data and contents solely
                        for your own account and any resale of the Godeye
                        contents, data, and analytics is prohibited whether
                        modified or not.
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>7. Referral Program Rules.</SectionTitle>
                    <Paragraph>
                        <BoldText>
                            7.1. Requirements for being a referrer.
                        </BoldText>
                    </Paragraph>
                    <Paragraph>
                        Anyone who wishes to become a referrer must be a Godeye
                        account holder. Your acquaintances(i.e., friends, social
                        media followers) can also be referrer. Additionally your
                        referee must be a new Godeye user and can't have more
                        than one account.
                    </Paragraph>

                    <Paragraph>
                        <BoldText>
                            7.2. Representations and Warranties.
                        </BoldText>
                    </Paragraph>
                    <Paragraph>
                        Godeye wants you to share your referral link and earn
                        brokerage, but you agree that you will not: (Especially
                        as below)
                    </Paragraph>

                    <List>
                        <ListItem>
                            Try to get referees by spamming, bulk emailing, or
                            sending large numbers of unsolicited emails. The
                            only people you should be emailing are people you
                            know personally;
                        </ListItem>
                        <ListItem>
                            Use, display, or manipulate Godeye intellectual
                            property (such as Godeye logos, trademarks, and
                            copyright·protected works) in any way, except as to
                            identify yourself as a Godeye user or a Godeye
                            referrer;
                        </ListItem>
                        <ListItem>
                            Create or register any (i) businesses, (ii) URLs,
                            (iii) domain names, (iv) software application names
                            or titles, or (v) social media handles or profiles
                            that include the word "Godeye" or any of Godeye's
                            other trademarks or any words that are confusingly
                            similar to Godeye trademarks.
                        </ListItem>
                        <ListItem>
                            Purchase keywords (including, but not limited to
                            Google AdWords) that contain any of Godeye
                            trademarks;
                        </ListItem>
                        <ListItem>
                            Use automated systems or bots through any channel to
                            distribute, post, or otherwise share your referral
                            link;
                        </ListItem>
                        <ListItem>
                            Use scripts or programmed or automatic dialers to
                            send invites or otherwise share your referral link;
                        </ListItem>
                        <ListItem>
                            Make misleading claims about Godeye, use
                            offensive/abusive content, create fake
                            websites/webpages/social media profiles/apps,
                            misrepresent your connection to Godeye or otherwise
                            make any false or misleading statements to get a
                            referee to use your link; or
                        </ListItem>
                        <ListItem>
                            Use your referral link in any manner that violates
                            the law or Godeye House Rules.
                        </ListItem>
                    </List>

                    <Paragraph>
                        <BoldText>7.3. How to earn Godeye brokerage.</BoldText>
                    </Paragraph>
                    <List>
                        <ListItem>
                            Referrers get rewarded with brokerage for inviting
                            new users that purchase subscriptions. As long as
                            you and your referee follow these Rules, as well as
                            Godeye's posted policies, you should receive your
                            brokerage after your referee uses your link to sign
                            up with Godeye and makes their first payment. As a
                            result, referrers receive brokerage for their
                            purchase of any monthly/yearly subscription. To
                            receive brokerage for referring someone who orders a
                            paid plan on Godeye, your referee must be a new
                            Godeye user.
                        </ListItem>
                        <ListItem>
                            The requirements for receiving and the amounts of
                            brokerage are subject to change at Godeye's sole
                            discretion. Referral rewards in the form of Godeye
                            brokerage are not transferable, and may expire.
                            Godeye may cancel a reward at any time at its sole
                            discretion. In case your referee files a chargeback
                            or claims a refund for their paid subscription, the
                            reward that you and your referee both received from
                            Godeye will be canceled.
                        </ListItem>
                    </List>

                    <Paragraph>
                        <BoldText>7.4. Termination and changes.</BoldText>
                    </Paragraph>
                    <Paragraph>
                        Godeye reserves the right to change, end, or pause, in
                        whole or in part, any referral program, as well as any
                        referrer's or referee's ability to participate in any
                        referral program or receive Godeye brokerage at any time
                        for any reason, including suspected fraud (including by
                        either the referrer and/or referee), abuse, or any
                        violation of these Rules.
                    </Paragraph>
                    <Paragraph>
                        Godeye may update these Rules at any time.
                    </Paragraph>
                </Section>

                {/* Continuing with the remaining sections */}
                <Section>
                    <SectionTitle>8. Users Generated Content.</SectionTitle>
                    <Paragraph>
                        Godeye restricts user generated content in our service
                        as the service is designed to deliver accurate data and
                        analytics of crypto assets, and misguidance of
                        information is critical to our service. Godeye operates
                        Godeye Verified Author program, which delivers the
                        authority to generate an analysis of the crypto market
                        to only permitted group, Godeye Verified Author, with
                        expertise. As we highly appreciate the
                        intelligence·sharing of Godeye Verified Authors, we will
                        provide compensations for Godeye Verified Authors in
                        diverse aspects. Details of benefits and requirements
                        would be separately updated through Godeye Verified
                        Author Program guidelines.
                    </Paragraph>

                    <Paragraph>
                        By applying Godeye Verified Author, you agree to comply
                        with the following requirements to be Godeye Verified
                        Authors and Godeye reserves the right to deactivate
                        Godeye Verified Authors' benefits without notice in
                        advance when the requirements are not met. Under these
                        requirements, Godeye Verified Authors will:
                    </Paragraph>

                    <List>
                        <ListItem>
                            Not use a fake account and not commit identity theft
                        </ListItem>
                        <ListItem>
                            Not plagiarize, copy, and use content from other
                            sources without permission and references
                        </ListItem>
                        <ListItem>
                            Not express defamatory, threatening, or
                            discriminatory manners
                        </ListItem>
                        <ListItem>
                            Not raise contentious political, ethnic, ethical,
                            and gender discourses
                        </ListItem>
                        <ListItem>
                            Not spam, advertise, and post irrelevant materials
                        </ListItem>
                        <ListItem>
                            Not generate misleading information for personal
                            interests
                        </ListItem>
                        <ListItem>Not share vulgarity in any form</ListItem>
                        <ListItem>
                            Not seriously harm Godeye brand and business
                        </ListItem>
                        <ListItem>
                            Not pursue commercial benefits without consulting
                            with Godeye
                        </ListItem>
                    </List>
                </Section>

                <Section>
                    <SectionTitle>9. Code of Conduct.</SectionTitle>
                    <Paragraph>
                        As a condition to your use of the Website and the
                        Services, you agree to follow our Code of Conduct, set
                        out below. Under this Code, you will not:
                    </Paragraph>

                    <List>
                        <ListItem>
                            Provide false identification information to obtain
                            access to the Website or Services.
                        </ListItem>
                        <ListItem>
                            Access the Website or Services to develop or
                            implement a product or service that will act as a
                            substitute for or otherwise compete with the Website
                            or Services.
                        </ListItem>
                        <ListItem>
                            Upload, email or otherwise transmit any images or
                            other User Content that is unlawful, obscene,
                            harmful, hateful, invade the privacy of any third
                            party, contain nudity or pornography, or is
                            otherwise objectionable.
                        </ListItem>
                        <ListItem>
                            Disseminate materials that impact or invade the
                            privacy of others, such as photographs, video clips,
                            sound recordings, personally identifiable
                            information, or other materials that reveal
                            personal, private or sensitive information about
                            another person, without that person's consent.
                        </ListItem>
                        <ListItem>
                            Submit material that is intentionally false,
                            defamatory, unlawfully threatening, or unlawfully
                            harassing.
                        </ListItem>
                        <ListItem>
                            Infringe any third party's copyright, patent,
                            trademark, trade secret, or other proprietary rights
                            or rights of publicity or privacy. Electronic
                            materials – such as music, videos, games, images,
                            and text in electronic form — can easily be copied,
                            modified and sent over networks (such as the
                            Internet). These electronic materials are thus
                            extremely vulnerable to unauthorized distribution
                            and copyright infringement. These materials may not
                            be transmitted over the Website without the
                            copyright owner's permission, or without a
                            legitimate "fair use" justification for the
                            transmittal.
                        </ListItem>
                        <ListItem>
                            Transmit materials that contain any viruses, Trojan
                            horses, worms, time bombs, cancelbots, or other
                            computer·programming routines that are intended to
                            damage, detrimentally interfere with,
                            surreptitiously intercept, or expropriate any
                            system, data, or personal information.
                        </ListItem>
                        <ListItem>
                            Use the Website to artificially generate traffic or
                            page links to a website or for any other purpose not
                            expressly allowed under these Terms.
                        </ListItem>
                        <ListItem>
                            Use the Website in a manner that could disable,
                            overburden, or impair the Website or Services or
                            interfere with any other party's use and enjoyment
                            of the Website and Services, such as through sending
                            "spam" email.
                        </ListItem>
                        <ListItem>
                            Use the Website to test or reverse engineer the
                            Website in order to find limitations,
                            vulnerabilities or to evade filtering capabilities.
                        </ListItem>
                        <ListItem>
                            Seek to obtain access to any materials or
                            information through "hacking," "data harvesting,"
                            "web scraping," or through other means we have not
                            intentionally made available to you through the
                            Website.
                        </ListItem>
                        <ListItem>
                            Use VPNs, proxy servers, or other means to hide the
                            true source of traffic or to circumvent any rate
                            limits we impose on our users.
                        </ListItem>
                        <ListItem>
                            Use the Website for any purpose that is unlawful or
                            prohibited by these Terms. For example, you will not
                            use the Website to violate any law, statute, or
                            regulation (including, without limitation, those
                            governing export control, consumer protection,
                            unfair competition, antidiscrimination, or false
                            advertising).
                        </ListItem>
                        <ListItem>
                            Godeye is not accountable for the legal
                            responsibilities of Users Generated Contents and
                            will cooperate with the Federal, and the States for
                            any infringement in criminal, and civil law.
                        </ListItem>
                    </List>
                </Section>

                {/* Additional sections would continue here */}
                <Section>
                    <SectionTitle>10. Charges; Payment Terms.</SectionTitle>

                    <Paragraph>
                        <BoldText>10.1. Subscription Fees.</BoldText>
                    </Paragraph>
                    <Paragraph>
                        In exchange for access to the Website and Services,
                        Registered Users shall pay to Godeye subscription fee
                        (the "Subscription Fee"), as set forth in the
                        registration screen at the time of registration. Godeye
                        reserves the right to increase its Subscription Fees in
                        the event its costs for access to any third party Data
                        and Analytics included in the Godeye Content increase.
                        Godeye will use commercially reasonable efforts to
                        provide advance notice of any fee increases. The
                        subscription fee is paid in advance and is
                        non·refundable. Payment must be made through approved
                        payment methods as stated on the website.
                    </Paragraph>

                    <Paragraph>
                        <BoldText>10.2. Automatic Debit.</BoldText>
                    </Paragraph>
                    <Paragraph>
                        If you provide recurring payment information for
                        automatic debit of the Subscription Fee, you authorize
                        Godeye to debit your credit card, checking or savings
                        account designated by you at the time of registration
                        (or as you may update such information thereafter) on a
                        recurring basis for the Subscription Fees. By default,
                        Godeye subscription creates a subscription schedule
                        based on the date the customer subscribes to a plan. For
                        example, if a customer subscribes to a monthly plan on
                        17th Jan, the first payment of the product is executed
                        on 17th Jan, the second payment will be executed on 17th
                        Feb and will renew on a monthly basis.
                    </Paragraph>

                    <Paragraph>
                        <BoldText>10.3. Taxes.</BoldText>
                    </Paragraph>
                    <Paragraph>
                        Subscription Fees are exclusive of all federal, state
                        and local and foreign taxes, levies assessments and
                        withholdings. You shall bear and be responsible for all
                        such taxes, levies and assessments arising out of these
                        Terms, excluding only any tax based on Godeye' net
                        income.
                    </Paragraph>
                </Section>

                {/* Final sections and copyright notice */}
                <Section>
                    <SectionTitle>24. Contact Us.</SectionTitle>
                    <Paragraph>
                        If you have any questions about these Terms, the
                        practices of this Site, or your dealings with this
                        Website, please contact us at: You may contact us, for
                        any reason, by e·mail as follows: godeye2099@outlook.com
                    </Paragraph>

                    <Paragraph>
                        Effective Date: The effective date of these Terms is
                        July 22, 2022.
                    </Paragraph>

                    <Paragraph>COPYRIGHT AND LEGAL NOTICE.</Paragraph>
                    <Paragraph>
                        Copyright © 2023 Godeye Inc. All Rights Reserved.
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>25. Language.</SectionTitle>
                    <Paragraph>
                        The parties declare that they have required that these
                        Terms of Use and all documents related hereto, either
                        present or future, be drawn up in the English language
                        only.
                    </Paragraph>

                    <Paragraph>
                        Please contact us if you have any questions about our
                        Terms and Conditions. You may contact us by emailing us
                        at godeye2099@outlook.com.
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>Violations</SectionTitle>
                    <Paragraph>
                        Please report any violations of these terms to the
                        Company at godeye2099@outlook.com.
                    </Paragraph>
                </Section>
            </TermsContainer>
        </Layout>
    );
};

export default TermsPage;
