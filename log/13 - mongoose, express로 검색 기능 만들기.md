```typescript
export const search = async (req: Request, res: Response) => {
  // console.log(req.query.keyword);

  // https://stackoverflow.com/questions/63538665/how-to-type-request-query-in-express-using-typescript
  // express 타입스크립트에서 url 쿼리 스트링을 문자열로 받기
  const keyword: string = req.query.keyword as string;

  // https://stackoverflow.com/questions/26814456/how-to-get-all-the-values-that-contains-part-of-a-string-using-mongoose-find
  const $regex = new RegExp(keyword, "i");

  let videos = [];

  if (keyword) {
    videos = await Video.find({ title: { $regex } });
  }

  return res.send({ pageTitle: "Search", videos });
};
```
