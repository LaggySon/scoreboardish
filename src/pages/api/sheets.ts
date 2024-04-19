import {
  InferGetServerSidePropsType,
  NextApiRequest,
  NextApiResponse,
  type NextPage,
} from "next";
import dayjs from "dayjs";

import { google, sheets_v4, Auth } from "googleapis";
import { GaxiosResponse } from "gaxios";

import { env } from "../../env/server.mjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  function transpose(matrix: any) {
    return matrix[0].map((col: any, i: number) =>
      matrix.map((row: any) => row[i])
    );
  }
  const { sheet } = req.query;

  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    projectId: env.GOOGLE_PROJECTID,
    credentials: {
      private_key: env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
      client_email: env.GOOGLE_CLIENT_EMAIL,
    },
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId =
    String(sheet) === "undefined"
      ? "1XtHncu0QUb7viaQ0lq6onVJua_qy5oE8UoR1QJvibmo"
      : String(sheet);
  const range = `Output!A1:T55`;

  const response: GaxiosResponse | null = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const data = response.data.values;

  const result: AllData = {
    teams: {
      team1: {
        name: data[1][0],
        short: data[1][1],
        code: data[1][2],
        logoPath: data[1][3],
        info: data[1][7],
        score: data[1][9],
        primaryCol: data[1][4],
        secondaryCol: data[1][5],
        atkDef: data[1][10],
        cat: data[1][9],
      },
      team2: {
        name: data[2][0],
        short: data[2][1],
        code: data[2][2],
        logoPath: data[2][3],
        info: data[2][7],
        score: data[2][9],
        primaryCol: data[2][4],
        secondaryCol: data[2][5],
        atkDef: data[2][10],
        cat: data[2][9],
      },
    },
    twitch: response.data.values.slice(39, 55).map((row: string[]) => {
      return {
        title: row[0],
        name: row[1],
        pronouns: row[2],
        social: row[3],
        cam: row[4],
      };
    }),
    maps: response.data.values
      .slice(13, 32)
      .filter((row: string[]) => row.length > 1)
      .map((row: string[]) => {
        return {
          map: row[0],
          image: "https://www." + row[2],
          type: row[1],
          winner: row[3],
          t1Score: row[4],
          t2Score: row[5],
          isComplete: row[6] === "TRUE",
          info: row[7],
        };
      }),
    match: {
      dateTime: data[5][0],
      TMInfo: data[5][1],
      showTM: data[5][2],
      tierTag: data[5][3],
      showTierTag: data[5][4],
      TLInfo: data[5][5],
      showTL: data[5][6],
      TRInfo: data[5][7],
      showTR: data[5][8],
      currentMap: data[5][9],
      showSides: data[5][10] === "TRUE",
      swapSides: data[5][11] === "TRUE",
      currentGame: data[5][12],
      tier: data[1][6],
      week: "",
      stage: "",
      ticker1: data[5][13],
    },
    matches: response.data.values
      .slice(8, 11)
      .map((row: string[], i: number) => {
        return {
          info: row[1],
          team1: row[2],
          team2: row[3],
          team1info: row[4],
          team2info: row[5],
          team1color: row[6],
          team2color: row[7],
          show: row[8] === "TRUE",
          team1code: row[9],
          team2code: row[10],
          team1logo: row[11],
          team2logo: row[12],
        };
      }),
  };
  // result["cams"] = cams;
  // console.log(result);
  res.status(200).json(result);
}
