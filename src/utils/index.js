export const primaryFocusOptions = [
  "-",
  "Abdominals",
  "Abductors",
  "Adductors",
  "Agility",
  "Arms",
  "Biceps",
  "Calves",
  "Cardio",
  "Chest",
  "Conditioning",
  "Forearms",
  "Full Body",
  "Glutes",
  "Hamstrings",
  "Hip",
  "Lats",
  "Legs",
  "Lower Back",
  "Lower Pull",
  "Lower Push",
  "Middle Back",
  "Movement Prep",
  "Neck",
  "Power",
  "Quadriceps",
  "Shoulders",
  "Speed",
  "Stability",
  "Strength",
  "Traps",
  "Triceps",
  "Upper Pull",
  "Upper Push",
];

export const exerciseCategory = [
  { value: "strength", label: "Strength", tags: ["Weight", "Reps"] },
  { value: "bodyweight", label: "Bodyweight", tags: ["Reps"] },
  { value: "timed", label: "Timed", tags: ["Time"] },
  {
    value: "distanceLong",
    label: "Distance (Long)",
    tags: ["Distance (Long)", "Time"],
  },
  {
    value: "distanceShort",
    label: "Distance (Short)",
    tags: ["Distance (Short)", "Time"],
  },
];

export const capitalizeFirstLetter = (str) => {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const AllSets = [
  {
    item: "2 Sets",
    value: 2,
  },
  {
    item: "3 Sets",
    value: 3,
  },
  {
    item: "4 Sets",
    value: 4,
  },
  {
    item: "5 Sets",
    value: 5,
  },
  {
    item: "6 Sets",
    value: 6,
  },
  {
    item: "7 Sets",
    value: 7,
  },
  {
    item: "8 Sets",
    value: 8,
  },
];

export const TrackingFields = [
  {
    name: "Time",
  },
  {
    name: "Speed",
  },
  {
    name: "Cadence",
  },
  {
    name: "Distance (long)",
  },
  {
    name: "Distance (short)",
  },
  {
    name: "Reps",
  },
  {
    name: "Weight",
  },
  {
    name: "RPF",
  },
  {
    name: "RIR",
  },
  {
    name: "Heart Rate",
  },
  {
    name: "% HR",
  },
];

export const setTypes = [
  {
    value: "Regular",
    sign: "R",
    color: "#faf74c",
    title: "Set",
  },
  {
    value: "Warm up",
    sign: "W",
    color: "#452782",
    title: "Set",
  },
  {
    value: "Drop set",
    sign: "D",
    color: "#48eaff",
    title: "Set",
  },
  {
    value: "Failure",
    sign: "F",
    color: "#ff4848",
    title: "Set",
  },
]



export function convertToCamelCase(inputStr) {
  const words = inputStr.split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toLowerCase() + words[0].slice(1);
  } else {
    return words.map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    }).join('');
  }
}


