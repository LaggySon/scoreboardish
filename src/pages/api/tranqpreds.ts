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

  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    projectId: env.GOOGLE_PROJECTID,
    credentials: {
      private_key: env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
      client_email: env.GOOGLE_CLIENT_EMAIL,
    },
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = "15lldKBTIAAzgKlg7SizMCJkx68OVyOiMlRonJJsHq5o";
  const range = `COMPRESS!A1:L50`;

  const response: GaxiosResponse | null = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const preds: GaxiosResponse | null = await sheets.spreadsheets.values.get({
    spreadsheetId: "1sH3Fxs6H0UiFKruAXXu7a9Fzhxlt59ugeRR5RfsKyMw",
    range: `'Week ${response.data.values[3][11]} Responses'!D1:CA20`,
  });

  const predData = transpose(preds.data.values);
  // console.log(predData);
  const matchPreds: any = [];
  predData.forEach((pred: any, i: number) => {
    if (!matchPreds[Math.floor(i / 2)]) {
      console.log(predData[i + 1]);
      matchPreds[Math.floor(i / 2)] = {
        team1: pred[0].split("[")[1].slice(0, -1),
        team2: predData[i + 1][0].split("[")[1].slice(0, -1),
        preds: pred
          .slice(1, pred.length)
          .map((x: any, j: number) => {
            return [x, predData[i + 1][j + 1]];
          })
          .filter(
            (pred: any) =>
              pred[0] !== "" &&
              pred[0] !== null &&
              pred[1] !== "" &&
              pred[1] !== null
          ),
      };
    }
  });

  matchPreds.forEach((match: any, i: number) => {
    const t1 = match.preds.filter((pred: any, i: number) => {
      return pred[0] > pred[1];
    }).length;
    const t2 = match.preds.length - t1;
    match.team1Preds = t1;
    match.team2Preds = t2;
  });

  const result = {
    predData: matchPreds,
  };

  res.status(200).json(result);
}
