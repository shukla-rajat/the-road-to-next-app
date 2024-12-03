import Link from "next/link";
import { initialTickets } from "@/data";

const TicketsPage = () => {
    return (
      <div>
        <h2 className='text-lg'> Tickets Page </h2>
        {
          initialTickets.map((ticket) => (
            <div key={ticket.id}>
              <h2 className="text-lg">{ticket.title}</h2>
              <Link href={`/tickets/${ticket.id}`} className="text-sm underline">View</Link>
            </div>
          ))
        }
      </div>
    ) 
  }
  
  export default TicketsPage;