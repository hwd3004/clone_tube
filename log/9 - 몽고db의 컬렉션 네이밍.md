MongoDB의 collection이름이 Video가 아닌 videos인 이유

Mongoose는 자동으로 모델을 찾고, 해당 모델의 이름을 따서 소문자+뒤에 s(복수형)을 붙여 컬렉션을 생성합니다.

Tank 모델은 -> 컬렉션에 저장될 때, tanks로 저장됩니다.

Document.prototype.save()

https://mongoosejs.com/docs/api.html#document_Document-save
