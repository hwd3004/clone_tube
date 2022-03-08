https://youtu.be/eWDHkIdK4Sc?t=219

```typescript
import router from "../../router";
  // ...
  mutations: {
    setUser: function (state: any, payload: any) {
      const { user, loggedIn, errorMsg, status } = payload;

      if (status != 200) {
        state.errorMsg = errorMsg;
      } else {
        setLsUser(user);
        setLsLoggedIn(loggedIn);

        state.user = user;
        state.loggedIn = loggedIn;

        // https://youtu.be/eWDHkIdK4Sc?t=219
        router.push("/");
      }
    },
```
