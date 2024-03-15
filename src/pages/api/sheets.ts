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

  const spreadsheetId = String(sheet);
  const range = `Output!A1:T50`;

  const response: GaxiosResponse | null = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const data = response.data.values;

  console.log(data);

  const result: AllData = {
    teams: {
      team1: {
        name: data[1][0],
        short: data[1][1],
        code: data[1][2],
        logoPath: data[1][3],
        info: data[1][8],
        score: data[1][10],
        primaryCol: data[1][5],
        secondaryCol: data[1][6],
        atkDef: data[1][11],
        cat:data[1][9]
        
      },
      team2: {
        name: data[2][0],
        short: data[2][1],
        code: data[2][2],
        logoPath: data[2][3],
        info: data[2][8],
        score: data[2][10],
        primaryCol: data[2][5],
        secondaryCol: data[2][6],
        atkDef: data[2][11],
        cat: data[2][9],

      },
    },
    twitch: response.data.values
      .slice(45, response.data.values.length)
      .map((row: string[]) => {
        return { title: row[0], name: row[1], social: row[2], pronouns: "any" };
      }),
    maps: response.data.values
      .slice(13, 32)
      .filter((row: string[]) => row.length > 1)
      .map((row: string[]) => {
        let mapString = "";
        if (row[0]) {
          mapString =
            row[0].split("tranquility.gg/package/Maps/")[1] ?? "ERROR!.png";
          mapString = mapString.slice(0, -4);
        }
        return {
          map: mapString,
          image: "https://www." + row[0],
          type: row[1],
          winner: row[2],
          info: row[3],
          isComplete: row[4] === "TRUE",
        };
      }),
    match: {
      dateTime:data[5][0],
      TMInfo:data[5][1],
      showTM:data[5][2],
      tierTag:data[5][3],
      showTierTag:data[5][4]==="TRUE",
      TLInfo:data[5][5],
      showTL:data[5][6],
      TRInfo:data[5][7],
      showTR:data[5][8],
      currentMap:data[5][9],
      showSides:data[5][10]==="TRUE",
      swapSides:data[5][11]==="TRUE",
      currentGame:data[5][12],
      tier:data[1][6],
      week:"",
      stage:""
    },
  };
  // result["cams"] = cams;
  // console.log(result);
  res.status(200).json(result);
}
