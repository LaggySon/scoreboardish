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
    cat: string;
  };

  type MatchInfo = {
    tier: string;
    dateTime: string;
    stage: string;
    week: string;
    weekNum?: string;
    tierTag: string;
    showTierTag: boolean;
    showPreds?: boolean;
    TMInfo: string;
    showTM: boolean;
    TRInfo: string;
    showTR: boolean;
    TLInfo: string;
    showTL: boolean;
    currentMap: string;
    currentGame: string;
    showSides: boolean;
    swapSides: boolean;
    ticker1: string;
  };

  type MapType = {
    map: string;
    image: string;
    type: string;
    winner: string;
    t1Score: string;
    t2Score: string;
    isComplete: boolean;
    info: string;
  };

  type TwitchStaff = {
    title: string;
    name: string;
    social: string;
    pronouns: string;
    cam: string;
  };

  type AllData = {
    twitch: TwitchStaff[];
    teams: TeamData;
    maps: MapType[];
    match: MatchInfo;
    matches: Match[];
  };

  type Match = {
    info: string;
    team1: string;
    team2: string;
    team1info: string;
    team2info: string;
    team1color: string;
    team2color: string;
    team1code: string;
    team2code: string;
    team1logo: string;
    team2logo: string;
    show: boolean;
  };
}
export default global;
