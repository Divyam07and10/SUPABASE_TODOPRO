'use client';

import TermsView from './view';

export default function TermsContainer() {
    const lastUpdated = "January 21, 2026";

    const termsContent = [
        {
            title: "Acceptance of Terms",
            icon: "FileText",
            points: [
                "By accessing and using TodoPro, you accept and agree to be bound by the terms and provision of this agreement.",
                "If you do not agree to abide by the above, please do not use this service.",
                "These terms apply to all visitors, users, and others who access or use the service.",
            ],
        },
        {
            title: "User Accounts",
            icon: "Users",
            points: [
                "You must provide accurate and complete information when creating an account.",
                "You are responsible for maintaining the confidentiality of your account credentials.",
                "You agree to notify us immediately of any unauthorized use of your account.",
                "We reserve the right to suspend or terminate accounts that violate these terms.",
            ],
        },
        {
            title: "Acceptable Use",
            icon: "ShieldCheck",
            points: [
                "You may use TodoPro only for lawful purposes and in accordance with these terms.",
                "You agree not to use the service to store or share illegal content.",
                "You agree not to interfere with the proper functioning of the service.",
                "Any unauthorized use may result in termination of your account.",
            ],
        },
        {
            title: "Intellectual Property",
            icon: "Gavel",
            points: [
                "TodoPro and its original content, features, and functionality are owned by TodoPro and are protected by international copyright laws.",
                "You may not reproduce or distribute any material without permission.",
            ],
        },
    ];

    return <TermsView lastUpdated={lastUpdated} termsContent={termsContent} />;
}
