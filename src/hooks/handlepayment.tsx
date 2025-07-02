    /*const handlePayment = async () => {
        const amount = getTotalPrice();
        const itemsToSend = items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price
        }));
        try{
            const res = await createPaypalOrder(amount, itemsToSend);
            const paypalOrder = res.paypal_order;
            const approvalUrl = paypalOrder.links.find((link: any) => link.rel === "approve") ?.href;

            if (approvalUrl) {
                // Guardar local order_id en localstorage o en estado global se se requiere despues
                localStorage.setItem("local_order_id", res.local_order_id.toString());
                navigate("/paypal-redirect"); // opción: o usar `window.location.href = approvalUrl;`
                window.location.href = approvalUrl;
            }else {
                alert("No se pudo obtener la URL de aprobación de PayPal.");
            }
        }catch (err) {
            alert("Error al iniciar el pago.");
            console.error(err);
        }

    };
    */