const numberToKorean = (number: number): string => {
  const koreanUnit = ["조", "억", "만", ""];
  const unit = 10000;
  let result = "";
  while (number > 0) {
    const mod = number % unit;
    const modToString =
      mod.toString().replace(/(\d)(\d{3})/, `$1,$2`) + koreanUnit.pop();
    number = Math.floor(number / unit);
    if (mod > 0) result = `${modToString} ${result}`;
  }

  return result.trimEnd() + "원";
};

const numberWithCommas = (x: number): string => {
  if (!x) return "0";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export { numberToKorean, numberWithCommas };
