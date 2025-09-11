import NavBar from "@/components/common/navBar/NavBar";
import OrderDetails from "@/components/specific/booking/order/OrderDetails";
import CheckoutSections from "@/components/specific/booking/order/CheckoutSections";

export default function CheckoutPage() {
  return (
    <div>
      <NavBar />
      <div className="w-screen h-screen flex flex-row p-4">
        <div className="w-2/3">
          <CheckoutSections />
        </div>
        <div className="w-1/3">
          <OrderDetails />
        </div>
      </div>
    </div>
  );
}
