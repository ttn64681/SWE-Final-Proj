
interface props {
    price: number;
    priceDisplay: string;
}

export default function TotalPrice( { price, priceDisplay }: props) {

    // Used to stop adding extra digits to the price from bumping other UI elements.
    // If there are only 3 digits in the price, an extra invisible character is added.
    function padding() {
        if (price < 10) {
            return '$';
        }
    }

    // Display total price of all tickets
    return (
        <div className="p-4 flex flex-row text-3xl font-semibold text-acm-pink">
            <h1 className="text-black"> {padding()} </h1> <h1> {priceDisplay} </h1>
        </div>
    );
}