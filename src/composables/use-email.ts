import { Order } from "@/interfaces";
import { customService, productService } from "@/services";

export function useEmail() {
  const sendEmail = async (email: string, subject: string, text: string) => {
     await fetch(`${process.env.VUE_APP_API_URL}/api/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ to: email, subject, text })
    });
  };

  const sendOrderConfirmation = async (order: Order) => {
    const customTexts = await customService.getCustomTexts('home') as { name: string };

    // Fetch complete product details for all products in the order
    const productIds = order.products.map(p => p.productId);
    const products = await productService.findProductByIds(productIds);

    // Create detailed product list
    const productsList = order.products.map(orderProduct => {
      const product = products.find(p => p._id === orderProduct.productId);
      if (product) {
        const price = product.priceWithDiscount || product.price;
        const totalPrice = price * parseInt(orderProduct.units);
        return `
        - ${product.name}
          Quantity: ${orderProduct.units}
          Size: ${orderProduct.size || 'N/A'}
          Price per unit: ${price}€
          Total: ${totalPrice}€`;
      }
      return `- Product ID: ${orderProduct.productId} (Details not available)`;
    }).join('\n');

    const emailContent = `
        Dear ${order.user?.name},
        
        Thank you for your order! Here are your order details:
        
        Order ID: ${order._id || 'N/A'}
        Total: ${order.total}€
        Date: ${new Date(order.timestamp).toLocaleDateString()}
        
        Products:
        ${productsList}
        
        Shipping Address:
        ${order.address?.street} ${order.address?.number}${order.address?.letter ? ` ${order.address?.letter}` : ''}
        ${order.address?.zipCode} ${order.address?.city}
        ${order.address?.country}
        
        We will process your order as soon as possible.
        
        Best regards,
        ${customTexts.name} Team
            `;
    
    await sendEmail(order.user?.email ?? '', `Order Confirmation - ${customTexts.name}`, emailContent);
  };

  return { sendEmail, sendOrderConfirmation };
}