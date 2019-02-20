import { models } from '../database/schema';
import { utils } from '../utils';

const catapult = require('catapult-sdk');
const { convert } = catapult.utils;

export const Query  = {
    chainHeight: async (root, args, context, info) =>{
      const chainInfo = await context.models.chainInfo.findOne({}).lean();

      return chainInfo;
    },
    block: async (root, args, context) => {

      const { height } = args

      let block = await context.models.block.find({'block.height': height}).lean();

      return utils.formatBinaryAsHash('blocks', block);
  },
  blocksFrom: async (root, args, context) => {

    const {height, numberOfBlock} = args

    const chainInfo = await context.models.chainInfo.findOne({}).lean();

    const option = utils.calculationFromBlock(height,numberOfBlock,chainInfo.height);

    const blocks = await context.models.block.find({ 'block.height': { $gte: option.startHeight, $lt: option.endHeight } },{ 'meta.merkleTree': 0 })
          .sort({ 'block.height': -1 }).lean();

    return utils.formatBinaryAsHash('blocks', blocks);;
},
  account: async (root, args, context) =>{
    const { address } = args

    console.log(address.replace(/-/g, ''));

    const buffer = Buffer.from(address.replace(/-/g, ''));
    console.log(buffer)

    // SAIOB2-NG6BXM-PDNWPT-ZHT3K6-5AULNS-5HYFED-LZX2
    // 02FA34564339160BEF7E92492BB8D9B16E1DF4E29FB4DEEBBA63BE61ED674095

    let account = await context.models.account.find({});
    // console.log(account)
    account.map( account => {
      let a = convert.uint8ToHex(account.account.publicKey);
      console.log(a);
    }
    )

      return 'account';

  }
}