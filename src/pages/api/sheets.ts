import {
  InferGetServerSidePropsType,
  NextApiRequest,
  NextApiResponse,
  type NextPage,
} from "next";

import { google, sheets_v4, Auth } from "googleapis";
import { GaxiosResponse } from "gaxios";

import { env } from "../../env/server.mjs";

type TeamData = {
  team1: Team;
  team2: Team;
};

type Team = {
  name: string;
  logoPath: string;
  info: string;
  score: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    projectId: env.GOOGLE_PROJECTID,
    credentials: {
      private_key: env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
      client_email: env.GOOGLE_CLIENT_EMAIL,
    },
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = "1UTt-KfVo59GgaW6NqEgJmsQ6ANkr2w9x2QB0GJhimiU";
  const range = `MAIN!B2:Q3`;

  const response: GaxiosResponse | null = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  // console.log(response.data.values);

  const data = response.data.values;
  const result: TeamData = {
    team1: {
      name: data[0][0],
      logoPath: data[0][4],
      info: data[0][2],
      score: data[0][1],
    },
    team2: {
      name: data[1][0],
      logoPath: data[1][4],
      info: data[1][2],
      score: data[1][1],
    },
  };
  res.status(200).json(result);
}
