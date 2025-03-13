import { prisma } from "@/lib/prisma";

const tickets = [
    {
      title: "Ticket 1",
      content: "This is the first ticket from the database.",
      status: "DONE" as const,
      deadline: new Date().toISOString().split("T")[0],
      bounty: 499,
    },
    {
      title: "Ticket 2",
      content: "This is the second ticket from the database.",
      status: "OPEN" as const,
      deadline: new Date().toISOString().split("T")[0],
      bounty: 399,
    },
    {
      title: "Ticket 3",
      content: "This is the third ticket from the database.",
      status: "IN_PROGRESS" as const,
      deadline: new Date().toISOString().split("T")[0],
      bounty: 599,
    },
  ];
  
const seed = async () => {
    const t0 = performance.now();
    console.log('DB seed: Started...');
    
    await prisma.ticket.deleteMany();

    await prisma.ticket.createMany({
        data:tickets
    });

    const t1 = performance.now();
    console.log(`DB seed: Finished (${t1 - t0}ms)`);
};

seed();