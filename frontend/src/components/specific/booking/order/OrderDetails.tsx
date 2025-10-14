import Image from 'next/image';

export default function OrderDetails() {
  const tickets = [
    {
      name: 'adult',
      price: '$4.99',
    },
    {
      name: 'adult',
      price: '$4.99',
    },
    {
      name: 'child',
      price: '$4.99',
    },
    {
      name: 'child',
      price: '$4.99',
    },
    {
      name: 'senior',
      price: '$4.99',
    },
  ];

  const total = 43.29;
  const subtotal = 42.06;
  const tax = 1.23;

  return (
    <div className="p-[3px] rounded-2xl bg-gradient-to-r from-acm-orange to-acm-pink">
      <div className="flex flex-col p-6 bg-black text-white rounded-2xl shadow-md w-full h-full">
        <h2 className="text-2xl font-extrabold mb-4">Order Details</h2>

        <div className="flex items-start mb-4">
          <Image src={''} alt={'movie title'} className="w-20 h-28 object-cover rounded-md border-1 border-white" />
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{'movie.title'}</h3>
            <p className="text-sm">{'movie.date'}</p>
            <p className="text-sm">Rated: {'movie.rating'}</p>
          </div>
        </div>
        {/* Divider */}
        <hr className="border-t border-1 border-gray-200 mb-4" />
        {/* Seats */}
        <div className="mb-4 px-6">
          <span className="text-white">Seatings: </span>
          <span className="text-white font-bold">{'S8, 4B, H1, U8'}</span>
        </div>
        {/* Divider */}
        <hr className="border-t border-1 border-gray-200 mb-4" />
        <div className="space-y-2 mb-4 px-6">
          {tickets.map((ticket, index) => (
            <div key={index} className="flex justify-between text-white text-sm">
              <span>{ticket.name}</span>
              <span>{ticket.price}</span>
            </div>
          ))}
        </div>

        <hr className="border-t border-1 border-gray-200 mb-4" />

        <div className="flex justify-between text-white text-sm mb-2 px-6">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-white text-sm mb-4 px-6">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        {/* Divider */}
        <hr className="border-t border-1 border-gray-200 mb-4" />
        {/* Total */}
        <div className="flex justify-between text-lg font-semibold text-white px-6">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
