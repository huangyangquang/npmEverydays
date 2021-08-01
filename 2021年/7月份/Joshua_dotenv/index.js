
// require('dotenv').config()
// const result = require('dotenv').config()

const result = require('dotenv').config({
    path: './env/.env.test', // 指定路径的.env文件
})
const path = require('path')


const envPath = path.resolve(process.cwd(), '.env') // 获取根目录的.env文件
console.log('envPath: ', envPath);


if (result.error) {
  throw result.error
}

console.log('DB_HOST', process.env.DB_HOST,)
console.log('DB_USER', process.env.DB_USER,)
console.log('DB_PASS', process.env.DB_PASS,)

console.log(result.parsed)