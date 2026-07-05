/** Service catalog — drives the nav, homepage grid, /services/[slug] pages and schema. */
export type ServiceIcon =
  | "home" | "snowflake" | "flame" | "wind" | "split" | "building" | "droplet" | "shield";

export interface Service {
  slug: string;
  name: string;      // marketing name
  h1: string;        // page H1
  short: string;     // one-liner for the card
  icon: ServiceIcon;
  intro: string;     // page intro paragraph
  features: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: "air-conditioning",
    name: "Air Conditioning",
    h1: "Air Conditioning Repair & Installation in San Antonio",
    short: "Fast AC repair, high-efficiency installs, and tune-ups built for brutal South Texas summers.",
    icon: "snowflake",
    intro:
      "When a San Antonio summer hits triple digits, a struggling AC isn't an inconvenience — it's an emergency. Glacier's certified technicians repair, replace, and fine-tune cooling systems so your home stays cold when the Texas heat won't quit.",
    features: [
      { title: "AC Repair", body: "Warm air, strange noises, short cycling, or a system that won't start — we diagnose it fast and fix it right the first time." },
      { title: "AC Installation", body: "Right-sized, high-efficiency systems from the brands we trust, professionally installed and load-calculated for your home." },
      { title: "AC Maintenance", body: "Seasonal tune-ups that catch small problems before they become a July breakdown and keep your energy bills in check." },
      { title: "Emergency Cooling", body: "24/7 availability when the heat can't wait. We prioritize no-cool calls to get your comfort back quickly." },
    ],
    faqs: [
      { q: "How often should I service my AC in San Antonio?", a: "At least once a year — ideally every spring before cooling season. Our long, hot summers put extra strain on systems, so an annual tune-up pays for itself in efficiency and fewer breakdowns." },
      { q: "Should I repair or replace my air conditioner?", a: "If your system is over 10–12 years old, needs a repair costing more than a third of a new unit, or uses discontinued R-22 refrigerant, replacement is usually the smarter long-term move. We'll give you an honest recommendation either way." },
      { q: "How long does an AC installation take?", a: "Most residential installs are completed in a single day. We protect your floors, haul away the old equipment, and walk you through your new system before we leave." },
    ],
  },
  {
    slug: "heating",
    name: "Heating",
    h1: "Heating Repair & Furnace Installation in San Antonio",
    short: "Furnace repair, heat pump installs, and tune-ups to keep you warm through every cold snap.",
    icon: "flame",
    intro:
      "San Antonio winters are mild until they aren't — and a sudden freeze is exactly when heating systems fail. Glacier keeps furnaces and heat pumps running safely and efficiently so a cold front never catches your family off guard.",
    features: [
      { title: "Furnace Repair", body: "No heat, weak airflow, or a furnace that keeps tripping? We find the fault and restore safe, reliable warmth." },
      { title: "Heat Pump Service", body: "Repair, replacement, and optimization of heat pumps — the efficient choice for South Texas climates." },
      { title: "Heating Installation", body: "Energy-efficient furnaces and heat pumps sized for your home and installed to manufacturer spec." },
      { title: "Safety Inspections", body: "Carbon monoxide checks, heat exchanger inspections, and combustion testing for total peace of mind." },
    ],
    faqs: [
      { q: "Why is my heater blowing cold air?", a: "Common causes include a dirty flame sensor, a failing igniter, a thermostat issue, or low refrigerant on a heat pump. It's worth a quick diagnostic before a cold night — small heating faults tend to get worse fast." },
      { q: "Is a heat pump a good choice in San Antonio?", a: "Yes. Our mild winters are ideal for heat pumps, which heat and cool efficiently from one system and often cost less to run than traditional gas furnaces in this climate." },
    ],
  },
  {
    slug: "indoor-air-quality",
    name: "Indoor Air Quality",
    h1: "Indoor Air Quality Services in San Antonio",
    short: "Air duct cleaning, filtration, and humidity control for a healthier, cleaner home.",
    icon: "wind",
    intro:
      "San Antonio's cedar season, dust, and humidity don't stay outside. Glacier's indoor air quality solutions remove allergens, balance moisture, and keep the air your family breathes genuinely clean.",
    features: [
      { title: "Air Duct Cleaning", body: "Remove years of dust, dander, and debris that recirculate through your home every time the system runs." },
      { title: "Whole-Home Filtration", body: "High-efficiency and media filters that capture allergens far better than a basic one-inch filter." },
      { title: "Humidity Control", body: "Whole-home dehumidifiers and ventilation tuned for South Texas humidity and comfort." },
      { title: "UV & Air Purification", body: "UV lamps and purifiers that reduce mold, bacteria, and odors at the source." },
    ],
    faqs: [
      { q: "How do I know if my air ducts need cleaning?", a: "Visible dust around vents, worsening allergies, musty odors, or ductwork that hasn't been cleaned in 5+ years are all good reasons to have them inspected." },
      { q: "Can better filtration lower my energy bills?", a: "Cleaner airflow means your system doesn't have to work as hard, which can modestly reduce runtime and wear. The bigger win is healthier air and a longer-lasting system." },
    ],
  },
  {
    slug: "ductless-mini-splits",
    name: "Ductless Mini-Splits",
    h1: "Ductless Mini-Split Installation in San Antonio",
    short: "Efficient, zoned comfort for additions, garages, and homes without ductwork.",
    icon: "split",
    intro:
      "Hot garage? A converted attic or new addition that never gets comfortable? Ductless mini-splits deliver quiet, energy-efficient, room-by-room comfort — no ductwork required.",
    features: [
      { title: "Mini-Split Installation", body: "Single- and multi-zone systems installed cleanly and precisely for rooms your central system can't reach." },
      { title: "Zoned Comfort", body: "Independent temperature control for each space so you only cool the rooms you're using." },
      { title: "High Efficiency", body: "Inverter-driven systems that sip energy compared to window units and space heaters." },
      { title: "Repair & Service", body: "Full support for existing ductless systems, whoever installed them." },
    ],
    faqs: [
      { q: "Where do mini-splits make the most sense?", a: "Garages, sunrooms, additions, casitas, and older homes without ductwork. They're also great for a room that's always too hot or too cold." },
      { q: "Are ductless systems energy efficient?", a: "Very. Because they deliver air directly into a room with no duct losses and modulate output, mini-splits are among the most efficient ways to heat and cool a space." },
    ],
  },
  {
    slug: "commercial-hvac",
    name: "Commercial HVAC",
    h1: "Commercial HVAC Services in San Antonio",
    short: "Reliable heating and cooling for offices, retail, and light-industrial spaces.",
    icon: "building",
    intro:
      "Downtime costs money and comfort keeps customers and staff happy. Glacier services and installs commercial HVAC systems across greater San Antonio with fast response and maintenance plans that protect your bottom line.",
    features: [
      { title: "Commercial Repair", body: "Rooftop units, split systems, and packaged equipment repaired quickly to minimize business disruption." },
      { title: "Installation & Replacement", body: "Right-sized systems and staged replacements planned around your operating hours." },
      { title: "Preventative Maintenance", body: "Scheduled service agreements that reduce emergency calls and extend equipment life." },
      { title: "Light-Commercial Experts", body: "Offices, retail, restaurants, salons, and clinics — we speak your building's language." },
    ],
    faqs: [
      { q: "Do you offer commercial maintenance agreements?", a: "Yes. Planned maintenance keeps rooftop and packaged units running efficiently, catches problems early, and is almost always cheaper than emergency repairs and downtime." },
    ],
  },
  {
    slug: "water-heaters",
    name: "Water Heaters",
    h1: "Water Heater Repair & Installation in San Antonio",
    short: "Tank, tankless, gas, and electric water heater repair and replacement.",
    icon: "droplet",
    intro:
      "No hot water is a fast way to ruin a morning. Glacier repairs and replaces tank and tankless water heaters, and San Antonio's hard water makes professional service and maintenance more important than most homeowners realize.",
    features: [
      { title: "Water Heater Repair", body: "No hot water, leaks, discolored water, or a pilot that won't stay lit — we diagnose and fix it." },
      { title: "Tankless Upgrades", body: "Endless hot water and lower standby losses with a professionally installed tankless system." },
      { title: "Replacement", body: "Gas and electric tank replacements sized to your household's real hot-water demand." },
      { title: "Hard-Water Care", body: "Flushing and maintenance that fights the scale buildup San Antonio's water is famous for." },
    ],
    faqs: [
      { q: "Tank or tankless — which is better?", a: "Tankless units cost more upfront but deliver endless hot water, last longer, and save space and standby energy. Tank units are cheaper to install. We'll size the right fit for your home and budget." },
      { q: "How does San Antonio's hard water affect my water heater?", a: "Hard water accelerates scale buildup inside the tank and on heating elements, reducing efficiency and lifespan. Annual flushing makes a real difference here." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
