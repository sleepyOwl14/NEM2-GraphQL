const catapult = require('catapult-sdk');
const { convert } = catapult.utils;

export const utils = {

     formatBinaryAsHash: (models, dataSet) => {
         if (models === 'blocks'){

            // todo: Timestamp and difficulty
            dataSet.map(data =>{
                data.meta.hash =  convert.uint8ToHex(data.meta.hash.buffer);
                data.meta.generationHash = convert.uint8ToHex(data.meta.generationHash.buffer);
                data.block.signature =convert.uint8ToHex(data.block.signature.buffer);
                data.block.signer =convert.uint8ToHex(data.block.signer.buffer);
                data.block.previousBlockHash = convert.uint8ToHex(data.block.previousBlockHash.buffer);
                data.block.blockTransactionsHash =convert.uint8ToHex(data.block.blockTransactionsHash.buffer);
            }
        );

        }

         return dataSet;
     },
     calculationFromBlock : (height, numberOfBlocks, chainHeight) =>{

        const startHeight = height == 0 ? (chainHeight - numberOfBlocks) + 1 : height;

        const calculatedEndHeight = startHeight + numberOfBlocks;
        const chainEndHeight = chainHeight + 1;

        const endHeight = calculatedEndHeight < chainEndHeight ? calculatedEndHeight : chainEndHeight;

        return { startHeight, endHeight };
     }




}