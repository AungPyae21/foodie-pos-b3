import { uploadAsset } from "@/utils/uploadAsset";
import { error } from "console";
import { Request, Response } from "express";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: Request, res: Response) {
  if (req.method === "POST") {
    uploadAsset(req, res, (error) => {
      if (error) {
        return res.status(500).send("Internal server error");
      }
      const file = req.file as Express.MulterS3.File;
      const assetUrl = file.location;
      return res.status(200).json({ assetUrl });
    });
  } else {
    res.send(405).send("Method not allowed");
  }
}
