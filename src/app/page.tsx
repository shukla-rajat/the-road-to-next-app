import Link from "next/link";

const HomePage = () => {
  return (
  <div>
    <h2 className="text-lg"> Home Page </h2>
    <Link href="/tickets" className="underline"> Go To Tickets</Link>
  </div>
  );
}

export default HomePage;