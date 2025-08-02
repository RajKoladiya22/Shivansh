export type TeamMember = {
  name: string;
  role: string;
  image: string;
  // Add other expected props for <TeamCard /> here
};

export type CardPosition = {
  imagePosition?: "left" | "right";
  [key: string]: any; // Allow other style keys like top, left, etc.
};

export type MemoizedTeamCardProps = {
  member: TeamMember;
  index: number;
  cardPosition?: CardPosition;
  animationKey: string;
};


export type Stat = {
  value: string;
  label: string;
};

export type StatItemProps = {
  stat: Stat;
  index: number;
  isVisible: boolean;
};