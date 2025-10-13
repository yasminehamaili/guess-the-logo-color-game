
export interface LogoData {
  id: string;
  name: string;
  colorUrl: string;
  correctColors: string[];
  options: string[];
}

export enum GameState {
  Start,
  Playing,
  Finished,
}
