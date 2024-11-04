import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request, res: Response) {
  if (req.method === "POST") {
    const { title, price } = await req.json();
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price_data: {
              currency: "jpy",
              product_data: {
                name: title,
              },
              unit_amount: price,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url:
          process.env.NEXT_PUBLIC_APP_URL +
          "/book/checkout-success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: process.env.NEXT_PUBLIC_APP_URL,
      });

      console.log("決済に成功しました");
      return NextResponse.json({ checkout_url: session.url });
    } catch (err) {
      // 失敗時の処理
      console.log("決済に失敗しました", err);
      return NextResponse.json(
        { error: { message: err.message } },
        { status: 500 }
      );
    }
  } else {
    console.log("POSTメソッド以外は受け付けていません");
  }
}
