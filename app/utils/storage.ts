import { ALL_ORDERS } from '../constants';
import { Order, OrderFormData } from '../types';

export const getOrders = (): Order[] => {
  const orders = localStorage.getItem(ALL_ORDERS);
  return orders ? JSON.parse(orders) : [];
};

export const saveOrder = (orderData: OrderFormData): Order => {
  const orders = getOrders();

  const newOrder: Order = {
    id: Date.now().toString(),
    senderName: orderData.senderName,
    senderPhone: orderData.senderPhone,
    senderCity: orderData.senderCity,
    receiverName: orderData.receiverName,
    receiverCity: orderData.receiverCity,
    cargoType: orderData.cargoType,
    weight: orderData.weight as number,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };

  orders.push(newOrder);
  localStorage.setItem(ALL_ORDERS, JSON.stringify(orders));
  return newOrder;
};

export const deleteOrder = (id: string): void => {
  const orders = getOrders();
  const filteredOrders = orders.filter((order) => order.id !== id);
  localStorage.setItem(ALL_ORDERS, JSON.stringify(filteredOrders));
};
