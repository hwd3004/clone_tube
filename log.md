https://nomadcoders.co/wetube/lectures/2676

https://solbel.tistory.com/886 - [vue.js] axios 사용시 폼 데이터 전송하기 (+파일 업로드) [펌]

axios 의 post 기능은 기본적으로 폼 데이터 전송방식을 사용하지 않기 때문에...

https://goddino.tistory.com/117 - vue 동적 라우팅

https://archijude.tistory.com/385 - vue 404 에러 핸들링

---

https://joshua1988.github.io/vue-camp/vuex/concept.html#뷰엑스-설치

---

https://typescript-kr.github.io/pages/variable-declarations.html

타입스크립트 구조 분해 할당 후 타입 지정

```typescript
let { a, b }: { a: string; b: number } = o;
```

---

https://v3.ko.vuejs.org/guide/composition-api-setup.html#setup

```
WARNING

props는 반응성이 있습니다. 그러나 ES6의 구조분해할당을 사용한다면 props의 반응성이 제거됩니다.

props의 구조분해할당이 필요한 경우, setup펑션의 toRefs를 사용하여 반응성을 유지할 수 있습니다.
```

---

https://choice91.tistory.com/73 - express req.body req.params req.query

https://uxgjs.tistory.com/138 - vue axios 파일 업로드

https://joshua1988.github.io/vue-camp/vue3.html#라이프-사이클-훅 - - vue3 ref reactive

https://v3.ko.vuejs.org/api/composition-api.html#setup - vue 컴포지션 api

---

mongoose 세팅

```javascript
// src/db.ts
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/clone_tube");

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error: any) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
```

```javascript
// src/index.ts
// index.ts에 임포트하고 서버를 재시작하면 몽고db에 새 데이터베이스가 생성된다

// ...
import "./db";
// ...
```

```javascript
// 스키마 생성하기
// src/models/Video.ts
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
```

```javascript
// src/index.ts
// db.ts를 index.ts에 임포트한 것처럼, 스키마 파일을 index.ts에 임포트하면 몽고db에 컬렉션이 자동으로 생성된다

// ...
import "./models/Videos";
// ...
```

---

MongoDB의 collection이름이 Video가 아닌 videos인 이유

Mongoose는 자동으로 모델을 찾고, 해당 모델의 이름을 따서 소문자+뒤에 s(복수형)을 붙여 컬렉션을 생성합니다.

Tank 모델은 -> 컬렉션에 저장될 때, tanks로 저장됩니다.

Document.prototype.save()

https://mongoosejs.com/docs/api.html#document_Document-save

---

Model.create()

하나 이상의 문서를 데이터베이스에 저장하기 위한 손쉬운 방법입니다.

MyModel.create(docs)는 문서의 모든 문서에 대해 새로운 MyModel(doc).save()를 수행합니다.

create()을 하게 되면 save()를 생략할 수 있습니다.

create()이 다음 미들웨어인 save()를 트리거하기 때문입니다.

https://mongoosejs.com/docs/api.html#model_Model.create

---

https://youtu.be/hY7F7U8qDPA?t=215 - vue router progmatimmatic routing
https://sunny921.github.io/posts/vuejs-router-03/ - (Vue.js) 라우터 기초 (3) - push, replace, go 사용법
