

export default function TicketQuantity() {
    let quantity = 0;
    return (
        <div className="w-[5vw] h-[5vh] border-2 rounded border-acm-pink text-xl text-center text-white gap-4 relative">
            <div className="flex flex-row">
                <h1 className="m-2"> {quantity} </h1>
                <div className="flex flex-col absolute right-0 top-0 items-center">
                    <button> 
                        + 
                    </button>
                    <button> 
                        -      
                    </button>
                </div>
            </div>
        </div>
    );
}