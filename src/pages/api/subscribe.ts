import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../services/stripe";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await getSession({ req });

    // Verifique se o e-mail existe antes de criar o cliente Stripe
    if (!session || !session.user || !session.user.email) {
      return res.status(400).json({ error: "User email not found" });
    }

    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
    });

    // Verifique se as variáveis de ambiente existem antes de criar a sessão de checkout
    if (!process.env.STRIPE_SUCCESS_URL || !process.env.STRIPE_CANCEL_URL) {
      return res.status(500).json({ error: "Stripe URL environment variables not found" });
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        { price: "price_1Mq8fdF1546knLTb4ZS4gqVd", quantity: 1 },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};

