const messages = {
  mlhBadgeAlt: "Major League Hacking 2026 Hackathon Season",
  mlhBadgeHref:
    "https://mlh.io/eu?utm_source=eu-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white",
  links: [
    { name: "About", path: "/about" },

    {
      name: "Events",
      path: "/events",
      dropdown: [
        { name: "Hackathon", path: "/events/hackathon" },
        { name: "Workshops", path: "/events/workshops" },
        { name: "Talks", path: "/events/talks" },
        { name: "Mini Events", path: "/events/mini-events" }
      ]
    },

    { name: "Gallery", path: "/gallery" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Committee", path: "/committee" },
    { name: "FAQ", path: "/projects" },
    { name: "Merch Store", path: "/merch-store" },
  ],
  workWithUs: "Work With Us"
};

export default messages;
