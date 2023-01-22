import { string } from "zod";

declare global {
  type TeamData = {
    team1: Team;
    team2: Team;
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
  };

  type MatchInfo = {
    tier: string;
    region: string;
    dateTime: string;
    stage: string;
    week: string;
    mapInfo: string;
    tierTag: string;
    nextMap: string;
    ticker1: string;
    ticker2: string;
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
  };

  type AllData = {
    twitch: TwitchStaff[];
    teams: TeamData;
    maps: MapType[];
    match: MatchInfo;
  };
}
export default global;
