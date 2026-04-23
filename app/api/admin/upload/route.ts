import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';
import { requireAuth } from '@/lib/auth';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.webm', '.ogv', '.ogg'];

function parseLimitMb(value: string | undefined, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

const MAX_IMAGE_UPLOAD_MB = parseLimitMb(process.env.NEXT_PUBLIC_MAX_IMAGE_UPLOAD_MB, 5);
const MAX_VIDEO_UPLOAD_MB = parseLimitMb(process.env.NEXT_PUBLIC_MAX_VIDEO_UPLOAD_MB, 50);
const MAX_IMAGE_SIZE = MAX_IMAGE_UPLOAD_MB * 1024 * 1024;
const MAX_VIDEO_SIZE = MAX_VIDEO_UPLOAD_MB * 1024 * 1024;

const s3 = new S3Client({
  region: process.env.R2_DEFAULT_REGION || 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

export async function POST(req: NextRequest) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only image and mp4/webm/ogg video files are allowed.' },
        { status: 400 }
      );
    }

    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
    const limit = isImage ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE;
    const limitMb = isImage ? MAX_IMAGE_UPLOAD_MB : MAX_VIDEO_UPLOAD_MB;
    if (file.size > limit) {
      return NextResponse.json(
        { error: `File size exceeds the ${limitMb}MB limit for ${isImage ? 'images' : 'videos'}.` },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { error: 'Invalid file extension.' },
        { status: 400 }
      );
    }

    const bucket = process.env.R2_BUCKET;
    const publicBase = process.env.R2_URL;
    if (!bucket || !publicBase) {
      return NextResponse.json({ error: 'Storage is not configured' }, { status: 500 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const sanitizedOriginal = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `${timestamp}_${sanitizedOriginal}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        CacheControl: 'public, max-age=31536000, immutable',
      })
    );

    const url = `${publicBase.replace(/\/+$/, '')}/${key}`;
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
