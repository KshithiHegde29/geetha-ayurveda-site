import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSession, isAdmin } from "@/lib/auth";

export const runtime = "nodejs"; // ensure Node runtime for file uploads

function r2Client() {
  const accountId = process.env.R2_ACCOUNT_ID as string;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID as string;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY as string;
  const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;
  return new S3Client({
    region: "auto",
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!isAdmin(session)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  const keyPrefix = (form.get("prefix") as string) || "pdfs";
  const bucket = process.env.R2_BUCKET as string;
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "Missing file" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "pdf";
  const key = `${keyPrefix}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const client = r2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: Buffer.from(arrayBuffer),
      ContentType: file.type || "application/pdf",
    })
  );

  const publicBase = process.env.R2_PUBLIC_BASE_URL;
  const url = publicBase ? `${publicBase.replace(/\/$/, "")}/${key}` : `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${bucket}/${key}`;
  return NextResponse.json({ ok: true, key, url });
}
