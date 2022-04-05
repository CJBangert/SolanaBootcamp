const {
  Connection,
  sendAndConfirmTransaction,
  Keypair,
  Transaction,
  SystemProgram,
  PublicKey,
  TransactionInstruction,
} = require("@solana/web3.js");

const BN =require("bn.js");

const main = async () => {
  var args = process.argv.slice(2);
  // args[0]: Program ID
  // args[1] (Optional): echo buffer account
  const programId = new PublicKey(args[0]);

  console.log(programId.toBase58());
  const connection = new Connection("https://api.devnet.solana.com/");
  const feePayer = new Keypair();

  console.log("Requesting Airdrop of 1 SOL...");
  await connection.requestAirdrop(feePayer.publicKey, 2e9);
  console.log("Airdrop received");

  const account = new Keypair();
  let echoKey = account.publicKey;
  let tx = new Transaction();
  let signers = [feePayer];
  if (args.length > 1) {
    console.log("Found account address");
    echoKey = new PublicKey(args[1]);
  } else {
    console.log("Generating new account address");
    let createIx = SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: echoKey,
      /** Amount of lamports to transfer to the created account */
      lamports: await connection.getMinimumBalanceForRentExemption(8),
      /** Amount of space in bytes to allocate to the created account */
      space: 8,
      /** Public key of the program to assign as the owner of the created account */
      programId: programId,
    });
    signers.push(account);
    console.log("signers pushed")
    tx.add(createIx);
  }

  const idx = Buffer.from(new Uint8Array(9));
  console.log("buffer allocated")
  idx[0]= 8
  console.log(JSON.stringify(idx))
  let echoIx = new TransactionInstruction({
    keys: [
      {
        pubkey: echoKey,
        isSigner: false,
        isWritable: true,
      }
    ],
    programId: programId,
    data: idx,
  });
  console.log("echoix created")
  /*
    TransactionInstruction({
      keys: Array<AccountMeta>,
      programId: PublicKey,
      data: Buffer,
    });
  */
  tx.add(echoIx);
  console.log(JSON.stringify(tx))
  console.log("instruvtion added to list")
  let txid = await sendAndConfirmTransaction(connection, tx, signers, {
    skipPreflight: true,
    preflightCommitment: "confirmed",
  });
  console.log(`https://explorer.solana.com/tx/${txid}?cluster=devnet`);

  data = (await connection.getAccountInfo(echoKey)).data;
  const count = new BN(data, "le");
  console.log("counter Key:", echoKey.toBase58());
  console.log("Count: ", count.toNumber());
};

main()
  .then(() => {
    console.log("Success");
  })
  .catch((e) => {
    console.error(e);
  });
