import { Transactions } from "common/types/transaction";

export const getDeviceIds = ({transactions}: {transactions: Transactions}) => {
  const deviceIds: string[] = [];

  for (const transaction of transactions) {
    if (transaction.metadata && transaction.metadata.deviceId) {
      deviceIds.push(transaction.metadata.deviceId)
    }
  }

  return deviceIds;
}