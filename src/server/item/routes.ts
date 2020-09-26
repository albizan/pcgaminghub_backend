import Router from '@koa/router';

import { getItemByAsin } from './controller';

const router = new Router({
  prefix: '/api/item',
});

router.get('/:asin', getItemByAsin);

export default router;
