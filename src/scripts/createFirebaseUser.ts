import { createFirebaseUser } from '../helpers';
import logger from '../logger';

const main = async () => {
  const user = await createFirebaseUser(
    'jscott@osmosis.io',
    'Marsisadog!321',
    '35'
  );

  logger.info(user);

  process.exit(0);
};

main().catch(err => {
  logger.error(err);
  process.exit(1);
});
