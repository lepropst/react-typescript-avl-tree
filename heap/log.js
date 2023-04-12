// import fs from "fs";
import path from "path";
export class Logger {
  constructor(name = "log", dir = "./logs", cacheSize = 100) {
    this.name = name;
    // if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    // this.path = path.join(
    //   dir,
    //   `${new Date().toISOString().replaceAll(":", "-").split(".")[0]}-${
    //     this.name
    //   }.log`
    // );
    this.cacheSize = cacheSize;
    this.cache = [];
  }
  log(message, ...values) {
    this.cache.push(message + values.join(" "));
    if (this.cache.length >= 8) {
      this.cache.map((e) => console.log(e));
      //   fs.appendFileSync(this.path, this.cache.map((l) => `${l}\n`).join(""));
      //   this.cache = [];
    }
  }
}
