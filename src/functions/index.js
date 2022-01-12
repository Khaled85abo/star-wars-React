export default function getNumber(url) {
  const num = url.split("/");
  const key = num[num.length - 2];
  return key;
}
