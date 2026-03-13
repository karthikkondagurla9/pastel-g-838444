import prisma from "../client.js";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
export const getTickets = catchAsync(async (c) => {
    const tickets = await prisma.ticket.findMany();
    return c.json(tickets);
});
export const getTicketById = catchAsync(async (c) => {
    const id = parseInt(c.req.param('id'));
    const ticket = await prisma.ticket.findUnique({
        where: { id }
    });
    if (!ticket)
        throw new ApiError(404, 'Ticket not found');
    return c.json(ticket);
});
