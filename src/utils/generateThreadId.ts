
export const generateThreadId = (): string => {
     
    return Math.floor(1000 + Math.random() * 9000).toString();
}
// Generates random 5-letter lowercase string
export const generateExecutor = (): string => {
    const letters = "abcdefghijklmnopqrstuvwxyz"
    let result = ""
  
    for (let i = 0; i < 5; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length))
    }
  
    return result
  }
  