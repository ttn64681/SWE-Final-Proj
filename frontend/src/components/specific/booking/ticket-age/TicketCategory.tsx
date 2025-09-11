interface props {
        category: string;
        quantity: number;
        price: number;
    }


export default function TicketCategory({ category, quantity, price }: props) {
    return (
        <div className="w-100 border-2 border-white flex flex-col text-xl text-white gap-4">
            <div>
                <h1 className="pa"> {category} {quantity} {price} </h1>
            </div>
        </div>
    );
}