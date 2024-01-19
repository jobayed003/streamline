import { auth } from '@clerk/nextjs';
import { UserJSON, WebhookEvent } from '@clerk/nextjs/server';

import { headers } from 'next/headers';
import { Webhook } from 'svix';

export async function handler(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET_KEY || '';

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
  const user = evt.data as UserJSON;
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
