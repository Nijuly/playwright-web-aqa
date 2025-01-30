export interface ITypeOptions {
  delay?: number;
  noWaitAfter?: boolean;
  timeout?: number;
  withClear?: boolean;
}

export interface IClickOptions {
  button?: "left" | "right" | "middle";
  clickCount?: number;
  delay?: number;
  force?: boolean;
  modifiers?: Array<"Alt" | "Control" | "Meta" | "Shift">;
  noWaitAfter?: boolean;
  position?: {
    x: number;
    y: number;
  };
  timeout?: number;
  trial?: boolean;
}
