export class MakeData {
  public generateRandomString(length: number): string {
    let randomString = "";
    while (randomString.length < length)
      randomString += String.fromCharCode(Math.random() * 127).replace(
        /\W|\d|_/g,
        ""
      );
    return randomString;
  }
}
