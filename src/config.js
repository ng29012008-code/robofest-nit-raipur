/**
 * ROBOFEST 2026 Configuration & Constants
 * ROBOTiX Club, NIT Raipur
 * 
 * NOTE FOR ORGANIZERS / EVALUATORS:
 * - Update `REGISTRATION_URL` with your official Google Form / Unstop / Portal link when registrations open.
 * - Social media links are configurable below.
 * - All event formats are illustrative festival concepts for this recruitment assignment.
 */

export const FESTIVAL_CONFIG = {
  name: "ROBOFEST 2026",
  theme: "NEON FRONTIER — THE FUTURE IS ENGINEERED",
  organizer: "ROBOTiX CLUB",
  institution: "NIT RAIPUR",
  tagline: "ENGINEER THE EXTRAORDINARY.",
  statusLabel: "INNOVATION STARTS HERE",
  year: "2026",

  // IMPORTANT: Configurable Registration URL placeholder.
  // Replace this placeholder string with the live registration form or portal URL.
  // Example: "https://unstop.com/o/robofest-nitrr" or "https://forms.gle/your-form-id"
  registrationUrl: "https://robotix.nitrr.ac.in/robofest-2026/register-placeholder",
  
  // Set to true only when official registration portal goes live
  isRegistrationLive: false,
  registrationPlaceholderNote: "Registration portal link placeholder — update `registrationUrl` in src/config.js with the live form or portal URL.",

  // Official Club Links (Replace `#` with live handles when provided)
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    twitter: "https://x.com",
  },

  // Proposed festival event concepts (illustrative)
  events: [
    {
      id: "robo-wars",
      number: "01",
      title: "ROBO WARS",
      category: "COMBAT ROBOTICS",
      tagline: "DESIGN • CONTROL • PRECISION",
      description: "Engineer your machine, refine your strategy, and prepare for a battle of design, control, and precision.",
      specifications: [
        { label: "Chassis Armor", value: "High-Tensile Hardox" },
        { label: "Weapon System", value: "Pneumatic / Kinetic Drum" },
        { label: "Control Protocol", value: "2.4GHz Low-Latency RF" }
      ],
      accentColor: "#FF6B00", // Neon Orange
      badge: "HEAVYWEIGHT ARENA",
    },
    {
      id: "robo-race",
      number: "02",
      title: "ROBO RACE",
      category: "HIGH-SPEED AUTONOMY",
      tagline: "SPEED • TRAJECTORY • AGILITY",
      description: "Push the limits of speed, navigation, and control as your robot takes on a challenging track.",
      specifications: [
        { label: "Drivetrain", value: "Brushless Dual-Motor" },
        { label: "Guidance", value: "Line & Obstacle Telemetry" },
        { label: "Max Acceleration", value: "Sub-Second Response" }
      ],
      accentColor: "#00F0FF", // Electric Blue
      badge: "PRECISION TRACK",
    },
    {
      id: "ai-challenge",
      number: "03",
      title: "AI CHALLENGE",
      category: "INTELLIGENT SYSTEMS",
      tagline: "AUTONOMY • VISION • COGNITION",
      description: "Explore intelligent systems, autonomous decision-making, and creative solutions to complex engineering problems.",
      specifications: [
        { label: "Perception Core", value: "Real-time Computer Vision" },
        { label: "Decision Engine", value: "Autonomous Edge Neural Net" },
        { label: "Problem Scope", value: "Dynamic Maze & Obstacle Matrix" }
      ],
      accentColor: "#00F0FF", // Electric Blue
      badge: "COGNITIVE TESTBED",
    }
  ],

  // Visual highlights for About / Vision section
  visionHighlights: [
    {
      number: "01",
      title: "BUILD",
      description: "From structural CAD blueprints and motor torque math to micro-controller circuits and precision PCB fabrication.",
      icon: "Cpu",
    },
    {
      number: "02",
      title: "COMPETE",
      description: "Pitting high-performance machines against rival engineering teams under intense real-time arena conditions.",
      icon: "Flame",
    },
    {
      number: "03",
      title: "INNOVATE",
      description: "Blending machine learning, adaptive sensor fusion, and rapid prototyping to shatter traditional constraints.",
      icon: "Sparkles",
    }
  ]
};
