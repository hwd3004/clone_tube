https://stackoverflow.com/questions/63538665/how-to-type-request-query-in-express-using-typescript - express 타입스크립트에서 url 쿼리 스트링을 문자열로 받기

```typescript
export const search = async (req: Request, res: Response) => {
  // console.log(req.query.keyword);

  // https://stackoverflow.com/questions/63538665/how-to-type-request-query-in-express-using-typescript
  // express 타입스크립트에서 url 쿼리 스트링을 문자열로 받기
  const keyword: string = req.query.keyword as string;
```
