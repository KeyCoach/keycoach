export interface KeyDefinition {
  name: string;
  width: number;
  row: number;
  pressed: boolean;
}

export interface KeysType {
  [key: string]: KeyDefinition;
}

export interface KeyProps {
  keyName: string;
  width?: number;
  isPressed: boolean;
  hasBeenPressed: boolean;
}