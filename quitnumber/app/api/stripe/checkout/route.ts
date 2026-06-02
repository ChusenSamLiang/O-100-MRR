import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', { apiVersion: '2026-05-27.dahlia' });

export async function GET() {
  if (!process.env.STRIPE_PRICE_ID) {
    return NextResponse.redirect(new URL('/upgrade', process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'));
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/?pro=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/`,
  });

  return NextResponse.redirect(session.url!);
}
