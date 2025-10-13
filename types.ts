export interface LogoData {
  id: string;
  name: string;
  colorUrl: string;
  correctColor: string[];
  options: string[];
}

export enum GameState {
  Start,
  Playing,
  Finished,
}
