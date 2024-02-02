import router from './router';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import pinia from './store';
import useUserStore from '@/store/modules/user';

router.beforeEach(async (to, from, next) => {
  // nprogress.start();

  next();
  return;

  const userStore = useUserStore(pinia);

  const token = userStore.token;
  const userName = userStore.userName;

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (userName) {
        next();
      } else {
        try {
          await userStore.userInof();
          next();
        } catch (error) {
          userStore.loginOut();
          next('/login');
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.path,
        },
      });
    }
  }

  nprogress.done();
});
