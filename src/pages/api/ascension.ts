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

  const spreadsheetId = String("1qRG-6OqhHh9l648hkOqSFQV1kXKay52oTctVwx73J7U");
  const range = `Player List!A2:I49`;

  const response: GaxiosResponse | null = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const data = response.data.values;

  //   console.log(data);

  const result = data.map((p: any) => {
    return {
      team: p[0],
      name: p[1],
      role: p[4],
      role2: p[8] ?? null,
    };
  });

  console.log(result);
  res.status(200).json(result);
}
