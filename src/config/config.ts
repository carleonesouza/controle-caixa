import { connect } from 'mongoose';
import util from '../util/baseUtil';

run().catch((err) => {
  console.log(`DB Connection Error: ${err.message}`);
  process.exit();
});

async function run() {
  // Connect to MongoDB
  await connect(util.DATABASE).then(() =>
    console.log('DB connection was successfully!!')
  );
}

export { run };
