const NFT = require("../models/SavedNFT");
const {
  SaveCreate,
  GetAllSave,
  MintCreate,
  GetAllMint,
  SoldCreate,
  GetAllSold,
} = require("../services/nftService");
// NFT

module.exports = {
  likeNFT: async (req, res) => {
    try {
      const userId = req.body.userId,
        contractAddress = req.body.contractAddress,
        itemId = req.body.itemId;

      // Checking if the user has already liked the NFT
      if (await NFT.exists({ itemId, userId, contractAddress })) {
        return res.status(400).json({
          error: {
            msg: "You have already liked this NFT.",
          },
        });
      }

      const like = await NFT.create(req.body);

      const savedNFT = await SaveCreate();

      res.status(201).json({
        status: "success",
        like,
        savedNFT,
      });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({
        error: {
          msg: err.message,
        },
      });
    }
  },
  // Get User's Liked Tweets
  getLikedNFTsOfUser: async (req, res) => {
    try {
      const userId = req.body.userId;
      const likedNFTs = await NFT.find({ userId });

      res.status(200).json({
        status: "success",
        likedNFTs,
      });
    } catch (err) {
      return res.status(400).json({
        error: {
          msg: err.message,
        },
      });
    }
  },

  getAllSave: async (req, res) => {
    try {
      const saveHistory = await GetAllSave(req);

      res.status(200).json({
        status: "success",
        saveHistory,
      });
    } catch (err) {
      return res.status(400).json({
        error: {
          msg: err.message,
        },
      });
    }
  },

  // UnLike Tweet
  unLikeNFT: async (req, res) => {
    try {
      const userId = req.body.userId,
        itemId = req.body.itemId,
        contractAddress = req.body.contractAddress;

      const unlike = await NFT.findOneAndDelete({
        itemId,
        userId,
        contractAddress,
      });
      if (!unlike) {
        return res.status(400).json({
          error: {
            msg: "You have already unliked the  NFT",
          },
        });
      }

      res.status(200).json({
        status: "success",
        msg: "Successfully unliked the tweet",
        unlike,
      });
    } catch (err) {
      res.status(400).json({
        error: {
          msg: err.message,
        },
      });
    }
  },

  mintNFT: async (req, res) => {
    try {
      const mintedNFT = await MintCreate();

      res.status(200).json({
        status: "success",
        mintedNFT,
      });
    } catch (err) {
      return res.status(400).json({
        error: {
          msg: err.message,
        },
      });
    }
  },
  getAllMint: async (req, res) => {
    try {
      const mintHistory = await GetAllMint(req);

      res.status(200).json({
        status: "success",
        mintHistory,
      });
    } catch (err) {
      return res.status(400).json({
        error: {
          msg: err.message,
        },
      });
    }
  },
  soldNFT: async (req, res) => {
    try {
      const soldNFT = await SoldCreate(req);

      res.status(200).json({
        status: "success",
        soldNFT,
      });
    } catch (err) {
      return res.status(400).json({
        error: {
          msg: err.message,
        },
      });
    }
  },
  getAllSold: async (req, res) => {
    try {
      const soldHistory = await GetAllSold(req);

      res.status(200).json({
        status: "success",
        soldHistory,
      });
    } catch (err) {
      return res.status(400).json({
        error: {
          msg: err.message,
        },
      });
    }
  },
};
