import prisma from "../client.js";
import catchAsync from "../utils/catchAsync.js";
export const getFlows = catchAsync(async (c) => {
    const flows = await prisma.automationFlow.findMany();
    return c.json(flows);
});
export const getFlowRuns = catchAsync(async (c) => {
    const runs = await prisma.flowRun.findMany();
    return c.json(runs);
});
