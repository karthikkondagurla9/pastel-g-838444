import prisma from "../client.js";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
export const getDashboardStats = catchAsync(async (c) => {
    const [revenue, activeCustomers, totalOrders, openTickets] = await Promise.all([
        prisma.order.aggregate({
            _sum: { total: true }
        }),
        prisma.customer.count(),
        prisma.order.count(),
        prisma.ticket.count({
            where: { status: 'open' }
        })
    ]);
    return c.json({
        revenue: revenue._sum.total || 0,
        activeCustomers,
        totalOrders,
        openTickets,
        revenueChange: 12.5, // Mocked for now
        customersChange: 8.2,
        ordersChange: -2.4,
        ticketsChange: 5.1,
    });
});
export const getCustomers = catchAsync(async (c) => {
    const customers = await prisma.customer.findMany();
    return c.json(customers);
});
export const getCustomerById = catchAsync(async (c) => {
    const id = parseInt(c.req.param('id'));
    const customer = await prisma.customer.findUnique({
        where: { id }
    });
    if (!customer)
        throw new ApiError(404, 'Customer not found');
    return c.json(customer);
});
export const getCustomerOrders = catchAsync(async (c) => {
    const customerId = parseInt(c.req.param('id'));
    const orders = await prisma.order.findMany({
        where: { customerId }
    });
    return c.json(orders);
});
