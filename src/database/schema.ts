import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const chainInfoSchema = new Schema({
    height: Number,
    scoreHigh: Number,
    scoreLow: Number,
  });

const blockSchema = new Schema({
  meta: {
      hash: Buffer,
      generationHash: Buffer,
      totalFee : Number,
      numTransactions : Number,
      merkleTree : [Buffer]
  },
  block : {
      signature : Buffer,
      signer : Buffer,
      version : Number,
      // type: Number,
      height : Number,
      timestamp :Number,
      difficulty : Number,
      previousBlockHash : Buffer,
      blockTransactionsHash : Buffer
  }
});

const mosaicSchema = new Schema({ id: Number, amount: Number });
const importanceSchema = new Schema({ value: Number, height: Number });

const accountSchema = new Schema({
  meta: {

  },
  account: {
    address: Buffer,
    addressHeight: Number,
    publicKey: Buffer,
    publicKeyHeight: Number,
    importances:[importanceSchema],
    mosaics: [mosaicSchema]
  }
 });

  const chainInfo = mongoose.model('chainInfo', chainInfoSchema,'chainInfo');
  const block = mongoose.model('block', blockSchema);
  const account = mongoose.model('account', accountSchema);

  export const models = {
    chainInfo,
    block,
    account
  }
