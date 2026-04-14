import { Package, CreditCard, Truck, Clock, Shield, MapPin } from 'lucide-react';

export function DeliveryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl mb-8 text-[#D4AF37] text-center" style={{ fontFamily: 'serif' }}>
        Оплата и доставка
      </h1>

      <div className="max-w-5xl mx-auto">
        {/* Delivery Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Truck className="w-8 h-8 text-[#D4AF37]" />
            <h2 className="text-3xl text-[#D4AF37]">Доставка</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#1A1F3A] p-6 rounded-lg border border-[#D4AF37]/20">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl mb-3 text-white">По России</h3>
                  <ul className="space-y-2 text-white/70">
                    <li>• Бесплатная доставка от 5000 ₽</li>
                    <li>• Стоимость доставки: 500 ₽</li>
                    <li>• Срок доставки: 3-7 рабочих дней</li>
                    <li>• Курьерская служба СДЭК</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1F3A] p-6 rounded-lg border border-[#D4AF37]/20">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl mb-3 text-white">Сроки обработки</h3>
                  <ul className="space-y-2 text-white/70">
                    <li>• Обработка заказа: 1-2 рабочих дня</li>
                    <li>• Отправка заказа: в течение 24 часов</li>
                    <li>• Трек-номер отправляется на email</li>
                    <li>• Отслеживание посылки в личном кабинете</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent p-8 border border-[#D4AF37]/20 rounded-lg">
            <h3 className="text-xl mb-4 text-[#D4AF37]">Пункты самовывоза</h3>
            <p className="text-white/70 mb-4">
              Вы можете забрать заказ в удобном для вас пункте выдачи СДЭК. 
              При оформлении заказа вы сможете выбрать ближайший пункт на карте.
            </p>
            <ul className="space-y-2 text-white/70">
              <li>• Более 10 000 пунктов выдачи по всей России</li>
              <li>• Хранение заказа: 7 дней</li>
              <li>• Возможность примерки перед получением</li>
            </ul>
          </div>
        </section>

        {/* Payment Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <CreditCard className="w-8 h-8 text-[#D4AF37]" />
            <h2 className="text-3xl text-[#D4AF37]">Оплата</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#1A1F3A] p-6 rounded-lg border border-[#D4AF37]/20 text-center">
              <CreditCard className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-lg mb-2 text-white">Банковские карты</h3>
              <p className="text-white/60 text-sm">Visa, MasterCard, Мир</p>
            </div>

            <div className="bg-[#1A1F3A] p-6 rounded-lg border border-[#D4AF37]/20 text-center">
              <Package className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-lg mb-2 text-white">Наложенный платеж</h3>
              <p className="text-white/60 text-sm">Оплата при получении</p>
            </div>

            <div className="bg-[#1A1F3A] p-6 rounded-lg border border-[#D4AF37]/20 text-center">
              <Shield className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-lg mb-2 text-white">Безопасность</h3>
              <p className="text-white/60 text-sm">Защищенный платеж SSL</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1A1F3A] to-transparent p-8 border border-white/10 rounded-lg">
            <h3 className="text-xl mb-4 text-white">Важная информация</h3>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>Оплата производится через защищенное соединение</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>Мы не храним данные вашей банковской карты</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>При оплате картой средства списываются сразу после оформления заказа</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>Вы получите электронный чек на указанный email</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Returns Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-[#D4AF37]" />
            <h2 className="text-3xl text-[#D4AF37]">Возврат и обмен</h2>
          </div>

          <div className="bg-[#1A1F3A] p-8 rounded-lg border border-[#D4AF37]/20">
            <div className="space-y-6 text-white/70">
              <p>
                Мы заботимся о качестве нашей продукции и хотим, чтобы вы остались довольны покупкой. 
                Если товар вам не подошел, вы можете вернуть или обменять его в течение 14 дней с момента получения.
              </p>

              <div>
                <h3 className="text-xl text-white mb-4">Условия возврата:</h3>
                <ul className="space-y-2">
                  <li>• Товар не был в использовании</li>
                  <li>• Сохранены все ярлыки и бирки</li>
                  <li>• Товар в оригинальной упаковке</li>
                  <li>• Товар не имеет следов носки, запахов, пятен</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl text-white mb-4">Процесс возврата:</h3>
                <ol className="space-y-2 list-decimal list-inside">
                  <li>Свяжитесь с нами по email: info@azezm.ru</li>
                  <li>Укажите номер заказа и причину возврата</li>
                  <li>Получите инструкции по отправке товара</li>
                  <li>Отправьте товар обратно</li>
                  <li>Получите возврат средств в течение 7-10 рабочих дней</li>
                </ol>
              </div>

              <div className="bg-[#C41E3A]/10 p-6 border-l-4 border-[#C41E3A] rounded-r">
                <p className="text-white/90">
                  <strong className="text-white">Важно:</strong> Стоимость обратной доставки оплачивается покупателем. 
                  В случае брака или ошибки при отправке, мы компенсируем стоимость доставки.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <div className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent p-8 border border-[#D4AF37]/20 rounded-lg text-center">
            <h3 className="text-2xl mb-4 text-[#D4AF37]">Остались вопросы?</h3>
            <p className="text-white/70 mb-6">
              Свяжитесь с нами, и мы с радостью поможем вам с оформлением заказа
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:info@azezm.ru"
                className="text-white hover:text-[#D4AF37] transition-colors"
              >
                info@azezm.ru
              </a>
              <span className="hidden sm:inline text-white/30">|</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#D4AF37] transition-colors"
              >
                @azezm
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
