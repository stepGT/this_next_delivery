'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Order } from '../../types';
import { getOrders } from '../../utils/storage';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const orders = getOrders();
    const foundOrder = orders.find((o) => o.id === params.id);
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      router.push('/orders');
    }
  }, [params.id, router]);

  if (!order) {
    return <div className="text-center py-8">Загрузка...</div>;
  }

  const cargoTypeLabels = {
    documents: 'Документы',
    fragile: 'Хрупкое',
    regular: 'Обычное',
  };

  const statusLabels = {
    pending: 'В обработке',
    confirmed: 'Подтверждена',
    delivered: 'Доставлена',
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/orders"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        &larr; Назад к списку
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Детали заявки</h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Информация о заявке</h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p>
                <span className="font-medium">Статус:</span> {statusLabels[order.status]}
              </p>
              <p>
                <span className="font-medium">Дата создания:</span>{' '}
                {new Date(order.createdAt).toLocaleString('ru-RU')}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Отправитель</h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p>
                <span className="font-medium">Имя:</span> {order.senderName}
              </p>
              <p>
                <span className="font-medium">Телефон:</span> {order.senderPhone}
              </p>
              <p>
                <span className="font-medium">Город:</span> {order.senderCity}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Получатель и посылка</h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p>
                <span className="font-medium">Имя получателя:</span> {order.receiverName}
              </p>
              <p>
                <span className="font-medium">Город назначения:</span> {order.receiverCity}
              </p>
              <p>
                <span className="font-medium">Тип груза:</span> {cargoTypeLabels[order.cargoType]}
              </p>
              <p>
                <span className="font-medium">Вес:</span> {order.weight} кг
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
