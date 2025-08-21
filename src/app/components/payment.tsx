'use client';

import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { useEffect, useState } from "react";

export default function Payment() {
  const [paddle, setPaddle] = useState<Paddle>();
  useEffect(() => {
    initializePaddle({
      environment: 'sandbox',
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!
    }).then((p) => {
      setPaddle(p);
    });
  }, []);

  const handleCheckout = ()=>{
    if (!paddle) return alert("Paddle not initialized");
    paddle.Checkout.open({
      items: [
        {
          priceId: "pri_01k370gthyexsnqn9pe3gf0p7w",
          quantity: 1,
        }
      ],
      settings:{
        displayMode: 'overlay',
        theme: 'dark',
        successUrl: 'http://localhost:3001/success'
      }
    })
  }
  return (
    <div>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}
