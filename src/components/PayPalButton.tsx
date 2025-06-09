import { useEffect, useRef } from "react";


interface PayPalButtonProps {
    total: number;
    onSuccess: (details: any) => void;
}

export const PayPalButton = ({ total, onSuccess}: PayPalButtonProps) => {
    const paypalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if((window as any).paypal && paypalRef.current){
            (window as any).paypal.Buttons({
                CreateOrder: (data: any, actions: any) => {
                    return actions.order.create({
                        purchase_units: [{
                        amount: {
                            value: total.toFixed(2),
                        },
                        }],
                    });
                },
                onApprove: async (data: any, actions: any) => {
                const details = await actions.order.capture();
                onSuccess(details);
                },
                onError: (err: any) => {
                console.error("PayPal error:", err);
                },
            }).render(paypalRef.current);
        }
    }, [total]);

    return <div ref={paypalRef}></div>;
};