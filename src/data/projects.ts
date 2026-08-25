export type Project = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  tags: string[];
  heroImage?: string;
  heroFit?: "cover" | "contain";
  heroVisual?: "image" | "agriculture-architecture";
  github?: string;
  demo?: string;
  videoEmbed?: string;
  publication?: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
  sections: { title: string; body: string }[];
  gallery?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "pmsm-sensorless-rotor-estimation",
    title: "AI-Based Sensorless Rotor Position Estimation for PMSM",
    kicker: "Control × AI",
    summary:
      "A CNN rotor-angle estimator benchmarked against an Extended Kalman Filter for inverter-fed PMSM operation, with emphasis on the low-speed observability problem.",
    tags: ["MATLAB/Simulink", "PLECS", "CNN", "EKF", "FOC", "PMSM"],
    heroImage: "/images/pmsm/system.png",
    heroFit: "contain",
    github: "https://github.com/Michael-ola/Sensorless-Estimation-of-PMSM-Rotor-Position-Using-AI",
    featured: true,
    metrics: [
      { label: "Simulation samples", value: "7.12M" },
      { label: "Windows", value: "89K" },
      { label: "CNN low-speed RMSE", value: "0.2316 rad" },
      { label: "EKF low-speed RMSE", value: "2.5316 rad" },
    ],
    sections: [
      {
        title: "Problem",
        body:
          "Conventional model-based observers become difficult to use at very low speed because back-EMF is weak and electrical observability degrades. The project asks whether a learned estimator can complement a classical EKF in that operating region.",
      },
      {
        title: "System",
        body:
          "The simulated drive combines an inverter-fed PMSM, field-oriented control, α–β current and voltage measurements, a CNN estimator and an EKF benchmark. Both estimators output electrical rotor angle.",
      },
      {
        title: "CNN estimator",
        body:
          "A 1D CNN uses windowed iα, iβ, vα and vβ signals. Angle is represented using sine/cosine targets, with offline training and online Simulink deployment. The training set was generated from time-domain simulation.",
      },
      {
        title: "Result",
        body:
          "The CNN was especially strong at low speed, where online RMSE was 0.2316 rad versus 2.5316 rad for the EKF. The EKF remained stronger at high speed, showing complementary strengths rather than a single universal winner.",
      },
    ],
    gallery: [
      { src: "/images/pmsm/plecs-foc.png", alt: "PLECS inverter-fed PMSM and control model" },
      { src: "/images/pmsm/cnn-estimator.png", alt: "CNN estimator Simulink subsystem" },
      { src: "/images/pmsm/low-speed-estimation.png", alt: "CNN estimated and real rotor position at low speed" },
      { src: "/images/pmsm/speed-region-errors.png", alt: "Error distribution by speed region" },
    ],
  },
  {
    slug: "battery-digital-twin",
    title: "Adaptive Battery Digital Twin for SOC Estimation & Fault Diagnosis",
    kicker: "Estimation × EV Systems",
    summary:
      "A 4S1P lithium-ion digital twin that estimates state of charge and internal resistance while separating sensor faults from weak-cell behavior.",
    tags: ["MATLAB/Simulink", "Kalman Filtering", "SOC", "FDI", "Battery"],
    heroImage: "/images/battery/system-architecture.png",
    heroFit: "contain",
    github: "https://github.com/Michael-ola/battery-digital-twin-soc-fault-diagnosis",
    featured: true,
    metrics: [
      { label: "Healthy residual RMS", value: "0.0222 V" },
      { label: "Sensor fault detected", value: "100 s" },
      { label: "Weak-cell isolated", value: "176 s" },
      { label: "Pack", value: "4S1P" },
    ],
    sections: [
      {
        title: "Problem",
        body:
          "Battery-management decisions depend on hidden states such as SOC and internal resistance, while sensor failures and cell degradation can produce superficially similar voltage behavior.",
      },
      {
        title: "Architecture",
        body:
          "The model separates the physical-cell and fault-injection layer, an adaptive digital-twin estimator, expected-voltage generation, residual calculation and a diagnostic layer that classifies healthy, voltage-sensor-fault and weak-cell cases.",
      },
      {
        title: "Diagnosis",
        body:
          "The diagnostic logic combines voltage residuals, estimated internal resistance and thermal response. This gives the system multiple signals for fault isolation instead of relying on a single threshold.",
      },
      {
        title: "Result",
        body:
          "The healthy voltage residual remained low, while the injected voltage-sensor fault was detected from 100 s and the weak-cell case was isolated at 176 s as resistance and temperature behavior diverged.",
      },
    ],
    gallery: [
      { src: "/images/battery/simulink-model.png", alt: "Full Simulink battery digital twin implementation" },
      { src: "/images/battery/soc-estimation.png", alt: "SOC estimation response" },
      { src: "/images/battery/voltage-residual.png", alt: "Voltage residual comparison" },
      { src: "/images/battery/fault-classification.png", alt: "BMS fault classification output" },
    ],
  },
  {
    slug: "carla-av-perception",
    title: "Adverse-Weather AV Perception Benchmark in CARLA",
    kicker: "AI × Autonomous Systems",
    summary:
      "A controlled CARLA benchmark comparing YOLOv8, DETR and Faster R-CNN for pedestrian perception and downstream braking behavior across five weather conditions.",
    tags: ["CARLA", "Python", "PyTorch", "YOLOv8", "DETR", "Faster R-CNN"],
    heroImage: "/images/av/dashboard.png",
    heroFit: "contain",
    github: "https://github.com/Michael-ola/AV-perception-benchmark-Carla",
    demo:
      "https://drive.google.com/file/d/1gHqlFC3wTr7DY9gi6xRDJ5NwYOfqKGZk/view?usp=sharing",
    videoEmbed: "https://drive.google.com/file/d/1gHqlFC3wTr7DY9gi6xRDJ5NwYOfqKGZk/preview",
    featured: true,
    metrics: [
      { label: "Models", value: "3" },
      { label: "Weather conditions", value: "5" },
      { label: "Practical winner", value: "YOLOv8n" },
      { label: "System", value: "Closed-loop" },
    ],
    sections: [
      {
        title: "Question",
        body:
          "Which detector produces the most useful pedestrian-perception behavior when visibility degrades — not just the most detections, but the best balance of misses, false positives and safe braking?",
      },
      {
        title: "Experiment",
        body:
          "The same fixed pedestrian-crossing scenario is repeated under Clear Noon, Heavy Rain, Dense Fog, Night and Rainy Night. A remote detector server receives frames and returns detections to a decision layer that can monitor or brake.",
      },
      {
        title: "Evaluation",
        body:
          "The benchmark records detection and miss rate, false-person detections, first braking distance, minimum pedestrian distance and braking behavior. A desktop launcher and results dashboard make experiments reproducible and comparable.",
      },
      {
        title: "Result",
        body:
          "Faster R-CNN often achieved strong recall but produced substantially more false-person detections. YOLOv8n gave the cleanest practical behavior and was selected as the most trustworthy real-time prototype model despite not always having the highest raw detection rate.",
      },
    ],
    gallery: [
      { src: "/images/av/launcher.png", alt: "CARLA model-comparison experiment launcher" },
      { src: "/images/av/detection-rate.png", alt: "Pedestrian detection rate across weather conditions" },
      { src: "/images/av/false-detections.png", alt: "Extra false pedestrian detections across conditions" },
      { src: "/images/av/first-brake-distance.png", alt: "First braking distance comparison" },
      { src: "/images/av/minimum-distance.png", alt: "Minimum pedestrian distance comparison" },
    ],
  },
  {
    slug: "iot-generator-control",
    title: "IoT-Based Generator Monitoring & Control System",
    kicker: "Embedded × IoT",
    summary:
      "A physical ESP32-based generator controller combining sensors, relays, remote scheduling, live fuel monitoring, a safety shutdown mechanism and a web application.",
    tags: ["ESP32", "C++", "Node.js", "MongoDB", "Sensors", "Relays"],
    heroImage: "/images/generator/generator-mounted.png",
    heroFit: "cover",
    github: "https://github.com/Michael-ola/Generator-Monitoring-and-Control",
    publication: "https://doi.org/10.1109/NIGERCON62786.2024.10927090",
    featured: true,
    metrics: [
      { label: "Test generator", value: "3.0 kVA" },
      { label: "Tank", value: "15 L" },
      { label: "Safety cutoff", value: "50 °C" },
      { label: "Mean command response", value: "1.31 s" },
    ],
    sections: [
      {
        title: "System",
        body:
          "An ESP32S NodeMCU interfaces with an ultrasonic fuel-level sensor, DHT11 temperature sensor, a four-channel relay board and a linear actuator for choke control.",
      },
      {
        title: "Remote control",
        body:
          "The web application provides generator ON/OFF control, timed operation, real-time fuel indication and historical fuel-use visualization. A Node.js/Express backend handles requests and MongoDB stores operational data.",
      },
      {
        title: "Safety",
        body:
          "Generator-room temperature is monitored continuously. When the temperature reaches the configured 50 °C safety threshold, the controller can shut the generator down to reduce fire and equipment-damage risk.",
      },
      {
        title: "Validation",
        body:
          "The complete prototype was mounted on a 3.0 kVA generator and tested repeatedly. Remote control commands produced a mean physical response time of 1.31 seconds.",
      },
    ],
    gallery: [
      { src: "/images/generator/schematic.png", alt: "Generator monitoring and control schematic" },
      { src: "/images/generator/prototype.png", alt: "Breadboard prototype with relay module and sensors" },
      { src: "/images/generator/enclosure.png", alt: "Final electronics enclosure" },
      { src: "/images/generator/webapp.png", alt: "Generator monitoring and control web interface" },
    ],
  },
  {
    slug: "solar-waste-management",
    title: "Solar-Powered Embedded Waste Management System",
    kicker: "Embedded × Sustainable Systems",
    summary:
      "A solar-powered two-bin embedded system for rural waste collection, using proximity and fill-level sensing, servo actuation and GSM notifications without requiring internet connectivity.",
    tags: ["Arduino Nano", "C++", "GSM", "Solar", "Sensors", "Servo"],
    heroImage: "/images/solar/developed-system.png",
    heroFit: "cover",
    publication: "https://doi.org/10.1109/NIGERCON62786.2024.10927349",
    featured: false,
    metrics: [
      { label: "Strong-signal response", value: "5.67 s" },
      { label: "Average-signal response", value: "14.87 s" },
      { label: "Poor-signal response", value: "83.47 s" },
      { label: "Solar runtime", value: ">24 h" },
    ],
    sections: [
      {
        title: "Design goal",
        body:
          "The system was designed for rural communities where electricity and internet connectivity may be unreliable. A second bin acts as an auxiliary capacity buffer when pickup is delayed.",
      },
      {
        title: "Hardware",
        body:
          "Arduino Nano controllers, ultrasonic sensors, servo motors, a GSM module, solar panels and a rechargeable battery provide autonomous sensing, actuation and notification.",
      },
      {
        title: "Control flow",
        body:
          "The controller monitors bin state, routes new waste to the available bin, closes a full bin and sends a GSM notification to the responsible authority. The second bin extends usable capacity while collection is pending.",
      },
      {
        title: "Field result",
        body:
          "Testing showed that GSM response time degraded predictably with signal quality but remained functional even in poor-signal conditions. The solar supply powered the system for more than 24 hours.",
      },
    ],
    gallery: [
      { src: "/images/solar/circuit.png", alt: "Embedded sensing, GSM and control circuit" },
      { src: "/images/solar/block-diagram.png", alt: "System block diagram" },
      { src: "/images/solar/flowchart.png", alt: "Waste-management control flow" },
      { src: "/images/solar/average-signal.png", alt: "System response under average GSM signal" },
      { src: "/images/solar/poor-signal.png", alt: "System response under poor GSM signal" },
    ],
  },
  {
    slug: "edge-ai-stone-detection",
    title: "Edge-AI Early Stone Detection for Agricultural Machinery",
    kicker: "AI × Embedded",
    summary:
      "A reusable signal-processing and machine-learning pipeline for early detection of stones entering a harvester header using acoustic and machine-context signals.",
    tags: ["Python", "MF4", "asammdf", "Random Forest", "Signal Processing", "MCU Export"],
    heroImage: "/images/CLAAS/agriculture-architecture.png",
    github: "https://github.com/Michael-ola/esoc2026-claas-stone-detection",
    featured: false,
    metrics: [
      { label: "Real events detected", value: "12 / 28" },
      { label: "Real-data advance", value: "0.697 s" },
      { label: "MCU model", value: "~11.5 KB" },
      { label: "MCU fit", value: "2 MB PASS" },
    ],
    sections: [
      {
        title: "Problem",
        body:
          "The goal is to detect stone uptake early enough to protect agricultural machinery. Microphone data and machine operating context are used to predict an upcoming reference event generated by a metal detector.",
      },
      {
        title: "Engineering pipeline",
        body:
          "MF4 measurement files are loaded into a shared pandas representation, segmented into header-on episodes, windowed, labelled and transformed into acoustic and operating-context features. Grouped validation is performed by complete measurement run to avoid leakage.",
      },
      {
        title: "Embedded deployment",
        body:
          "A constrained Random Forest was exported to plain C arrays and deterministic tree traversal for inference on an automotive-class microcontroller. The current export contains 36 features and 8 trees and occupies roughly 11.5 KB of model data.",
      },
      {
        title: "Limitation",
        body:
          "The real-data baseline is not deployment-ready: 12 of 28 reference events were detected and false alarms remain too frequent. Synthetic-data experiments are much stronger, but are treated only as pipeline validation rather than evidence that the real-world problem is solved.",
      },
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
