import CryptoJS from 'crypto-js'

export function encrypt (word) {
  var key = CryptoJS.enc.Utf8.parse('1234567890000000')
  var srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.toString()
}
export function decrypt (word) {
  var key = CryptoJS.enc.Utf8.parse('1234567890000000')
  var decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}
