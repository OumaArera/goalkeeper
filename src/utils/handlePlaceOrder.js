import { createData, updateData } from "../services/apiServices";

export const handlePlaceOrder = async (orderItems, cartItems, setIsLoading, onOrderComplete) => {
  try {
    setIsLoading(true);

    // Calculate totals
    const quantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(totalAmount * 0.16); // 16% tax
    
    // Get delivery method from user (this should be passed as parameter or collected via modal)
    const deliveryMethod = 'pickup'; // Default to pickup, should be user selected
    
    // Calculate shipping fee based on delivery method
    let shippingFee;
    if (deliveryMethod === 'pickup') {
      shippingFee = 50;
    } else {
      // For delivery - assuming Nairobi residents for now
      // You might want to add location detection or user selection
      shippingFee = 200; // 1000 for out of Nairobi
    }
    
    const grandTotal = totalAmount + tax + shippingFee;
    
    // Prepare order payload
    const orderPayload = {
      deliveryMethod,
      itemsPurchased: orderItems.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
        brand: item.brand,
        color: item.color,
        material: item.material,
        team: item.team,
        playerName: item.playerName,
        playerNumber: item.playerNumber,
        discount: item.discount
      })),
      quantity,
      totalAmount,
      tax,
      shippingFee,
      grandTotal,
      paymentMethod: 'Mpesa',
      customerId: localStorage.getItem("customerId")
      // notes field is optional - only include if provided
    };
    
    // Create the order
    const orderResponse = await createData('orders', orderPayload, true);
    
    if (!orderResponse.error) {
      // Remove items from cart
      const cartBoughtPromises = cartItems.map(cartId => {
        updateData(`carts/customer/${cartId}`, { status: 'bought' }, true);
        console.log("ID: ", cartId)
      }
        
      );
      
      await Promise.all(cartBoughtPromises);
      
      // Call success callback
      if (onOrderComplete) {
        onOrderComplete(orderResponse.data);
      }
      
      return { success: true, order: orderResponse.data };
    } else {
      throw new Error(orderResponse.message || 'Failed to create order');
    }
    
  } catch (error) {
    console.error('Error placing order:', error);
    return { success: false, error: error.message };
  } finally {
    setIsLoading(false);
  }
};