import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from './stripe';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const session = await getSession({ req });

        if (!session || !session.user || !session.user.email) {
            return res.status(400).json({ error: "Invalid session or missing user email" });
        }

        const successUrl = process.env.STRIPE_SUCCESS_URL;
        const cancelUrl = process.env.STRIPE_CANCEL_URL;

        if (!successUrl || !cancelUrl) {
            throw new Error("Missing Stripe success or cancel URL environment variables.");
        }

        const stripeCustomer = await stripe.customers.create({
            email: session.user.email,
        });

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: stripeCustomer.id,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { price: 'price_1Mq8fdF1546knLTb4ZS4gqVd', quantity: 1 },
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: successUrl,
            cancel_url: cancelUrl,
        });
        return res.status(200).json({ sessionId: stripeCheckoutSession.id });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method not allowed');
    }
}
