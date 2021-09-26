import { generateFirebaseToken } from '../helpers';
import logger from '../logger';

const main = async () => {
  const token = await generateFirebaseToken(
    'jscott@osmosis.io',
    'Marsisadog!321',
    'AIzaSyAYbZYACKju51t4RbO3a1GpFDL916XvNYw'
  );

  logger.info(token);
};

main().catch(err => {
  logger.error(err);
  process.exit(1);
});
