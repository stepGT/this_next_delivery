'use client';

import { useState, useEffect } from 'react';
import { Order, CargoType } from '../types';
import { getOrders, deleteOrder } from '../utils/storage';
import Link from 'next/link';
import Dialog from '../components/Dialog';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<CargoType | 'all'>('all');
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.receiverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.receiverCity.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'all' || order.cargoType === typeFilter;

    return matchesSearch && matchesType;
  });

  const getStatusLabel = (status: Order['status']) => {
    const labels = {
      pending: 'В обработке',
      confirmed: 'Подтверждена',
      delivered: 'Доставлена',
    };
    return labels[status];
  };

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      delivered: 'bg-blue-100 text-blue-800',
    };
    return colors[status];
  };

  const cargoTypeLabels = {
    documents: 'Документы',
    fragile: 'Хрупкое',
    regular: 'Обычное',
  };

  const handleDelete = (id: string) => {
    setOrderToDelete(id);
    setDeleteDialogOpen(true);
  };

  const loadOrders = () => {
    setOrders(getOrders());
  };

  const confirmDelete = () => {
    if (orderToDelete) {
      deleteOrder(orderToDelete);
      loadOrders();
      setOrderToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">История заявок</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Поиск по получателю или городу..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as CargoType | 'all')}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="all">Все типы</option>
          <option value="documents">Документы</option>
          <option value="fragile">Хрупкое</option>
          <option value="regular">Обычное</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500 py-8">Заявки не найдены</p>
      ) : (
        <div className="grid gap-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <Link href={`/orders/${order.id}`}>
                    <div className="cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">
                          {order.senderCity} &rarr; {order.receiverCity}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Отправитель: {order.senderName}</p>
                      <p className="text-sm text-gray-600">Получатель: {order.receiverName}</p>
                      <p className="text-sm text-gray-600">
                        Тип: {cargoTypeLabels[order.cargoType]} | Вес: {order.weight} кг
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(order.createdAt).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </Link>
                </div>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors">
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Dialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Удаление заявки"
        message="Вы уверены, что хотите удалить эту заявку? Это действие нельзя отменить."
      />
    </div>
  );
}
