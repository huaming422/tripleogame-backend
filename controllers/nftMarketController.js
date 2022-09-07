const dotenv = require("dotenv");
dotenv.config();
const Web3 = require("web3");
const nft1155ABI = require("../config/nft1155.json");
// const marketABI = require("../config/market.json");

module.exports = {
  listNFT: async function (req, res) {
    try {
      const metadataURI = req.body.metadataURI;
      const amount = req.body.amount;
      const web3 = new Web3(
        new Web3.providers.HttpProvider(process.env.RPC_URI)
      );
      // const marketContract = new web3.eth.Contract(
      //   marketABI,
      //   process.env.MARKET_CONTRACT_ADDRESS
      // );
      const nft1155Contract = new web3.eth.Contract(
        nft1155ABI,
        process.env.NFT1155_CONTRACT_ADDRESS
      );

      // if (accounts) {
      let createTokenResult = await nft1155Contract.methods
        .mint(amount, metadataURI)
        .send({ from: "0x720c9BbdF5b48902d2920E52273D208343e593a3" });
      // let listTokenResult = await marketContract.methods
      //   .listToken(metadataURI)
      //   .send({ from: accounts[0] });
      return res.status(200).json({
        success: true,
        message: createTokenResult,
      });
      // }
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error || "Error while List NFT",
      });
    }
  },
};
