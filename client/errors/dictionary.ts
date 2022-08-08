class ErrorItem {
  constructor(public kor: string) {}
}
export const errorDictionary: { [key: string]: ErrorItem } = {
  SU001: new ErrorItem("이미 등록된 회원입니다."),
};
