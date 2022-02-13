export const pageLimiter = (page:number,limitCount : number) => {
  let endOfPage:boolean = false
  if (page === limitCount) {
    endOfPage = true
  } else {
    endOfPage = false
  }
  return endOfPage
}