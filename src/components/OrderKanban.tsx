import { useState, useMemo } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Package, User, Phone, Mail, MapPin, ShoppingBag, Check } from 'lucide-react';

interface Order {
  id: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
  }>;
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface OrderKanbanProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, newStatus: string) => Promise<void>;
}

const STATUSES = [
  { id: 'new', label: 'Новые', color: '#D4AF37', bgColor: '#D4AF37/10' },
  { id: 'processing', label: 'В обработке', color: '#3B82F6', bgColor: '#3B82F6/10' },
  { id: 'shipped', label: 'Отправлен', color: '#8B5CF6', bgColor: '#8B5CF6/10' },
  { id: 'delivered', label: 'Доставлен', color: '#10B981', bgColor: '#10B981/10' },
  { id: 'cancelled', label: 'Отменен', color: '#EF4444', bgColor: '#EF4444/10' },
];

interface OrderCardProps {
  order: Order;
  isSelected: boolean;
  onSelect: (orderId: string) => void;
  onStatusChange: (orderId: string, newStatus: string) => Promise<void>;
}

function OrderCard({ order, isSelected, onSelect, onStatusChange }: OrderCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ORDER',
    item: { orderId: order.id, currentStatus: order.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-[#1A1F3A] rounded-lg p-4 mb-3 border border-white/10 cursor-move transition-all hover:border-[#D4AF37]/50 ${
        isDragging ? 'opacity-50' : ''
      } ${isSelected ? 'ring-2 ring-[#D4AF37]' : ''}`}
    >
      {/* Checkbox */}
      <div className="flex items-start justify-between mb-3">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(order.id)}
            className="w-4 h-4 rounded border-white/20 text-[#D4AF37] focus:ring-[#D4AF37] bg-black"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="ml-2 text-sm text-white/60">#{order.id.slice(6, 14)}</span>
        </label>
        <span className="text-xs text-white/40">
          {new Date(order.createdAt).toLocaleDateString('ru-RU')}
        </span>
      </div>

      {/* Customer Info */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center text-sm">
          <User className="w-4 h-4 mr-2 text-[#D4AF37]" />
          <span className="text-white">{order.customerInfo.name}</span>
        </div>
        <div className="flex items-center text-xs text-white/60">
          <Phone className="w-3 h-3 mr-2" />
          <span>{order.customerInfo.phone}</span>
        </div>
        <div className="flex items-center text-xs text-white/60">
          <Mail className="w-3 h-3 mr-2" />
          <span className="truncate">{order.customerInfo.email}</span>
        </div>
      </div>

      {/* Items */}
      <div className="mb-3 pb-3 border-b border-white/10">
        <div className="flex items-center text-xs text-white/60 mb-2">
          <ShoppingBag className="w-3 h-3 mr-1" />
          <span>{order.items.length} товар(ов)</span>
        </div>
        <div className="space-y-1">
          {order.items.slice(0, 2).map((item, idx) => (
            <div key={idx} className="text-xs text-white/80">
              {item.name} ({item.size}) × {item.quantity}
            </div>
          ))}
          {order.items.length > 2 && (
            <div className="text-xs text-white/40">
              +{order.items.length - 2} ещё...
            </div>
          )}
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-[#D4AF37]">
          {order.totalAmount.toLocaleString('ru-RU')} ₽
        </span>
        <Package className="w-5 h-5 text-white/40" />
      </div>
    </div>
  );
}

interface KanbanColumnProps {
  status: typeof STATUSES[0];
  orders: Order[];
  selectedOrders: Set<string>;
  onSelect: (orderId: string) => void;
  onDrop: (orderId: string, newStatus: string) => Promise<void>;
}

function KanbanColumn({ status, orders, selectedOrders, onSelect, onDrop }: KanbanColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ORDER',
    drop: (item: { orderId: string; currentStatus: string }) => {
      if (item.currentStatus !== status.id) {
        onDrop(item.orderId, status.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="flex-1 min-w-[300px]">
      {/* Column Header */}
      <div
        className="sticky top-0 z-10 rounded-t-lg p-4 border-b-2 mb-4"
        style={{
          backgroundColor: status.color + '20',
          borderColor: status.color,
        }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-bold" style={{ color: status.color }}>
            {status.label}
          </h3>
          <span
            className="px-2 py-1 rounded-full text-xs font-bold"
            style={{
              backgroundColor: status.color + '30',
              color: status.color,
            }}
          >
            {orders.length}
          </span>
        </div>
      </div>

      {/* Column Content */}
      <div
        ref={drop}
        className={`min-h-[400px] rounded-lg p-3 transition-colors ${
          isOver ? 'bg-[#D4AF37]/10 border-2 border-dashed border-[#D4AF37]' : 'bg-transparent'
        }`}
      >
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            isSelected={selectedOrders.has(order.id)}
            onSelect={onSelect}
            onStatusChange={onDrop}
          />
        ))}
        {orders.length === 0 && (
          <div className="text-center py-12 text-white/40">
            <Package className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Нет заказов</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function OrderKanban({ orders, onUpdateStatus }: OrderKanbanProps) {
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState<string>('');

  const ordersByStatus = useMemo(() => {
    const grouped: Record<string, Order[]> = {};
    STATUSES.forEach((status) => {
      grouped[status.id] = orders.filter((order) => order.status === status.id);
    });
    return grouped;
  }, [orders]);

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (statusId: string) => {
    const ordersInStatus = ordersByStatus[statusId];
    const allSelected = ordersInStatus.every((order) => selectedOrders.has(order.id));

    setSelectedOrders((prev) => {
      const newSet = new Set(prev);
      if (allSelected) {
        // Deselect all in this status
        ordersInStatus.forEach((order) => newSet.delete(order.id));
      } else {
        // Select all in this status
        ordersInStatus.forEach((order) => newSet.add(order.id));
      }
      return newSet;
    });
  };

  const handleClearSelection = () => {
    setSelectedOrders(new Set());
  };

  const handleBulkStatusChange = async () => {
    if (!bulkStatus || selectedOrders.size === 0) return;

    const promises = Array.from(selectedOrders).map((orderId) =>
      onUpdateStatus(orderId, bulkStatus)
    );

    await Promise.all(promises);
    setSelectedOrders(new Set());
    setBulkStatus('');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Bulk Actions Bar */}
        {selectedOrders.size > 0 && (
          <div className="bg-[#1A1F3A] rounded-lg p-4 border border-[#D4AF37] sticky top-0 z-20">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-white font-bold">
                    Выбрано: {selectedOrders.size}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleClearSelection}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Снять выделение
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-white/60 text-sm">Изменить статус на:</span>
                <Select value={bulkStatus} onValueChange={setBulkStatus}>
                  <SelectTrigger className="w-[180px] bg-black border-white/20 text-white">
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1F3A] text-white border-white/20">
                    {STATUSES.map((status) => (
                      <SelectItem key={status.id} value={status.id}>
                        <span style={{ color: status.color }}>{status.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleBulkStatusChange}
                  disabled={!bulkStatus}
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
                >
                  Применить
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Select Buttons */}
        <div className="flex flex-wrap gap-2">
          <span className="text-white/60 text-sm self-center mr-2">Быстрый выбор:</span>
          {STATUSES.map((status) => {
            const ordersInStatus = ordersByStatus[status.id];
            const allSelected = ordersInStatus.length > 0 && 
              ordersInStatus.every((order) => selectedOrders.has(order.id));
            
            return (
              <Button
                key={status.id}
                size="sm"
                variant="outline"
                onClick={() => handleSelectAll(status.id)}
                disabled={ordersInStatus.length === 0}
                className={`border-white/20 text-white hover:bg-white/10 ${
                  allSelected ? 'ring-2 ring-[#D4AF37]' : ''
                }`}
                style={{ borderColor: status.color + '50' }}
              >
                {allSelected ? '✓ ' : ''}
                {status.label} ({ordersInStatus.length})
              </Button>
            );
          })}
        </div>

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {STATUSES.map((status) => (
            <KanbanColumn
              key={status.id}
              status={status}
              orders={ordersByStatus[status.id]}
              selectedOrders={selectedOrders}
              onSelect={handleSelectOrder}
              onDrop={onUpdateStatus}
            />
          ))}
        </div>

        {/* Help Text */}
        <div className="bg-[#1A1F3A]/50 rounded-lg p-4 border border-white/10">
          <p className="text-white/60 text-sm">
            💡 <strong>Совет:</strong> Перетаскивайте карточки между колонками для смены статуса или используйте чекбоксы для массовых действий
          </p>
        </div>
      </div>
    </DndProvider>
  );
}
