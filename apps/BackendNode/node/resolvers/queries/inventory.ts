import { Clients } from '../../clients'

export const inventoryResolvers = {
  Query: {
    getInventory: async (
      _: any,
      { skuId }: { skuId: string },
      ctx: { clients: Clients }
    ) => {
      const inventory = await ctx.clients.logistics.listInventoryBySku(skuId)
      const items = inventory?.balance || []
      const totalStock = items.reduce(
        (sum, item) => sum + (item.totalQuantity || 0),
        0
      )

      return {
        items,
        totalStock,
        skuId: inventory.skuId,
      }
    },
  },
}
