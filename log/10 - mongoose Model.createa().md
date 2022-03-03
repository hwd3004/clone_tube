Model.create()

하나 이상의 문서를 데이터베이스에 저장하기 위한 손쉬운 방법입니다.

MyModel.create(docs)는 문서의 모든 문서에 대해 새로운 MyModel(doc).save()를 수행합니다.

create()을 하게 되면 save()를 생략할 수 있습니다.

create()이 다음 미들웨어인 save()를 트리거하기 때문입니다.

https://mongoosejs.com/docs/api.html#model_Model.create
