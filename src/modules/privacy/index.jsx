'use client';

import PrivacyView from './view';

export default function PrivacyContainer() {
  const lastUpdated = "January 21, 2026";

  const sections = [
    {
      title: "Information We Collect",
      icon: "Database",
      points: [
        {
          subtitle: "Account Information",
          text: "When you sign up, we collect personal details such as your full name, email address, and gender to personalize your experience and this information also helps us create and manage your user profile securely.",
        },
        {
          subtitle: "Todo Data",
          text: "We store all the tasks you create, including titles, descriptions, priorities, categories, due dates, and timestamps such as created and updated dates to help you manage your work efficiently.",
        },
      ],
    },
    {
      title: "How We Use Your Information",
      icon: "Eye",
      points: [
        {
          subtitle: "Service Provision",
          text: "Your information is used to operate, maintain, and continuously improve our platform, ensuring smooth task management and reliable performance.",
        },
        {
          subtitle: "Communication",
          text: "We may use your email address to send important service-related updates, security alerts, feature announcements, and respond to your support queries.",
        },
        {
          subtitle: "Analytics & Improvements",
          text: "Usage data helps us understand how users interact with the app, enabling us to optimize performance, improve usability, and introduce better features.",
        },
      ],
    },
    {
      title: "How We Protect Your Information",
      icon: "Lock",
      points: [
        {
          subtitle: "Data Encryption",
          text: "All personal data is encrypted both in transit and at rest using industry-standard encryption protocols to prevent unauthorized access.",
        },
        {
          subtitle: "Access Control",
          text: "Only authorized team members have access to sensitive user data, and all access is strictly monitored and logged.",
        },
        {
          subtitle: "Regular Security Audits",
          text: "We conduct routine security audits, vulnerability scans, and penetration tests to identify and fix potential risks.",
        },
      ],
    },
    {
      title: "Your Rights & Choices",
      icon: "UserCheck",
      points: [
        {
          subtitle: "Access & Correction",
          text: "You can review and update your personal information anytime through your account settings to keep your data accurate.",
        },
        {
          subtitle: "Data Portability",
          text: "You have the right to request a copy of your data in a commonly used, machine-readable format.",
        },
      ],
    },
  ];

  return <PrivacyView lastUpdated={lastUpdated} sections={sections} />;
}
