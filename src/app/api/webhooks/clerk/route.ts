import db from '@/lib/db';
import { WebhookEvent } from '@clerk/nextjs/server';

import { headers } from 'next/headers';
import { Webhook } from 'svix';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET_KEY || '';

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }
  const headerPayload = headers();
  const payload = await req.json();

  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(JSON.stringify(payload), {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }
  type EventType = 'user.created' | 'user.updated' | 'user.deleted' | '*';

  // @ts-ignore
  const eventType: EventType = evt.type;

  if (eventType === 'user.created') {
    await db.user.create({
      data: {
        externalUserId: payload.data.id,
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
  }

  if (eventType === 'user.updated') {
    await db.user.update({
      where: { externalUserId: payload.data.id },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
  }

  if (eventType === 'user.deleted') {
    await db.user.delete({
      where: {
        externalUserId: payload.data.id,
      },
    });
  }

  return new Response('Success', { status: 200 });
}
