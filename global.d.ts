import { boolean, string } from "zod";

declare global {
  type TeamData = {
    team1: Team;
    team2: Team;
  };

  type PageProps = {
    team1: Team;
    team2: Team;
  };

  type Player = {
    name: string;
    pronouns: string;
    hero: string;
    swap: boolean;
  };

  type Team = {
    name: string;
    logoPath: string;
    info: string;
    score: string;
    atkDef: string;
    short: string;
    code: string;
    primaryCol: string;
    secondaryCol: string;
    advInfo: string;
    cat:string;
  };

  type MatchInfo = {
    tier: string;
    dateTime: string;
    stage: string;
    week: string;
    weekNum?: string;
    tierTag: string;
    showTierTag:boolean;
    showPreds?: boolean;
    TMInfo:string;
    showTM:boolean;
    TRInfo:string;
    showTR:boolean;
    TLInfo:string;
    showTL:boolean;
    currentMap:string;
    currentGame:string;
    showSides:boolean;
    swapSides:boolean;
  };

  type MapType = {
    map: string;
    image: string;
    type: string;
    info: string;
    winner: string;
    isComplete: boolean;
  };

  type TwitchStaff = {
    title: string;
    name: string;
    social: string;
    pronouns: string;
    cam:string;
  };

  type AllData = {
    twitch: TwitchStaff[];
    teams: TeamData;
    maps: MapType[];
    match: MatchInfo;
  };
}
export default global;
