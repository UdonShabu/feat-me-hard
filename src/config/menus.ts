export const navMenus = [{ href: "/no-idea", label: "no-idea" }];

// --- BASE_PATH 1
const BASE_PATH = "/exercises";

export const sideMenuGroups = [
  {
    label: "Unit 1",
    subMenus: [
      { label: "Sub 1_1", href: `${BASE_PATH}/form` },
      { label: "Sub 1_2", href: `${BASE_PATH}/todo` },
    ],
  },
  {
    label: "Unit 2",
    subMenus: [
      { label: "Sub 2_1", href: `${BASE_PATH}/form` },
      { label: "Sub 2_2", href: `${BASE_PATH}/todo` },
    ],
  },
];

export const sideMenus = [
  { label: "Sub 1", href: `${BASE_PATH}/form` },
  { label: "Sub 2", href: `${BASE_PATH}/todo` },
];

// --- BASE_PATH 2
