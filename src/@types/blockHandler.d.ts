interface blockEventObject {
  id: number,
  provider: JSONRPCProvider,
  contract: ethers.Contract,
  event: string,
  times: number,
  handler: CallBack,
  BlockNumController: DBController
}