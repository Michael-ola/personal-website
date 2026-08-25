export type EducationItem = {
  degree: string;
  institution?: string;
  institutions?: {
    name: string;
    degreeTitle: string;
    location: string;
  }[];
  location?: string;
  period: string;
  status: string;
  focus: string;
};

export const education: EducationItem[] = [
  {
    degree: "Erasmus Mundus Joint Master's in Electric Vehicle Propulsion and Control (E-PiCo+)",
    period: "2025 — 2027 (expected)",
    status: "Current",
    institutions: [
      {
        name: "École Centrale de Nantes",
        degreeTitle: "MSc Automatic, Control & Robotics — Electric Vehicle Propulsion and Control",
        location: "Nantes, France",
      },
      {
        name: "University POLITEHNICA of Bucharest",
        degreeTitle: "Master's in Electric Vehicle Propulsion and Control Systems",
        location: "Bucharest, Romania",
      },
      {
        name: "University of L'Aquila",
        degreeTitle: "Master's in Control Systems & Automation Engineering",
        location: "L'Aquila, Italy",
      },
    ],
    focus:
      "Control systems, electric drives, embedded systems, power electronics, estimation and machine learning for autonomous systems.",
  },
  {
    degree: "B.Eng. Electrical & Electronics Engineering",
    institution: "Federal University of Technology, Minna (FUTMinna)",
    location: "Minna, Nigeria",
    period: "Completed 2023",
    status: "Completed",
    focus:
      "Electrical and electronics engineering with project work spanning embedded systems, IoT, control, software and intelligent systems.",
  },
];
