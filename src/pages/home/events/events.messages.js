import { FaCode, FaGamepad, FaTrophy, FaLaptopCode } from "react-icons/fa";

import Hackathons from "../../../assets/gallery/hackathon_10y7zw.jpg";
import GameJams from "../../../assets/gallery/gamejam_2tr2hu.jpg";
import Workshops from "../../../assets/gallery/pawnSussex_hfjot2.jpg";
import CodersCup from "../../../assets/gallery/codersCup_2a6lfl.jpg";

const messages = {
  pageTitle: "Our most popular events",

  eventTypes: [
    {
      id: "hackathons",
      icon: FaLaptopCode,
      image: Hackathons,
      title: "Hackathons",
      description:
        "High-energy weekend events where teams build innovative projects from scratch.",
    },
    {
      id: "gamejams",
      icon: FaGamepad,
      image: GameJams,
      title: "Game Jams",
      description:
        "Create games under time pressure with unique themes and challenges.",
    },
    {
      id: "workshops",
      icon: FaCode,
      image: Workshops,
      title: "Workshops",
      description:
        "Hands-on learning events led by industry professionals and experienced mentors.",
    },
    {
      id: "coderscup",
      icon: FaTrophy,
      image: CodersCup,
      title: "Coder’s Cup",
      description:
        "Competitive programming challenges designed to test problem-solving skills.",
    },
  ],
};

export default messages;
