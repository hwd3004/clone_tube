URL.createObjectURL()

URL.createObjectURL() 정적 메서드는 주어진 객체를 가리키는 URL을 DOMString으로 반환합니다. 해당 URL은 자신을 생성한 창의 document가 사라지면 함께 무효화됩니다.

---

object

객체 URL을 생성할 File, Blob, MediaSource 객체.

const objectURL = URL.createObjectURL(object)

https://developer.mozilla.org/ko/docs/Web/API/URL/createObjectURL
