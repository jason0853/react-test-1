/**
 * 데이터가 300개일때는 차이가 별로 없으나 1000개 정도의 데이터를 처리할 때는 chance api를 사용하는것 보다
 * 네이티브 자바스크립트 API로 처리할 때 더 나은 퍼포먼스(4~5초 정도 더 빠름!)를 보여주었습니다.
 */
export const toFloatingsInArray = () => {
  const num1 = parseFloat((Math.random() * 100).toFixed(4));
  const num2 = parseFloat((Math.random() * 100).toFixed(4));
  return [num1, num2];
};

export const toFloating = () => parseFloat((Math.random() * 100).toFixed(4));
