let express = require("express");
var router = express.Router();

let nftMarketController = require("../controllers/nftMarketController");

router.post("/like_nft", nftMarketController.likeNFT);

router.post("/unLike_nft", nftMarketController.unLikeNFT);

router.post("/get_likedNFTs", nftMarketController.getLikedNFTsOfUser);

router.post("/mintNFT", nftMarketController.mintNFT);

router.post("/get_mint_history", nftMarketController.getAllMint);

router.post("/soldNFT", nftMarketController.soldNFT);

router.post("/get_sold_history", nftMarketController.getAllSold);

router.post("/get_save_history", nftMarketController.getAllSave);

module.exports = router;
