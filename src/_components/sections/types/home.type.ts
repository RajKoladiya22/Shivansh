
export type Stat = {
  value: string;
  label: string;
};

export type StatItemProps = {
  stat: Stat;
  index: number;
  isVisible: boolean;
};